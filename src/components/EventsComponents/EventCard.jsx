import { useState } from 'react'
import TicketForm from './TicketForm'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'


function EventCard({ event }) {
  const {
    title = '',
    category = '',
    ageRestriction = '',
    event_date,
    venue = {},
    description = '',
    tickets = [],
    soldOut = false,
    tag = 'Live Event',
    poster_image = '',
  } = event

  const [showForm, setShowForm] = useState(false)

  const safeTickets = Array.isArray(tickets) ? tickets : []

  const formatDate = (dateValue) => {
    if (!dateValue) return 'Date TBA'

    const date = dateValue?.toDate
      ? dateValue.toDate()
      : new Date(dateValue)

    return date.toLocaleDateString('en-PH', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const lowestPrice =
    safeTickets.length > 0
      ? safeTickets.reduce(
          (min, t) => (Number(t.price) < min ? Number(t.price) : min),
          Infinity
        )
      : 0

  const allUnavailable =
    safeTickets.length > 0
      ? safeTickets.every((t) => !t.available)
      : false

  const isFree = lowestPrice === 0

  const formatPrice = (price) =>
    Number(price) === 0 ? 'Free' : `₱${Number(price).toLocaleString()}`

  return (
    <>
      <article className="group relative flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white hover:bg-neutral-50 hover:border-black/20 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5">
        <div className="w-full aspect-[426/601] overflow-hidden bg-neutral-100 border-b border-black/10 flex items-center justify-center">
          {poster_image ? (
            <img
              src={poster_image}
              alt={title || 'Event poster'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center px-6">
              <p className="text-sm text-black/40">No poster uploaded</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-widest uppercase font-semibold border ${
                soldOut
                  ? 'text-black border-black/20 bg-transparent'
                  : 'text-(--color-soul-accent) border-(--color-soul-accent)/30 bg-(--color-soul-accent)/8'
              }`}
            >
              {soldOut ? 'Sold Out' : tag}
            </span>

            {ageRestriction && (
              <span className="text-[10px] text-black tracking-widest border border-black/20 rounded px-1.5 py-0.5">
                {ageRestriction}
              </span>
            )}
          </div>

          <div>
            <h3 className="text-black text-[17px] font-semibold leading-snug tracking-tight mb-1">
              {title || 'Untitled Event'}
            </h3>

            <p className="text-black text-[11px] tracking-wider uppercase font-medium">
              {category || 'Event'}
            </p>
          </div>

          <div>
            <p className="text-black text-[12px] leading-snug font-medium">
              {formatDate(event_date)}
            </p>
          </div>

          <div>
            <p className="text-black text-[12px] leading-snug font-medium">
              {venue.name || 'Venue TBA'}
            </p>

            <p className="text-black text-[11px]">
              {[venue.street, venue.city, venue.province].filter(Boolean).join(', ')}
            </p>
          </div>

          <div className="h-px bg-black/10" />

          <p className="text-black text-[12.5px] leading-relaxed flex-1">
            {description || 'No description yet.'}
          </p>

          {safeTickets.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {safeTickets.map((t, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-black/[0.03] border border-black/10 ${
                    !t.available ? 'opacity-35' : ''
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium truncate text-black">
                      {t.type}
                    </p>

                    {t.detail && (
                      <p className="text-black text-[10px] leading-snug truncate">
                        {t.detail}
                      </p>
                    )}
                  </div>

                  <span className="text-[11px] font-semibold shrink-0 tabular-nums text-black">
                    {formatPrice(t.price)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            disabled={soldOut || allUnavailable}
            onClick={() => setShowForm(true)}
            className={`mt-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-[11px] tracking-widest uppercase font-semibold border transition-all duration-200 ease-out ${
              soldOut || allUnavailable
                ? 'cursor-not-allowed opacity-30 text-black border-black/20 bg-transparent'
                : 'text-white bg-black border-black hover:bg-(--color-soul-accent) hover:border-(--color-soul-accent) cursor-pointer'
            }`}
          >
            {soldOut || allUnavailable
              ? 'Sold Out'
              : isFree
              ? 'Register Free'
              : `Get Tickets · ${formatPrice(lowestPrice)}`}
          </button>
        </div>
      </article>

      {showForm && (
        <TicketForm event={event} onClose={() => setShowForm(false)} />
      )}
    </>
  )
}

export default EventCard