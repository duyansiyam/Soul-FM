import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState('')
  const [orders, setOrders] = useState([])
  const [ticketTypes, setTicketTypes] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      const ordersSnapshot = await getDocs(collection(db, 'orders'))
      const ticketTypesSnapshot = await getDocs(collection(db, 'ticket_types'))

      setOrders(
        ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )

      setTicketTypes(
        ticketTypesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )

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
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const totalTicketsSold = orders.reduce(
    (sum, order) => sum + Number(order.quantity || 0),
    0
  )

  const totalTickets = ticketTypes.reduce(
    (sum, ticket) => sum + Number(ticket.quantity || 0),
    0
  )

  const availableTickets = Math.max(totalTickets - totalTicketsSold, 0)

  const paidOrders = orders.filter(
    (order) => order.payment_status === 'paid'
  )

  const pendingOrders = orders.filter(
    (order) => order.payment_status === 'pending'
  )

  const paidTickets = paidOrders.reduce(
    (sum, order) => sum + Number(order.quantity || 0),
    0
  )

  const pendingTickets = pendingOrders.reduce(
    (sum, order) => sum + Number(order.quantity || 0),
    0
  )

  const netPayout = paidOrders.reduce(
    (sum, order) => sum + Number(order.total_amount || 0),
    0
  )

  const averageTicketsPerOrder =
    orders.length > 0 ? totalTicketsSold / orders.length : 0

  const soldPercentage =
    totalTickets > 0
      ? Math.round((totalTicketsSold / totalTickets) * 100)
      : 0

  const ticketRows = ticketTypes.map((ticket) => {
    const relatedOrders = orders.filter(
      (order) => order.ticket_type === ticket.ticket_name
    )

    const paid = relatedOrders
      .filter((order) => order.payment_status === 'paid')
      .reduce((sum, order) => sum + Number(order.quantity || 0), 0)

    const pending = relatedOrders
      .filter((order) => order.payment_status === 'pending')
      .reduce((sum, order) => sum + Number(order.quantity || 0), 0)

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
      <div className="min-h-screen flex items-center justify-center text-sm tracking-widest">
        LOADING DASHBOARD...
      </div>
    )
  }

  return (
    <div className="px-8 py-6 bg-white min-h-screen text-gray-900">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Overview</h1>

          <p className="text-xs text-gray-500 mt-1">
            Last updated at: {lastUpdated}
            <button
              onClick={fetchDashboardData}
              className="ml-3 text-gray-500 hover:text-black"
            >
              ⟳
            </button>
          </p>
        </div>

        <button className="bg-sky-400 text-white px-5 py-2 rounded-full text-sm font-semibold">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-600">Net Payout (PHP)</p>

          <h2 className="text-3xl font-bold mt-2">
            {netPayout.toLocaleString('en-PH', {
              minimumFractionDigits: 2,
            })}
          </h2>

          <div className="flex gap-2 mt-6">
            <button className="border border-sky-400 text-sky-500 px-4 py-2 rounded-md text-sm">
              Sales Breakdown
            </button>

            <button className="bg-sky-400 text-white px-4 py-2 rounded-md text-sm">
              Request Payout
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-600">Total Tickets Sold</p>

          <h2 className="text-3xl font-bold mt-2">
            {totalTicketsSold} / {totalTickets}
          </h2>

          <p className="text-xs text-gray-500 mt-2">
            Available: {availableTickets}
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-600">Average Tickets / Order</p>

          <h2 className="text-3xl font-bold mt-2">
            {averageTicketsPerOrder.toFixed(1)}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="border border-gray-200 rounded-xl p-6">
          <h2 className="font-bold mb-6">Total Summary</h2>

          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full border-[16px] border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold">{soldPercentage}%</p>
                <p className="text-xs">
                  {totalTicketsSold}/{totalTickets}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <SummaryRow
              label="Paid"
              value={paidTickets}
              total={totalTickets}
              color="bg-sky-400"
            />

            <SummaryRow
              label="Pending"
              value={pendingTickets}
              total={totalTickets}
              color="bg-yellow-500"
            />

            <SummaryRow
              label="Generated"
              value={totalTicketsSold}
              total={totalTickets}
              color="bg-blue-700"
            />

            <SummaryRow
              label="Available"
              value={availableTickets}
              total={totalTickets}
              color="bg-gray-200"
            />
          </div>
        </div>

        <div className="lg:col-span-2 border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-bold">Ticket Type Status</h2>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 font-medium">
                  Ticket Type
                </th>
                <th className="text-left px-6 py-4 font-medium">
                  Total
                </th>
                <th className="text-left px-6 py-4 font-medium">
                  Paid
                </th>
                <th className="text-left px-6 py-4 font-medium">
                  Pending
                </th>
                <th className="text-left px-6 py-4 font-medium">
                  Generated
                </th>
                <th className="text-left px-6 py-4 font-medium">
                  Available
                </th>
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

              {ticketRows.map((row) => (
                <tr
                  key={row.ticketType}
                  className="border-b border-gray-100"
                >
                  <td className="px-6 py-4">{row.ticketType}</td>
                  <td className="px-6 py-4">{row.total}</td>
                  <td className="px-6 py-4">{row.paid}</td>
                  <td className="px-6 py-4">{row.pending}</td>
                  <td className="px-6 py-4">{row.generated}</td>
                  <td className="px-6 py-4">{row.available}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, total, color }) {
  const percentage =
    total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        <span>{label}</span>
      </div>

      <span>
        {value} ({percentage}%)
      </span>
    </div>
  )
}