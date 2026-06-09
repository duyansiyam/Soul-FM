import { useEffect, useState, useMemo } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import {
  CalendarDays,
  TrendingUp,
  Ticket,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ExternalLink,
} from 'lucide-react'

const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

// ─── Helpers ────────────────────────────────────────────────────────────────

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

function healthLabel(pct) {
  if (pct >= 80) return { label: 'Hot', color: '#10B981', bg: '#D1FAE5' }
  if (pct >= 50) return { label: 'Good', color: '#2563EB', bg: '#DBEAFE' }
  if (pct >= 20) return { label: 'Slow', color: '#F59E0B', bg: '#FEF3C7' }
  return { label: 'Low', color: '#EF4444', bg: '#FEE2E2' }
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

const CARD_META = {
  events:  { accent: '#2563EB' },
  tickets: { accent: '#10B981' },
  orders:  { accent: '#F59E0B' },
  payout:  { accent: '#6366F1' },
}

function StatCard({ id, icon: Icon, label, value, sub }) {
  const { accent } = CARD_META[id] || { accent: '#6B7280' }
  return (
    <div
      style={{ borderLeft: `3px solid ${accent}` }}
      className="stat-card bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center gap-2" style={{ color: accent }}>
        <Icon size={13} strokeWidth={2.5} />
        <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">{label}</span>
      </div>
      <div>
        <span className="text-[1.75rem] font-bold tabular-nums leading-none text-gray-900">{value}</span>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
    </div>
  )
}

// ─── Sort hook ───────────────────────────────────────────────────────────────

function useSortedRows(rows) {
  const [sort, setSort] = useState({ key: 'date', dir: 'asc' })

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      let av = a[sort.key], bv = b[sort.key]
      if (typeof av === 'string') av = av.toLowerCase()
      if (typeof bv === 'string') bv = bv.toLowerCase()
      if (av == null) av = sort.dir === 'asc' ? Infinity : -Infinity
      if (bv == null) bv = sort.dir === 'asc' ? Infinity : -Infinity
      return sort.dir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
    })
  }, [rows, sort])

  const toggle = (key) =>
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }
    )

  return { sorted, sort, toggle }
}

// ─── Sortable TH ─────────────────────────────────────────────────────────────

