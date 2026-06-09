import { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

function formatPHP(amount) {
  return amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })
}

function formatDate(raw) {
  if (!raw) return '—'
  return new Date(raw).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900 leading-tight">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  )
}

export default function AdminDashboard() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState('')
  const [event, setEvent] = useState(null)
  const [orders, setOrders] = useState([])
  const [ticketTypes, setTicketTypes] = useState([])

  useEffect(() => {
    if (!eventId) {
      navigate(`${BASE}/dashboard`, { replace: true })
    }
  }, [eventId, navigate])

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true)

      const [eventSnap, ordersSnap, ticketTypesSnap] = await Promise.all([
        getDoc(doc(db, 'events', eventId)),
        getDocs(query(collection(db, 'orders'), where('event_id', '==', eventId))),
        getDocs(query(collection(db, 'ticket_types'), where('event_id', '==', eventId))),
      ])

      setEvent(eventSnap.exists() ? { id: eventSnap.id, ...eventSnap.data() } : null)
      setOrders(ordersSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setTicketTypes(ticketTypesSnap.docs.map((d) => ({ id: d.id, ...d.data() })))

      setLastUpdated(
        new Date().toLocaleString('en-PH', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [eventId])

  useEffect(() => {
    if (eventId) fetchDashboardData()
  }, [eventId, fetchDashboardData])

  const totalTicketsSold = orders.reduce((sum, o) => sum + Number(o.quantity || 0), 0)
  const totalTickets = ticketTypes.reduce((sum, t) => sum + Number(t.quantity || 0), 0)
  const availableTickets = Math.max(totalTickets - totalTicketsSold, 0)

  const paidOrders = orders.filter((o) => o.payment_status === 'paid')
  const pendingOrders = orders.filter((o) => o.payment_status === 'pending')

  const paidTickets = paidOrders.reduce((sum, o) => sum + Number(o.quantity || 0), 0)
  const pendingTickets = pendingOrders.reduce((sum, o) => sum + Number(o.quantity || 0), 0)

  const netPayout = paidOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0)
  const averageTicketsPerOrder = orders.length > 0 ? totalTicketsSold / orders.length : 0
  const soldPercentage = totalTickets > 0 ? Math.round((totalTicketsSold / totalTickets) * 100) : 0

  const ticketRows = ticketTypes.map((ticket) => {
    const relatedOrders = orders.filter((o) => o.ticket_type === ticket.ticket_name)

    const paid = relatedOrders
      .filter((o) => o.payment_status === 'paid')
      .reduce((sum, o) => sum + Number(o.quantity || 0), 0)

    const pending = relatedOrders
      .filter((o) => o.payment_status === 'pending')
      .reduce((sum, o) => sum + Number(o.quantity || 0), 0)

    const generated = paid + pending
    const total = Number(ticket.quantity || 0)
    const available = Math.max(total - generated, 0)

    return { ticketType: ticket.ticket_name || 'Ticket Type', total, paid, pending, generated, available }
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm tracking-widest text-gray-400">
        LOADING DASHBOARD...
      </div>
    )
  }

  const eventName = event?.event_name || event?.name || 'Overview'
  const eventDateLabel = event?.event_date ? formatDate(event.event_date) : 'Not set'
  const eventLocation = event?.event_location || event?.location || event?.venue || 'Not specified'

  return (
    <div className="px-4 py-5 bg-gray-50 min-h-screen text-gray-900">
      <div className="sticky top-0 z-30 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200 pt-4 pb-4">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-0.5">Event Dashboard</p>
            <h1 className="text-xl font-bold text-gray-900">{eventName}</h1>
            <p className="text-xs text-gray-400 mt-0.5">Last updated {lastUpdated}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchDashboardData}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:text-gray-900 transition"
            >
              ⟳ Refresh
            </button>
            <button className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-white bg-sky-500 rounded-full hover:bg-sky-600 transition">
              Export Report
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Event progress</p>
              <p className="mt-2 text-sm font-semibold text-gray-900">{soldPercentage}% Sold · {totalTicketsSold}/{totalTickets} tickets</p>
            </div>
            <div className="text-sm text-gray-500 text-right">Available {availableTickets.toLocaleString()}</div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full rounded-full bg-sky-500 transition-all duration-300" style={{ width: `${soldPercentage}%` }} />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard
          label="Net Payout"
          value={`₱${formatPHP(netPayout)}`}
          sub={`${paidOrders.length} paid order${paidOrders.length === 1 ? '' : 's'}`}
        />
        <StatCard
          label="Tickets Sold"
          value={`${totalTicketsSold.toLocaleString()} / ${totalTickets.toLocaleString()}`}
          sub={`Available ${availableTickets.toLocaleString()}`}
        />
        <StatCard
          label="Orders"
          value={orders.length.toLocaleString()}
          sub={`${pendingOrders.length} pending`}
        />
        <StatCard
          label="Fill Rate"
          value={`${soldPercentage}%`}
          sub="Of total capacity"
        />
      </div>

      {/* Summary + Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-5">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Summary</p>
                <p className="text-xs text-gray-400 mt-0.5">Event performance and order breakdown.</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{soldPercentage}%</p>
                <p className="text-xs text-gray-500">{totalTicketsSold}/{totalTickets} sold</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <SummaryRow label="Paid" value={paidTickets} total={totalTickets} color="bg-sky-400" />
            <SummaryRow label="Pending" value={pendingTickets} total={totalTickets} color="bg-yellow-500" />
            <SummaryRow label="Generated" value={totalTicketsSold} total={totalTickets} color="bg-blue-700" />
            <SummaryRow label="Available" value={availableTickets} total={totalTickets} color="bg-gray-300" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <p className="text-sm font-semibold text-gray-600 mb-3">Event Details</p>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Date</span>
              <span>{eventDateLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Location</span>
              <span className="text-right max-w-[60%] truncate">{eventLocation}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Orders</span>
              <span>{orders.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Ticket types</span>
              <span>{ticketTypes.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Avg / order</span>
              <span>{averageTicketsPerOrder.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Type Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Ticket Type Status</h2>
            <p className="text-xs text-gray-500">Availability and sales by ticket type.</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            {ticketTypes.length} types
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3">Ticket type</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Paid</th>
                <th className="px-4 py-3">Pending</th>
                <th className="px-4 py-3">Generated</th>
                <th className="px-4 py-3">Available</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-sky-50 text-sm font-semibold text-gray-700 border-b border-gray-200">
                <td className="px-4 py-3">Grand total</td>
                <td className="px-4 py-3">{totalTickets}</td>
                <td className="px-4 py-3">{paidTickets}</td>
                <td className="px-4 py-3">{pendingTickets}</td>
                <td className="px-4 py-3">{totalTicketsSold}</td>
                <td className="px-4 py-3">{availableTickets}</td>
              </tr>
              {ticketRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    No ticket types found for this event.
                  </td>
                </tr>
              ) : (
                ticketRows.map((row) => (
                  <tr key={row.ticketType} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">{row.ticketType}</td>
                    <td className="px-4 py-3">{row.total}</td>
                    <td className="px-4 py-3">{row.paid}</td>
                    <td className="px-4 py-3">{row.pending}</td>
                    <td className="px-4 py-3">{row.generated}</td>
                    <td className="px-4 py-3">{row.available}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, total, color }) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        <span>{label}</span>
      </div>
      <span className="text-gray-700">{value} ({percentage}%)</span>
    </div>
  )
}