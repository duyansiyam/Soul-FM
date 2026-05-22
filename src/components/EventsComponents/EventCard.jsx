function EventCard({ event }) {
  const {
    title,
    category,
    ageRestriction,
    dates,
    venue,
    description,
    tickets,
    ticketUrl,
    soldOut,
    tag,
  } = event

  const firstDate = dates[0]
  const lowestPrice = tickets.reduce((min, t) => (t.price < min ? t.price : min), Infinity)
  const allUnavailable = tickets.every((t) => !t.available)
  const isFree = lowestPrice === 0

  const formatPrice = (price) =>
    price === 0 ? 'Free' : `₱${price.toLocaleString()}`

  return (
    <article
      className="group relative flex flex-col gap-5 rounded-xl border border-white/8
        bg-white/3 hover:bg-white/5.5 hover:border-white/15
        p-6 transition-[background-color,border-color,transform] duration-300 ease-out
        hover:-translate-y-0.5 will-change-transform"
    >
      {/* Top row: tag + age restriction */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-widest uppercase font-semibold border
            ${soldOut
              ? 'text-white/25 border-white/10 bg-transparent'
              : 'text-(--color-soul-accent) border-(--color-soul-accent)/30 bg-(--color-soul-accent)/8'
            }`}
        >
          {soldOut ? 'Sold Out' : tag}
        </span>
        {ageRestriction > 0 && (
          <span className="text-[10px] text-white/25 tracking-widest border border-white/10 rounded px-1.5 py-0.5">
            {ageRestriction}+
          </span>
        )}
      </div>

      {/* Title + category */}
      <div>
        <h3 className="text-white text-[17px] font-semibold leading-snug tracking-tight mb-1">
          {title}
        </h3>
        <p className="text-white/30 text-[11px] tracking-wider uppercase">{category}</p>
      </div>

      {/* Date / time */}
      <div className="flex items-start gap-2.5">
        <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <div>
          <p className="text-white/70 text-[12px] leading-snug">{firstDate.date}</p>
          <p className="text-white/35 text-[11px]">
            {firstDate.startTime}
            {firstDate.endTime ? ` – ${firstDate.endTime}` : ''} · {firstDate.timezone}
          </p>
          {dates.length > 1 && (
            <p className="text-white/25 text-[10px] mt-0.5 tracking-wide">+{dates.length - 1} more date{dates.length > 2 ? 's' : ''}</p>
          )}
        </div>
      </div>

      {/* Venue */}
      <div className="flex items-start gap-2.5">
        <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        <div>
          <p className="text-white/70 text-[12px] leading-snug">{venue.name}</p>
          {venue.detail && (
            <p className="text-white/30 text-[11px]">{venue.detail}</p>
          )}
          <p className="text-white/25 text-[11px]">{venue.city}, {venue.province}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/6" />

      {/* Description */}
      <p className="text-white/40 text-[12.5px] leading-relaxed flex-1">
        {description}
      </p>

      {/* Ticket tiers */}
      <div className="flex flex-col gap-1.5">
        {tickets.map((t, i) => (
          <div
            key={i}
            className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-white/4 border border-white/6
              ${!t.available ? 'opacity-35' : ''}`}
          >
            <div className="min-w-0">
              <p className={`text-[11px] font-medium truncate ${t.available ? 'text-white/70' : 'text-white/40'}`}>
                {t.type}
              </p>
              {t.detail && (
                <p className="text-white/25 text-[10px] leading-snug truncate">{t.detail}</p>
              )}
            </div>
            <span className={`text-[11px] font-semibold shrink-0 tabular-nums
              ${t.price === 0 ? 'text-(--color-soul-accent)' : 'text-white/60'}`}>
              {formatPrice(t.price)}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={soldOut || allUnavailable ? undefined : ticketUrl}
        target={soldOut || allUnavailable ? undefined : '_blank'}
        rel="noopener noreferrer"
        onClick={(e) => (soldOut || allUnavailable) && e.preventDefault()}
        aria-disabled={soldOut || allUnavailable}
        className={`mt-1 inline-flex items-center justify-center gap-2
          px-5 py-2.5 rounded-md text-[11px] tracking-widest uppercase font-semibold
          border transition-[background-color,color,border-color] duration-200 ease-out
          ${soldOut || allUnavailable
            ? 'cursor-not-allowed opacity-25 text-white border-white/20 bg-transparent'
            : 'text-black bg-white border-white hover:bg-black hover:text-white cursor-pointer'
          }`}
      >
        {soldOut || allUnavailable
          ? 'Sold Out'
          : isFree
            ? 'Register Free'
            : `Get Tickets · ${formatPrice(lowestPrice)}`}
        {!soldOut && !allUnavailable && (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </a>
    </article>
  )
}

export default EventCard