function SortTh({ label, sortKey, sort, toggle, className = '' }) {
  const active = sort.key === sortKey
  return (
    <th
      onClick={() => toggle(sortKey)}
      className={`text-left px-5 py-3 text-xs font-semibold tracking-wider uppercase text-gray-400 cursor-pointer select-none hover:text-gray-700 transition-colors ${className}`}
    >
      <span className="flex items-center gap-1">
        {label}
        {active ? (
          sort.dir === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />
        ) : (
          <ChevronsUpDown size={11} className="opacity-30" />
        )}
      </span>
    </th>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function SoldBar({ pct, animate }) {
  const { color } = healthLabel(pct)
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: animate ? `${pct}%` : '0%',
            backgroundColor: color,
          }}
        />
      </div>
      <span className="text-xs tabular-nums text-gray-500">{pct}%</span>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminOverview() {
  const navigate = useNavigate()
  const [loading, setLoading]       = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('')
  const [animateBars, setAnimateBars] = useState(false)
  const [events, setEvents]         = useState([])
  const [orders, setOrders]         = useState([])
  const [ticketTypes, setTicketTypes] = useState([])
  const [hoverRow, setHoverRow]     = useState(null)

  useEffect(() => { fetchOverviewData() }, [])

  const fetchOverviewData = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true)
      setAnimateBars(false)

      const [eventsSnap, ordersSnap, ticketTypesSnap] = await Promise.all([
        getDocs(collection(db, 'events')),
        getDocs(collection(db, 'orders')),
        getDocs(collection(db, 'ticket_types')),
      ])

      setEvents(eventsSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setOrders(ordersSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setTicketTypes(ticketTypesSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLastUpdated(
        new Date().toLocaleString('en-PH', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
        })
      )

      // Delay bar animation so DOM is ready
      setTimeout(() => setAnimateBars(true), 80)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // ── Aggregates ──────────────────────────────────────────────────────────────
  const totalOrders      = orders.length
  const totalTicketsSold = orders.reduce((s, o) => s + Number(o.quantity || 0), 0)
  const totalTickets     = ticketTypes.reduce((s, t) => s + Number(t.quantity || 0), 0)
  const paidOrders       = orders.filter((o) => o.payment_status === 'paid')
  const netPayout        = paidOrders.reduce((s, o) => s + Number(o.total_amount || 0), 0)
  const overallSoldPct   = totalTickets > 0 ? Math.round((totalTicketsSold / totalTickets) * 100) : 0

  // ── Event rows ──────────────────────────────────────────────────────────────
  const eventRows = useMemo(() =>
    events.map((event) => {
      const evOrders = orders.filter((o) => o.event_id === event.id)
      const evTypes  = ticketTypes.filter((t) => t.event_id === event.id)
      const sold     = evOrders.reduce((s, o) => s + Number(o.quantity || 0), 0)
      const capacity = evTypes.reduce((s, t) => s + Number(t.quantity || 0), 0)
      const revenue  = evOrders
        .filter((o) => o.payment_status === 'paid')
        .reduce((s, o) => s + Number(o.total_amount || 0), 0)
      const soldPct  = capacity > 0 ? Math.round((sold / capacity) * 100) : 0
      const revenuePerTicket = sold > 0 ? revenue / sold : 0
      const dateRaw  = event.event_date || event.date || null
      return {
        id: event.id,
        name: event.event_name || event.name || 'Unnamed Event',
        date: dateRaw ? new Date(dateRaw).getTime() : null,
        dateLabel: formatDate(dateRaw),
        sold,
        capacity,
        soldPct,
        revenue,
        revenuePerTicket,
        orderCount: evOrders.length,
      }
    }),
  [events, orders, ticketTypes])

  const { sorted, sort, toggle } = useSortedRows(eventRows)

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gray-50">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs tracking-widest text-gray-400 uppercase">Loading overview…</p>
      </div>
    )
  }

  return (
    <div className="px-6 lg:px-10 py-8 bg-gray-50 min-h-screen text-gray-900">

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-1">Dashboard</p>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Overview</h1>
          <p className="text-xs text-gray-400 mt-1">
            Updated {lastUpdated}
          </p>
        </div>

        <button
          onClick={() => fetchOverviewData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded-lg hover:text-gray-900 hover:border-gray-300 transition-all disabled:opacity-50"
        >
          <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          id="events"
          icon={CalendarDays}
          label="Total Events"
          value={events.length}
          sub={`${eventRows.filter(r => r.date && r.date > Date.now()).length} upcoming`}
        />
        <StatCard
          id="tickets"
          icon={Ticket}
          label="Tickets Sold"
          value={`${totalTicketsSold.toLocaleString()} / ${totalTickets.toLocaleString()}`}
          sub={`${overallSoldPct}% capacity filled`}
        />
        <StatCard
          id="orders"
          icon={ShoppingCart}
          label="Total Orders"
          value={totalOrders.toLocaleString()}
          sub={`${paidOrders.length} paid`}
        />
        <StatCard
          id="payout"
          icon={TrendingUp}
          label="Net Payout"
          value={`₱${formatPHP(netPayout)}`}
          sub="from paid orders"
        />
      </div>

      {/* ── Events Table ── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

        {/* Table header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 text-sm">All Events</h2>
          <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2.5 py-0.5 font-medium">
            {events.length} {events.length === 1 ? 'event' : 'events'}
          </span>
        </div>

        {sorted.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <CalendarDays size={28} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-400">No events yet. Create your first event to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <SortTh label="Event"         sortKey="name"       sort={sort} toggle={toggle} className="pl-6" />
                  <SortTh label="Date"          sortKey="date"       sort={sort} toggle={toggle} />
                  <SortTh label="Sold / Cap"    sortKey="sold"       sort={sort} toggle={toggle} />
                  <SortTh label="Fill rate"     sortKey="soldPct"    sort={sort} toggle={toggle} />
                  <SortTh label="Orders"        sortKey="orderCount" sort={sort} toggle={toggle} />
                  <SortTh label="Revenue (PHP)" sortKey="revenue"    sort={sort} toggle={toggle} />
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {sorted.map((row) => {
                  const health = healthLabel(row.soldPct)
                  const isHovered = hoverRow === row.id
                  return (
                    <tr
                      key={row.id}
                      onMouseEnter={() => setHoverRow(row.id)}
                      onMouseLeave={() => setHoverRow(null)}
                      className="border-b border-gray-50 hover:bg-blue-50/40 transition-colors duration-100 group"
                    >
                      {/* Event name + health badge */}
                      <td className="px-5 pl-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <span className="font-semibold text-gray-900 leading-tight">{row.name}</span>
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                            style={{ color: health.color, background: health.bg }}
                          >
                            {health.label}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-gray-500 tabular-nums whitespace-nowrap">
                        {row.dateLabel}
                      </td>

                      {/* Sold / Capacity */}
                      <td className="px-5 py-4 tabular-nums">
                        <span className="font-medium text-gray-900">{row.sold.toLocaleString()}</span>
                        <span className="text-gray-400"> / {row.capacity.toLocaleString()}</span>
                      </td>

                      {/* Fill rate bar */}
                      <td className="px-5 py-4">
                        <SoldBar pct={row.soldPct} animate={animateBars} />
                      </td>

                      {/* Orders */}
                      <td className="px-5 py-4 tabular-nums text-gray-600">{row.orderCount}</td>

                      {/* Revenue — hover reveals per-ticket */}
                      <td className="px-5 py-4 tabular-nums">
                        <span className="font-medium text-gray-900">
                          {formatPHP(row.revenue)}
                        </span>
                        {isHovered && row.revenuePerTicket > 0 && (
                          <p className="text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">
                            ₱{formatPHP(row.revenuePerTicket)} / ticket
                          </p>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4">
                        <button
                          onClick={() => navigate(`${BASE}/dashboard/${row.id}`)}
                          className="flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-all duration-150 whitespace-nowrap"
                        >
                          View <ExternalLink size={10} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>

              {/* Footer totals */}
              <tfoot>
                <tr className="bg-gray-50 border-t-2 border-gray-200">
                  <td className="px-5 pl-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Totals
                  </td>
                  <td className="px-5 py-3" />
                  <td className="px-5 py-3 tabular-nums text-xs font-bold text-gray-700">
                    {totalTicketsSold.toLocaleString()} / {totalTickets.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500">{overallSoldPct}% overall</td>
                  <td className="px-5 py-3 tabular-nums text-xs font-bold text-gray-700">
                    {totalOrders}
                  </td>
                  <td className="px-5 py-3 tabular-nums text-xs font-bold text-gray-700">
                    {formatPHP(netPayout)}
                  </td>
                  <td className="px-5 py-3" />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}