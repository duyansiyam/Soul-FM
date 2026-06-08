import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

export default function AdminDashboard() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState('')
  const [event, setEvent] = useState(null)
  const [orders, setOrders] = useState([])
  const [ticketTypes, setTicketTypes] = useState([])

  // Guard: if no eventId somehow, redirect to overview
  useEffect(() => {
    if (!eventId) {
      navigate(`${BASE}/dashboard`, { replace: true })
    }
  }, [eventId])

  useEffect(() => {
    if (eventId) fetchDashboardData()
  }, [eventId])

  const fetchDashboardData = async () => {
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
  }

  // --- Stats (all scoped to this event's orders/ticketTypes) ---
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

  // --- Per-ticket-type breakdown (scoped: match by ticket_type name within this event's orders only) ---
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

    return {
      ticketType: ticket.ticket_name || 'Ticket Type',
      total,
      paid,
      pending,
      generated,
      available,
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm tracking-widest text-gray-400">
        LOADING DASHBOARD...
      </div>
    )
  }

  const eventName = event?.event_name || event?.name || 'Event Dashboard'

  return (
    <div className="px-8 py-6 bg-white min-h-screen text-gray-900">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Event Dashboard
          </p>
          <h1 className="text-2xl font-bold">{eventName}</h1>
          <p className="text-xs text-gray-500 mt-1">
            Last updated at: {lastUpdated}
            <button
              onClick={fetchDashboardData}
              className="ml-3 text-gray-500 hover:text-black transition-colors"
            >
              ⟳
            </button>
          </p>
        </div>

        <button className="bg-sky-400 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-sky-500 transition-colors">
          Export Report
        </button>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-600">Net Payout (PHP)</p>
          <h2 className="text-3xl font-bold mt-2">
            {netPayout.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </h2>
          <div className="flex gap-2 mt-6">
            <button className="border border-sky-400 text-sky-500 px-4 py-2 rounded-md text-sm hover:bg-sky-50 transition-colors">
              Sales Breakdown
            </button>
            <button className="bg-sky-400 text-white px-4 py-2 rounded-md text-sm hover:bg-sky-500 transition-colors">
              Request Payout
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-600">Total Tickets Sold</p>
          <h2 className="text-3xl font-bold mt-2">
            {totalTicketsSold} / {totalTickets}
          </h2>
          <p className="text-xs text-gray-500 mt-2">Available: {availableTickets}</p>
        </div>

        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-600">Average Tickets / Order</p>
          <h2 className="text-3xl font-bold mt-2">{averageTicketsPerOrder.toFixed(1)}</h2>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Donut Summary */}
        <div className="border border-gray-200 rounded-xl p-6">
          <h2 className="font-bold mb-6">Total Summary</h2>

          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full border-16 border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold">{soldPercentage}%</p>
                <p className="text-xs">{totalTicketsSold}/{totalTickets}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <SummaryRow label="Paid" value={paidTickets} total={totalTickets} color="bg-sky-400" />
            <SummaryRow label="Pending" value={pendingTickets} total={totalTickets} color="bg-yellow-500" />
            <SummaryRow label="Generated" value={totalTicketsSold} total={totalTickets} color="bg-blue-700" />
            <SummaryRow label="Available" value={availableTickets} total={totalTickets} color="bg-gray-200" />
          </div>
        </div>

        {/* Ticket Type Table */}
        <div className="lg:col-span-2 border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-bold">Ticket Type Status</h2>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 font-medium">Ticket Type</th>
                <th className="text-left px-6 py-4 font-medium">Total</th>
                <th className="text-left px-6 py-4 font-medium">Paid</th>
                <th className="text-left px-6 py-4 font-medium">Pending</th>
                <th className="text-left px-6 py-4 font-medium">Generated</th>
                <th className="text-left px-6 py-4 font-medium">Available</th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-sky-50 border-b border-gray-200 font-semibold">
                <td className="px-6 py-4">Grand Total</td>
                <td className="px-6 py-4">{totalTickets}</td>
                <td className="px-6 py-4">{paidTickets}</td>
                <td className="px-6 py-4">{pendingTickets}</td>
                <td className="px-6 py-4">{totalTicketsSold}</td>
                <td className="px-6 py-4">{availableTickets}</td>
              </tr>

              {ticketRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    No ticket types found for this event.
                  </td>
                </tr>
              ) : (
                ticketRows.map((row) => (
                  <tr key={row.ticketType} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">{row.ticketType}</td>
                    <td className="px-6 py-4">{row.total}</td>
                    <td className="px-6 py-4">{row.paid}</td>
                    <td className="px-6 py-4">{row.pending}</td>
                    <td className="px-6 py-4">{row.generated}</td>
                    <td className="px-6 py-4">{row.available}</td>
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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        <span>{label}</span>
      </div>
      <span>{value} ({percentage}%)</span>
    </div>
  )
}