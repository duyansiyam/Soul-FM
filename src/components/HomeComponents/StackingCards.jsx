import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import cardImg1 from '../../assets/card-about.jpg'
import cardImg2 from '../../assets/card-nowplaying.jpg'
import cardImg3 from '../../assets/card-schedule.jpg'
import cardImg4 from '../../assets/card-djs.jpg'

const cards = [
  { to: '/about',         label: 'About',        sub: 'Our Story',   img: cardImg1 },
  { to: '/now-playing',   label: 'Now Playing',  sub: 'Live Stream', img: cardImg2 },
  { to: '/show-schedule', label: 'Schedule',     sub: 'Show Times',  img: cardImg3 },
  { to: '/about#djs',     label: 'Meet the DJs', sub: 'The Team',    img: cardImg4 },
]

const CARD_TOP = 80 // how far from top cards rest when stacked

export default function StackingCards() {
  const cardsRef = useRef(null)

  useEffect(() => {
    if (!cardsRef.current || !('ViewTimeline' in window)) return

    const lis     = Array.from(cardsRef.current.querySelectorAll('li'))
    const inners  = Array.from(cardsRef.current.querySelectorAll('.card-inner'))
    const n       = inners.length

    inners.forEach((card, i) => {
      if (i === n - 1) return // last card never scales

      // Watch the NEXT li entering — that's when this card should shrink
      const timeline = new ViewTimeline({ subject: lis[i + 1], axis: 'block' })

      card.animate(
        {
          transform: [`scale(1)`, `scale(${1 - 0.05 * (n - i - 1)})`],
          filter:    ['brightness(1)', 'brightness(0.5)'],
        },
        {
          timeline,
          fill:       'both',
          rangeStart: 'entry 10%',
          rangeEnd:   'entry 90%',
          easing:     'ease-out',
        }
      )
    })
  }, [])

  return (
    /*
      Key insight: the <ul> is NOT a scroll container.
      Each <li> is tall enough to create scroll distance (100vh),
      and the inner card is sticky within it.
      The section itself has no explicit height — it's just the sum of its children.
      `overflow: clip` (not hidden) prevents bleed without creating a new scroll context.
    */
    <section style={{ overflow: 'clip' }}>
      <ul
        ref={cardsRef}
        className="max-w-7xl mx-auto px-6 lg:px-10"
        style={{ listStyle: 'none', padding: 0, margin: '0 auto' }}
      >
        {cards.map(({ to, label, sub, img }, i) => (
          <li
            key={to}
            style={{
              // Each li is one "scroll step" tall.
              // The last li only needs to be as tall as the card itself — no extra scroll.
              height: i < cards.length - 1 ? '100vh' : 'auto',
              // Pad the last li bottom so next section starts clean
              paddingBottom: i === cards.length - 1 ? '6rem' : 0,
            }}
          >
            <div
              className="card-inner grid grid-cols-2 rounded-2xl overflow-hidden border border-white/6 bg-[#141414]"
              style={{
                height: '340px',
                position: 'sticky',
                top: `${CARD_TOP + i * 18}px`,
                zIndex: i + 1,
                transformOrigin: '50% 0%',
                willChange: 'transform, filter',
              }}
            >
              <div className="p-10 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] tracking-[0.22em] uppercase text-white/20 mb-3">{sub}</p>
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                    }}
                    className="text-white/85 mb-4 leading-tight"
                  >
                    {label}
                  </h2>
                </div>
                <Link
                  to={to}
                  className="self-start text-[11px] tracking-[0.14em] uppercase text-white/20 hover:text-white/60 transition-colors duration-200 border-b border-white/10 hover:border-white/25 pb-0.5"
                >
                  Explore →
                </Link>
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={img}
                  alt={label}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#141414]/40 to-transparent" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}