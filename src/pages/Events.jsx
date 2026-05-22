import { EVENTS } from '../components/EventsComponents/events.js'
import EventCard from '../components/EventsComponents/EventCard.jsx'

function Events() {
  const upcoming = EVENTS.filter((e) => !e.soldOut)
  const soldOut = EVENTS.filter((e) => e.soldOut)

  return (
    <main
      style={{ fontFamily: 'var(--font-body)' }}
      className="min-h-screen bg-(--color-soul-black) text-white pt-28 pb-24 px-6 lg:px-10"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.2em] uppercase text-(--color-soul-accent) mb-3 font-medium">
            What's on
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-none mb-4">
            Events
          </h1>
          <p className="text-white/40 text-base max-w-xl leading-relaxed">
            From underground listening sessions to open-air block parties — here's where SoulFM
            meets you in real life. Tickets via Ticketmelon.
          </p>
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-(--color-soul-accent)" />
              <h2 className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-medium">
                Upcoming
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Sold Out */}
        {soldOut.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <h2 className="text-[11px] tracking-[0.15em] uppercase text-white/25 font-medium">
                Sold Out
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-50">
              {soldOut.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {EVENTS.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-3">
            <p className="text-white/20 text-sm tracking-wide">No events scheduled yet.</p>
            <p className="text-white/10 text-xs">Check back soon.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Events
