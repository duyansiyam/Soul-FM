import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import {
  CheckCircle2,
  Clock,
  DollarSign,
  Search as SearchIcon,
  ShoppingCart,
} from 'lucide-react'

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

  useEffect(() => {
    const loadOrders = async () => {
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
        console.error(error)
        alert('Failed to fetch orders.')
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [eventId])

  const summary = useMemo(() => {
    const stats = orders.reduce(
      (acc, order) => {
        const status = normalizeStatus(order.order_status || order.payment_status)
        acc[status] = (acc[status] || 0) + 1
        acc.total += 1
        acc.quantity += Number(order.quantity || 0)
        acc.revenue += Number(order.total_amount || 0)
        return acc
      },
      { total: 0, paid: 0, pending: 0, completed: 0, cancelled: 0, quantity: 0, revenue: 0 }
    )

    return stats
  }, [orders])

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

  const paidOrderPercent = summary.total > 0 ? Math.round((summary.paid / summary.total) * 100) : 0

  const exportCSV = () => {
    const headers = [
      'Order No.',
      'Date Created',
      'Buyer Name',
      'Buyer Email',
      'Buyer Contact',
      'Event',
      'Ticket Type',
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
      order.event_title || '',
      order.ticket_type || '',
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
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200 pt-4 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-sky-500 mb-2">
              Management
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">Orders</h1>
                {eventId && (
                  <p className="mt-2 text-sm text-slate-500">
                    Showing orders for the selected event only.
                  </p>
                )}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
                <span className="font-semibold text-slate-900">{filteredOrders.length}</span>
                <span>of</span>
                <span className="font-semibold text-slate-900">{summary.total}</span>
                <span>orders</span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Order progress</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {paidOrderPercent}% paid · {summary.paid.toLocaleString()} / {summary.total.toLocaleString()} orders
                </p>
              </div>
              <p className="text-sm text-slate-500">
                ₱{formatPHP(summary.revenue)} revenue · {summary.quantity.toLocaleString()} tickets
              </p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-sky-500 transition-all duration-300"
                style={{ width: `${paidOrderPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={ShoppingCart}
            label="Total orders"
            value={summary.total.toLocaleString()}
            sub={`${summary.pending} pending · ${summary.paid} paid`}
            accent="#2563EB"
          />
          <StatCard
            icon={CheckCircle2}
            label="Paid orders"
            value={summary.paid.toLocaleString()}
            sub={`${summary.completed} completed`}
            accent="#10B981"
          />
          <StatCard
            icon={DollarSign}
            label="Net revenue"
            value={`₱${formatPHP(summary.revenue)}`}
            sub={`${summary.quantity.toLocaleString()} tickets sold`}
            accent="#F59E0B"
          />
          <StatCard
            icon={Clock}
            label="Pending"
            value={summary.pending.toLocaleString()}
            sub={`Awaiting payment or confirmation`}
            accent="#6366F1"
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="relative w-full sm:w-72">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="h-14 w-full rounded-full border border-slate-300 bg-white px-6 text-left text-slate-700 transition hover:border-sky-400"
                >
                  <span className="truncate">{selectedStatus.label}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
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
                            ? 'bg-sky-50 text-sky-600 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative w-full sm:w-80">
                <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                  <SearchIcon size={20} />
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search buyer, email, order no, event..."
                  className="h-14 w-full rounded-full border border-slate-300 bg-slate-50 pl-16 pr-12 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={exportCSV}
              className="inline-flex h-14 items-center justify-center rounded-full bg-sky-500 px-7 text-sm font-semibold text-white transition hover:bg-sky-600"
            >
              Export CSV
            </button>
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Order list</h2>
                <p className="text-sm text-slate-500">
                  Active orders are displayed in real time from your database.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                {filteredOrders.length} matching
              </span>
            </div>
          </div>

          {loading ? (
            <EmptyState text="Loading orders..." />
          ) : filteredOrders.length === 0 ? (
            <EmptyState text="No orders found." />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-[0.12em] text-xs">
                  <tr>
                    <th className="px-5 py-4">Order</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Buyer</th>
                    <th className="px-5 py-4">Event</th>
                    <th className="px-5 py-4">Ticket</th>
                    <th className="px-5 py-4">Qty</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const status = normalizeStatus(order.order_status || order.payment_status)
                    return (
                      <tr key={order.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">
                          {order.order_number || order.id}
                        </td>
                        <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                          {formatDate(order.date_purchased)}
                        </td>
                        <td className="px-5 py-4 min-w-[16rem]">
                          <div className="max-w-88 truncate">
                            <p className="font-semibold text-slate-900 truncate">{order.buyer_name || 'No name'}</p>
                            <p className="text-sm text-slate-500 truncate">{order.buyer_email || 'No email'}</p>
                          </div>
                        </td>
                        <td className="px-5 py-4 max-w-[18rem]">
                          <p className="text-slate-800 truncate">{order.event_title || 'No event'}</p>
                        </td>
                        <td className="px-5 py-4 max-w-56">
                          <p className="text-slate-600 truncate">{order.ticket_type || 'General'}</p>
                        </td>
                        <td className="px-5 py-4 text-slate-800 font-semibold whitespace-nowrap">
                          {order.quantity || 0}
                        </td>
                        <td className="px-5 py-4 text-slate-800 font-semibold whitespace-nowrap">
                          ₱{Number(order.total_amount || 0).toLocaleString()}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className={statusClass(status)}>{status}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, sub, accent = '#2563EB' }) {
  const Icon = icon
  return (
    <div
      style={{ borderLeft: `3px solid ${accent}` }}
      className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div
          style={{ backgroundColor: `${accent}17`, color: accent }}
          className="inline-flex h-9 w-9 items-center justify-center rounded-2xl"
        >
          <Icon size={16} />
        </div>
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-400">{label}</p>
          <p className="mt-1 text-xl font-semibold text-slate-900">{value}</p>
        </div>
      </div>
      {sub && <p className="mt-3 text-sm text-slate-500">{sub}</p>}
    </div>
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

function formatPHP(amount) {
  return Number(amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })
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

  if (status === 'paid') return `${base} bg-emerald-50 text-emerald-700`
  if (status === 'completed') return `${base} bg-sky-50 text-sky-700`
  if (status === 'cancelled') return `${base} bg-rose-50 text-rose-700`

  return `${base} bg-amber-50 text-amber-700`
}

function EmptyState({ text }) {
  return <div className="py-20 text-center text-slate-400">{text}</div>
}

function getDateValue(value) {
  if (!value) return 0

  const date = value?.toDate ? value.toDate() : new Date(value)

  return Number.isNaN(date.getTime()) ? 0 : date.getTime()
}
