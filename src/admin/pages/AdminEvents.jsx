import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../../firebase'

const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

export default function AdminEvents() {
  const navigate = useNavigate()

  const [events, setEvents] = useState([])
  const [fetching, setFetching] = useState(true)
  const [fetchErr, setFetchErr] = useState('')
  const [filters, setFilters] = useState({ status: '', category: '' })

  const fetchEvents = async () => {
    setFetching(true)
    setFetchErr('')

    try {
      const eventsQuery = query(
        collection(db, 'events'),
        orderBy('event_date', 'asc')
      )

      const snapshot = await getDocs(eventsQuery)

      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))

      setEvents(data)
    } catch (error) {
      console.log(error)
      setFetchErr('Failed to fetch events from Firebase')
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchStatus = filters.status
      ? event.status === filters.status
      : true

    const matchCategory = filters.category
      ? event.category?.toLowerCase().includes(filters.category.toLowerCase())
      : true

    return matchStatus && matchCategory
  })

  const formatDate = (dateValue) => {
    if (!dateValue) return 'Date TBA'

    const date = dateValue?.toDate ? dateValue.toDate() : new Date(dateValue)

    return date.toLocaleString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const goToDashboard = (event) => {
    navigate(`${BASE}/dashboard/${event.id}`)
  }

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm('Delete this event?')

    if (!confirmDelete) return

    try {
      await deleteDoc(doc(db, 'events', eventId))
      fetchEvents()
    } catch (error) {
      console.log(error)
      alert('Failed to delete event')
    }
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
            Management
          </p>

          <h1 className="text-2xl font-bold text-gray-900">
            Events
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          <input
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
            placeholder="Filter by category…"
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition uppercase tracking-wide"
          >
            + New Event
          </button>
        </div>
      </div>

      {fetchErr && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center gap-2 mb-4">
          <span>⚠</span>
          <span>{fetchErr}</span>
        </div>
      )}

      <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">
        {fetching
          ? 'Loading…'
          : `${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''} found`}
      </p>

      <div className="space-y-4">
        {fetching ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center text-sm text-gray-400">
            Loading events…
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center text-sm text-gray-400">
            No events found. Create one!
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-5 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-20 h-28 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  {event.poster_image ? (
                    <img
                      src={event.poster_image}
                      alt={event.title || 'Event poster'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm font-bold text-gray-900">
                      {event.title || 'Untitled Event'}
                    </h2>

                    <span className="px-2 py-0.5 rounded-full text-xs border border-green-300 bg-green-50 text-green-700">
                      ● {event.status || 'Published'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mt-4">
                    ● {formatDate(event.event_date)}
                  </p>

                  <p className="text-xs text-gray-600 mt-2">
                    📍 {event.venue?.name || event.location_address || 'Venue TBA'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={() => goToDashboard(event)}
                  className="text-sky-500 hover:text-sky-700 text-lg"
                  title="Event Dashboard"
                >
                  ▣
                </button>

                <button
                  className="text-gray-500 hover:text-blue-600 text-lg"
                  title="Edit Event"
                >
                  ✎
                </button>

                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-gray-500 hover:text-red-600 text-lg"
                  title="Delete Event"
                >
                  🗑
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}