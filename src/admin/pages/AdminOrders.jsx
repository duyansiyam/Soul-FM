import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase'

const STATUS_OPTIONS = [
  { label: 'All Status', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
]

export default function AdminOrders() {
  const { eventId } = useParams()
  const [orders, setOrders] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const selectedStatus =
    STATUS_OPTIONS.find((item) => item.value === statusFilter) || STATUS_OPTIONS[0]

  const fetchOrders = async () => {
    setLoading(true)

    try {
      const q = eventId
        ? query(collection(db, 'orders'), where('event_id', '==', eventId))
        : query(collection(db, 'orders'), orderBy('date_purchased', 'desc'))
      const snapshot = await getDocs(q)

      const data = snapshot.docs
        .map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }))
        .sort((a, b) => getDateValue(b.date_purchased) - getDateValue(a.date_purchased))

      setOrders(data)
    } catch (error) {
      console.log(error)
      alert('Failed to fetch orders.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [eventId])

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const status = normalizeStatus(order.order_status || order.payment_status)

      const searchText = [
        order.order_number,
        order.buyer_name,
        order.buyer_email,
        order.buyer_contact,
        order.event_title,
        order.ticket_type,
      ]
        .join(' ')
        .toLowerCase()

      const matchesStatus = statusFilter ? status === statusFilter : true
      const matchesSearch = search
        ? searchText.includes(search.toLowerCase())
        : true

      return matchesStatus && matchesSearch
    })
  }, [orders, statusFilter, search])

  const exportCSV = () => {
    const headers = [
      'Order No.',
      'Date Created',
      'Buyer Name',
      'Buyer Email',
      'Buyer Contact',
      'Quantity',
      'Total',
      'Status',
    ]

    const rows = filteredOrders.map((order) => [
      order.order_number || order.id,
      formatDate(order.date_purchased),
      order.buyer_name || '',
      order.buyer_email || '',
      order.buyer_contact || '',
      order.quantity || 0,
      order.total_amount || 0,
      normalizeStatus(order.order_status || order.payment_status),
    ])

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')
      )
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'orders.csv'
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 text-gray-700">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <p className="text-xs font-semibold text-sky-500 uppercase tracking-widest mb-1">
            Management
          </p>
          <h1 className="text-4xl font-bold text-gray-800">Orders</h1>
          {eventId && (
            <p className="mt-2 text-sm text-gray-500">
              Showing orders for the selected event only.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4 flex-wrap">
          <div className="relative w-[210px]">
  <button
    type="button"
    onClick={() => setDropdownOpen((prev) => !prev)}
    className="h-14 w-full rounded-full border border-gray-300 bg-white px-6 flex items-center justify-between text-gray-700 font-medium hover:border-sky-400 focus:border-sky-400 transition"
  >
    <span className="truncate">{selectedStatus.label}</span>
    <span className="text-gray-500 text-lg">⌄</span>
  </button>

  {dropdownOpen && (
    <div className="absolute left-0 top-[62px] z-50 w-full rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
      {STATUS_OPTIONS.map((status) => (
        <button
          key={status.value}
          type="button"
          onClick={() => {
            setStatusFilter(status.value)
            setDropdownOpen(false)
          }}
          className={`block w-full px-5 py-3 text-left text-sm transition ${
            statusFilter === status.value
              ? 'bg-sky-50 text-sky-600 font-bold'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {status.label}
        </button>
      ))}
    </div>
  )}
</div>

            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search buyer, email, order no..."
                className="h-14 w-[520px] max-w-full rounded-full border border-gray-300 bg-white pl-16 pr-12 text-base text-gray-700 outline-none focus:border-sky-400"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <button
            onClick={exportCSV}
            className="rounded-full bg-sky-500 px-8 py-4 text-white font-bold hover:bg-sky-600"
          >
            ⤴ Export
          </button>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[360px]">
          <div className="grid grid-cols-[1.6fr_1.4fr_2.3fr_0.8fr_1fr_1fr] px-6 py-4 bg-gray-50 border-b text-sm font-bold text-gray-500">
            <span>Order No.</span>
            <span>Date Created</span>
            <span>Buyer Information</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>Status</span>
          </div>

          {loading ? (
            <EmptyState text="Loading orders..." />
          ) : filteredOrders.length === 0 ? (
            <EmptyState text="No orders found." />
          ) : (
            filteredOrders.map((order) => {
              const status = normalizeStatus(order.order_status || order.payment_status)

              return (
                <div
                  key={order.id}
                  className="grid grid-cols-[1.6fr_1.4fr_2.3fr_0.8fr_1fr_1fr] items-center px-6 py-5 border-b text-gray-700 hover:bg-gray-50"
                >
                  <span className="font-semibold text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis pr-4">
                    {order.order_number || order.id}
                  </span>

                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(order.date_purchased)}
                  </span>

                  <div className="min-w-0">
                    <p className="font-bold text-gray-700 truncate">
                      {order.buyer_name || 'No name'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {order.buyer_email || 'No email'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {order.buyer_contact || 'No contact'}
                    </p>
                  </div>

                  <span className="font-semibold whitespace-nowrap">
                    {order.quantity || 0}
                  </span>

                  <span className="font-semibold whitespace-nowrap">
                    ₱{Number(order.total_amount || 0).toLocaleString()}
                  </span>

                  <span className={statusClass(status)}>{status}</span>
                </div>
              )
            })
          )}
        </section>
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function normalizeStatus(status = '') {
  const clean = String(status).trim().toLowerCase()

  if (clean === 'paid') return 'paid'
  if (clean === 'completed') return 'completed'
  if (clean === 'cancelled' || clean === 'canceled') return 'cancelled'
  if (clean === 'pending') return 'pending'

  return 'pending'
}

function formatDate(value) {
  if (!value) return '—'

  const date = value?.toDate ? value.toDate() : new Date(value)

  if (Number.isNaN(date.getTime())) return '—'

  return date.toLocaleString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function statusClass(status = '') {
  const base =
    'inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold capitalize whitespace-nowrap'

  if (status === 'paid') return `${base} bg-green-50 text-green-600`
  if (status === 'completed') return `${base} bg-blue-50 text-blue-600`
  if (status === 'cancelled') return `${base} bg-red-50 text-red-600`

  return `${base} bg-yellow-50 text-yellow-600`
}

function EmptyState({ text }) {
  return <div className="py-20 text-center text-gray-400">{text}</div>
}

function getDateValue(value) {
  if (!value) return 0

  const date = value?.toDate ? value.toDate() : new Date(value)

  return Number.isNaN(date.getTime()) ? 0 : date.getTime()
}
