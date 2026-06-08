import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, TrendingUp, Ticket, ShoppingCart } from 'lucide-react'

const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

export default function AdminOverview() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState('')
  const [events, setEvents] = useState([])
  const [orders, setOrders] = useState([])
  const [ticketTypes, setTicketTypes] = useState([])

  useEffect(() => {
    fetchOverviewData()
  }, [])

  const fetchOverviewData = async () => {
    try {
      setLoading(true)

      const [eventsSnap, ordersSnap, ticketTypesSnap] = await Promise.all([
        getDocs(collection(db, 'events')),
        getDocs(collection(db, 'orders')),
        getDocs(collection(db, 'ticket_types')),
      ])

      setEvents(eventsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      setOrders(ordersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      setTicketTypes(ticketTypesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))

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

  // --- Aggregate stats ---
  const totalOrders = orders.length
  const totalTicketsSold = orders.reduce((sum, o) => sum + Number(o.quantity || 0), 0)
  const totalTickets = ticketTypes.reduce((sum, t) => sum + Number(t.quantity || 0), 0)

  const paidOrders = orders.filter((o) => o.payment_status === 'paid')
  const netPayout = paidOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0)

  // --- Per-event row data ---
  const eventRows = events.map((event) => {
    const eventOrders = orders.filter((o) => o.event_id === event.id)
    const eventTicketTypes = ticketTypes.filter((t) => t.event_id === event.id)

    const sold = eventOrders.reduce((sum, o) => sum + Number(o.quantity || 0), 0)
    const capacity = eventTicketTypes.reduce((sum, t) => sum + Number(t.quantity || 0), 0)
    const revenue = eventOrders
      .filter((o) => o.payment_status === 'paid')
      .reduce((sum, o) => sum + Number(o.total_amount || 0), 0)

    const soldPct = capacity > 0 ? Math.round((sold / capacity) * 100) : 0

    return {
      id: event.id,
      name: event.event_name || event.name || 'Unnamed Event',
      date: event.event_date || event.date || null,
      sold,
      capacity,
      soldPct,
      revenue,
      orderCount: eventOrders.length,
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm tracking-widest text-gray-400">
        LOADING OVERVIEW...
      </div>
    )
  }

  return (
    <div className="px-8 py-6 bg-white min-h-screen text-gray-900">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Overview</h1>
          <p className="text-xs text-gray-500 mt-1">
            Last updated at: {lastUpdated}
            <button
              onClick={fetchOverviewData}
              className="ml-3 text-gray-500 hover:text-black transition-colors"
            >
              ⟳
            </button>
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={CalendarDays}
          label="Total Events"
          value={events.length}
        />
        <StatCard
          icon={Ticket}
          label="Total Tickets Sold"
          value={`${totalTicketsSold} / ${totalTickets}`}
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={totalOrders}
        />
        <StatCard
          icon={TrendingUp}
          label="Net Payout (PHP)"
          value={netPayout.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
        />
      </div>

      {/* Events Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-bold">All Events</h2>
          <span className="text-xs text-gray-400">{events.length} events total</span>
        </div>

        {eventRows.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-gray-400">
            No events found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 font-medium">Event</th>
                <th className="text-left px-6 py-4 font-medium">Date</th>
                <th className="text-left px-6 py-4 font-medium">Tickets Sold</th>
                <th className="text-left px-6 py-4 font-medium">Sold %</th>
                <th className="text-left px-6 py-4 font-medium">Orders</th>
                <th className="text-left px-6 py-4 font-medium">Revenue (PHP)</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {eventRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{row.name}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {row.date
                      ? new Date(row.date).toLocaleDateString('en-PH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td className="px-6 py-4">
                    {row.sold} / {row.capacity}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-400 rounded-full"
                          style={{ width: `${row.soldPct}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{row.soldPct}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{row.orderCount}</td>
                  <td className="px-6 py-4">
                    {row.revenue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`${BASE}/dashboard/${row.id}`)}
                      className="text-xs text-sky-500 hover:text-sky-700 font-semibold transition-colors"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        <Icon size={14} strokeWidth={2} />
        <p className="text-sm">{label}</p>
      </div>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  )
}
