import { useEffect } from 'react'
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

const css = `
  #cards {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    padding-bottom: calc(var(--numcards) * 10vh);

    /* This element is tracked for the scroll animation */
    view-timeline-name: --cards-element-scrolls-in-body;
    view-timeline-axis: block;
  }

  .card {
    --index0: calc(var(--index) - 1);
    --reverse-index: calc(var(--numcards) - var(--index0));
    --reverse-index0: calc(var(--reverse-index) - 1);

    padding-top: 1.5rem;
  }

  .card__content {
    position: sticky;
    top: calc(var(--index0) * 16px + 80px);
    z-index: var(--index);
    transform-origin: 50% 0%;

    --start-range: calc(var(--index0) / var(--numcards) * 100%);
    --end-range: calc(var(--index) / var(--numcards) * 100%);

    animation: card-scale linear forwards;
    animation-timeline: --cards-element-scrolls-in-body;
    animation-range: exit-crossing var(--start-range) exit-crossing var(--end-range);
  }

  @keyframes card-scale {
    to {
      transform: scale(calc(1.1 - 0.1 * var(--reverse-index)));
      filter: brightness(calc(1 - 0.15 * var(--reverse-index0)));
    }
  }
`

export default function StackingCards() {
  const numCards = cards.length

  useEffect(() => {
    const el = document.createElement('style')
    el.id = 'stacking-cards-css'
    el.textContent = css
    if (!document.getElementById('stacking-cards-css')) document.head.appendChild(el)
    return () => document.getElementById('stacking-cards-css')?.remove()
  }, [])

  return (
    <section style={{ overflow: 'clip' }}>
      <ul
        id="cards"
        className="max-w-7xl mx-auto px-6 lg:px-10"
        style={{ '--numcards': numCards }}
      >
        {cards.map(({ to, label, sub, img }, i) => (
          <li
            key={to}
            className="card"
            style={{ '--index': i + 1 }}
          >
            <div
              className="card__content grid grid-cols-2 rounded-2xl overflow-hidden border border-white/6 bg-[#141414]"
              style={{ height: '340px' }}
            >
              <div className="p-10 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] tracking-[0.22em] uppercase text-white/20 mb-3">{sub}</p>
                  <h2
                    style={{
                      fontFamily:    'var(--font-heading)',
                      fontSize:      'clamp(1.8rem, 4vw, 3rem)',
                      fontWeight:    400,
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