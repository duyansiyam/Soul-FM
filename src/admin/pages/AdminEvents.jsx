import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { useSelectedEvent } from '../context/AdminSelectedEventContext'
import {
  LayoutDashboard,
  FileText,
  Ticket,
  ShoppingCart,
  Plus,
  Trash2,
  Pencil,
  ExternalLink,
  CalendarDays,
  MapPin,
  Search,
  X,
  AlertTriangle,
} from 'lucide-react'

const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

const EVENT_SECTIONS = [
  { label: 'Dashboard',     icon: LayoutDashboard, path: (id) => `${BASE}/dashboard/${id}` },
  { label: 'Event Details', icon: FileText,         path: (id) => `${BASE}/event-details/${id}` },
  { label: 'Ticket Types',  icon: Ticket,           path: (id) => `${BASE}/ticket-types/${id}` },
  { label: 'Orders',        icon: ShoppingCart,     path: (id) => `${BASE}/orders/${id}` },
]

const STATUS_META = {
  published: { color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
  active:    { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  draft:     { color: '#6B7280', bg: '#F9FAFB', border: '#E5E7EB' },
  cancelled: { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
  completed: { color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
}

function statusMeta(status) {
  return STATUS_META[(status || '').toLowerCase()] ?? STATUS_META.draft
}

// ─── Delete confirm modal ────────────────────────────────────────────────────

function DeleteModal({ eventName, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertTriangle size={18} className="text-red-600" />
        </div>
        <h3 className="font-bold text-gray-900 mb-1">Delete event?</h3>
        <p className="text-sm text-gray-500 mb-6">
          <span className="font-semibold text-gray-700">"{eventName}"</span> will be permanently removed. This can't be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-lg bg-red-600 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Skeleton card ───────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="p-5 flex items-center gap-4">
        <div className="w-20 h-28 rounded-lg bg-gray-100 shrink-0" />
        <div className="flex-1 space-y-2.5">
          <div className="h-3.5 w-2/5 bg-gray-100 rounded" />
          <div className="h-3 w-1/4 bg-gray-100 rounded" />
          <div className="h-3 w-1/3 bg-gray-100 rounded" />
        </div>
        <div className="flex gap-2 shrink-0">
          {[1,2,3].map(i => <div key={i} className="w-16 h-8 bg-gray-100 rounded-lg" />)}
        </div>
      </div>
      <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
        <div className="grid grid-cols-4 gap-3">
          {[1,2,3,4].map(i => <div key={i} className="h-10 bg-gray-100 rounded-lg" />)}
        </div>
      </div>
    </div>
  )
}

// ─── Event card ──────────────────────────────────────────────────────────────

function EventCard({ event, onOpen, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const meta = statusMeta(event.status)

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-150 group">
      <div className="p-5 flex items-center justify-between gap-5">

        {/* Poster + info */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-20 h-28 rounded-lg overflow-hidden bg-gray-100 shrink-0 ring-1 ring-black/5">
            {event.poster_image ? (
              <img
                src={event.poster_image}
                alt={event.title || 'Event poster'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest select-none">
                No photo
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2.5">
              <h2 className="text-sm font-bold text-gray-900 truncate">
                {event.title || 'Untitled Event'}
              </h2>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize"
                style={{ color: meta.color, background: meta.bg, borderColor: meta.border }}
              >
                {event.status || 'draft'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
              <CalendarDays size={11} className="shrink-0 text-gray-400" />
              {formatDate(event.event_date || event.start_date)}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin size={11} className="shrink-0 text-gray-400" />
              <span className="truncate max-w-[220px]">
                {event.location_name || event.venue_name || event.venue_address || 'Venue TBA'}
              </span>
            </div>

            {event.category && (
              <span className="inline-block mt-2 text-[10px] bg-gray-100 text-gray-500 rounded px-1.5 py-0.5 font-medium">
                {event.category}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpen}
            className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold uppercase tracking-wide text-blue-600 hover:bg-blue-100 transition"
          >
            <ExternalLink size={11} /> Open
          </button>

          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition"
          >
            <Pencil size={11} /> Edit
          </button>

          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-xs font-bold uppercase tracking-wide text-red-500 hover:bg-red-50 hover:border-red-200 transition"
          >
            <Trash2 size={11} />
          </button>

          {/* Toggle sections */}
          <button
            onClick={() => setExpanded(p => !p)}
            className="rounded-lg border border-gray-200 px-2.5 py-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition text-xs"
          >
            {expanded ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* Section shortcuts */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Jump to section
          </p>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
            {EVENT_SECTIONS.map((section) => (
              <SectionButton key={section.label} section={section} eventId={event.id} eventName={event.title} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SectionButton({ section, eventId, eventName }) {
  const navigate = useNavigate()
  const { setSelectedEvent } = useSelectedEvent() ?? {}
  const Icon = section.icon
  return (
    <button
      onClick={() => {
        setSelectedEvent?.({ id: eventId, name: eventName })
        navigate(section.path(eventId))
      }}
      className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-left text-xs font-semibold text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition"
    >
      <Icon size={13} className="shrink-0 text-gray-400" />
      {section.label}
    </button>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function AdminEvents() {
  const navigate = useNavigate()
  const { setSelectedEvent } = useSelectedEvent() ?? {}

  const [events, setEvents]     = useState([])
  const [fetching, setFetching] = useState(true)
  const [fetchErr, setFetchErr] = useState('')
  const [filters, setFilters]   = useState({ status: '', category: '' })
  const [deleteTarget, setDeleteTarget] = useState(null) // { id, name }
  const [deleting, setDeleting] = useState(false)

  const fetchEvents = async () => {
    setFetching(true)
    setFetchErr('')
    try {
      const snapshot = await getDocs(collection(db, 'events'))
      const data = snapshot.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => getDateValue(a.event_date || a.start_date) - getDateValue(b.event_date || b.start_date))
      setEvents(data)
    } catch (err) {
      console.error(err)
      setFetchErr('Failed to fetch events. Check your connection and try again.')
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => { fetchEvents() }, [])

  const filtered = useMemo(() =>
    events.filter((e) => {
      const matchStatus   = filters.status   ? e.status === filters.status : true
      const matchCategory = filters.category ? e.category?.toLowerCase().includes(filters.category.toLowerCase()) : true
      return matchStatus && matchCategory
    }),
  [events, filters])

  const clearFilters = () => setFilters({ status: '', category: '' })
  const hasFilters   = filters.status || filters.category

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteDoc(doc(db, 'events', deleteTarget.id))
      setSelectedEvent?.(null)
      setDeleteTarget(null)
      fetchEvents()
    } catch {
      alert('Failed to delete event. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="px-6 lg:px-10 py-8 min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Management</p>
          <h1 className="text-2xl font-bold text-gray-900">All Events</h1>
        </div>

        <button
          onClick={() => navigate(`${BASE}/event-details`)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition uppercase tracking-wide shadow-sm"
        >
          <Plus size={13} /> New Event
        </button>
      </div>

      {/* ── Filters ── */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <div className="relative">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            className="text-sm border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-44 transition"
            placeholder="Category…"
            value={filters.category}
            onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value }))}
          />
        </div>

        <select
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={filters.status}
          onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
        >
          <option value="">All Statuses</option>
          <option value="published">Published</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 px-2 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={12} /> Clear
          </button>
        )}

        <span className="ml-auto text-xs text-gray-400 tabular-nums">
          {fetching ? '—' : `${filtered.length} of ${events.length} events`}
        </span>
      </div>

      {/* ── Error ── */}
      {fetchErr && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-5">
          <AlertTriangle size={15} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-0.5">Something went wrong</p>
            <p className="text-xs text-red-500">{fetchErr}</p>
          </div>
        </div>
      )}

      {/* ── List ── */}
      <div className="space-y-3">
        {fetching ? (
          [1, 2, 3].map((i) => <SkeletonCard key={i} />)
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
            <CalendarDays size={32} className="mx-auto text-gray-200 mb-3" />
            {hasFilters ? (
              <>
                <p className="text-sm font-semibold text-gray-500 mb-1">No events match your filters</p>
                <button onClick={clearFilters} className="text-xs text-blue-500 hover:underline">Clear filters</button>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-gray-500 mb-1">No events yet</p>
                <button
                  onClick={() => navigate(`${BASE}/event-details`)}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Create your first event →
                </button>
              </>
            )}
          </div>
        ) : (
          filtered.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onOpen={() => {
                setSelectedEvent?.({ id: event.id, name: event.title })
                navigate(`${BASE}/dashboard/${event.id}`)
              }}
              onEdit={() => navigate(`${BASE}/event-details/${event.id}`)}
              onDelete={() => setDeleteTarget({ id: event.id, name: event.title || 'Untitled Event' })}
            />
          ))
        )}
      </div>

      {/* ── Delete modal ── */}
      {deleteTarget && (
        <DeleteModal
          eventName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </div>
  )
}

// ─── Utils ────────────────────────────────────────────────────────────────────

function formatDate(dateValue) {
  if (!dateValue) return 'Date TBA'
  const date = dateValue?.toDate ? dateValue.toDate() : new Date(dateValue)
  if (Number.isNaN(date.getTime())) return 'Date TBA'
  return date.toLocaleString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getDateValue(dateValue) {
  if (!dateValue) return Number.MAX_SAFE_INTEGER
  const date = dateValue?.toDate ? dateValue.toDate() : new Date(dateValue)
  return Number.isNaN(date.getTime()) ? Number.MAX_SAFE_INTEGER : date.getTime()
}