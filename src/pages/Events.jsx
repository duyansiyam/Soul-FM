import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import EventCard from '../components/EventsComponents/EventCard.jsx'

function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [eventsSnapshot, ticketTypesSnapshot] = await Promise.all([
          getDocs(collection(db, 'events')),
          getDocs(collection(db, 'ticket_types')),
        ])

        const ticketTypesByEvent = ticketTypesSnapshot.docs.reduce((grouped, doc) => {
          const ticket = {
            id: doc.id,
            ...doc.data(),
          }

          if (!ticket.event_id) return grouped

          return {
            ...grouped,
            [ticket.event_id]: [...(grouped[ticket.event_id] || []), ticket],
          }
        }, {})

        const data = eventsSnapshot.docs
          .map((doc) => normalizeEvent(doc.id, doc.data(), ticketTypesByEvent[doc.id] || []))
          .filter((event) => event.status === 'published')
          .sort((a, b) => getDateValue(a.event_date) - getDateValue(b.event_date))

        setEvents(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const upcoming = events.filter((e) => !e.soldOut)
  const soldOut = events.filter((e) => e.soldOut)

  if (loading) {
    return (
      <main className="min-h-screen pt-28 flex items-center justify-center">
        <p className="text-black/50">Loading events...</p>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen text-black pt-28 pb-24 px-6 lg:px-10 overflow-hidden bg-white">
  {/* Top dark gradient */}
  <div className="absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none" />

  {/* Right pink glow */}
  <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-pink-200/40 blur-[150px] rounded-full pointer-events-none" />

  {/* Center white glow */}
  <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-white/80 blur-[120px] rounded-full pointer-events-none" />

  {/* Content */}
  <div className="relative max-w-7xl mx-auto"></div>
      <div className="relative max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.2em] uppercase text-red-600 mb-3 font-medium">
            What's on
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-none mb-4 text-black">
            Events
          </h1>

          <p className="text-black/55 text-base max-w-xl leading-relaxed">
            From underground listening sessions to open-air block parties —
            here's where SoulFM meets you in real life.
          </p>
        </div>

        {upcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="text-[11px] tracking-[0.15em] uppercase text-black/45 font-medium mb-6">
              Upcoming
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {soldOut.length > 0 && (
          <section>
            <h2 className="text-[11px] tracking-[0.15em] uppercase text-black/35 font-medium mb-6">
              Sold Out
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 opacity-50">
              {soldOut.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-3">
            <p className="text-black/40 text-sm tracking-wide">
              No events scheduled yet.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Events

function normalizeEvent(id, event, ticketTypes) {
  const tickets = ticketTypes.map((ticket) => ({
    type: ticket.ticket_name || ticket.ticket_section || 'Ticket',
    price: Number(ticket.price || 0),
    currency: 'PHP',
    detail: ticket.ticket_section || '',
    available:
      ticket.availability !== false &&
      ticket.show_ticket !== false &&
      ticket.status !== 'unavailable',
  }))

  return {
    id,
    ...event,
    event_date: event.event_date || event.start_date,
    venue: event.venue || {
      name: event.location_name || event.venue_name || 'Venue TBA',
      street: event.location_address || event.venue_address || '',
    },
    tickets,
    soldOut: Boolean(event.soldOut),
    tag: event.tag || 'Live Event',
  }
}

function getDateValue(dateValue) {
  if (!dateValue) return Number.MAX_SAFE_INTEGER

  const date = dateValue?.toDate ? dateValue.toDate() : new Date(dateValue)

  return Number.isNaN(date.getTime()) ? Number.MAX_SAFE_INTEGER : date.getTime()
}
