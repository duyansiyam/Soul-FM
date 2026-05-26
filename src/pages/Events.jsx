import { EVENTS } from '../components/EventsComponents/events.js'
import EventCard from '../components/EventsComponents/EventCard.jsx'

function Events() {
  const upcoming = EVENTS.filter((e) => !e.soldOut)
  const soldOut = EVENTS.filter((e) => e.soldOut)

  return (
    <main
      style={{
        fontFamily: 'var(--font-body)',
        background: `
          linear-gradient(
            to bottom,
            rgba(0,0,0,0.75) 0px,
            rgba(0,0,0,0.25) 90px,
            rgba(255,255,255,1) 160px
          ),
          radial-gradient(circle at top left, rgba(255, 0, 0, 0.08), transparent 35%),
          radial-gradient(circle at bottom right, rgba(255, 0, 0, 0.05), transparent 35%),
          linear-gradient(135deg, #ffffff 0%, #f7f7f7 45%, #eeeeee 100%)
        `,
      }}
      className="relative min-h-screen text-black pt-28 pb-24 px-6 lg:px-10 overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute top-[-250px] right-[-250px] w-[700px] h-[700px] bg-red-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.2em] uppercase text-(--color-soul-accent) mb-3 font-medium">
            What's on
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-none mb-4 text-black">
            Events
          </h1>

          <p className="text-black/55 text-base max-w-xl leading-relaxed">
            From underground listening sessions to open-air block parties —
            here's where SoulFM meets you in real life. Tickets via Ticketmelon.
          </p>
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-(--color-soul-accent)" />

              <h2 className="text-[11px] tracking-[0.15em] uppercase text-black/45 font-medium">
                Upcoming
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
              <span className="w-1.5 h-1.5 rounded-full bg-black/20" />

              <h2 className="text-[11px] tracking-[0.15em] uppercase text-black/35 font-medium">
                Sold Out
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 opacity-50">
              {soldOut.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Empty */}
        {EVENTS.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-3">
            <p className="text-black/40 text-sm tracking-wide">
              No events scheduled yet.
            </p>

            <p className="text-black/30 text-xs">
              Check back soon.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Events