import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroVideo from '../assets/hero-video.mp4'

import cardImg1 from '../assets/card-about.jpg'
import cardImg2 from '../assets/card-nowplaying.jpg'
import cardImg3 from '../assets/card-schedule.jpg'
import cardImg4 from '../assets/card-djs.jpg'

const cards = [
  { to: '/about',         label: 'About',        sub: 'Our Story',   img: cardImg1 },
  { to: '/now-playing',   label: 'Now Playing',  sub: 'Live Stream', img: cardImg2 },
  { to: '/show-schedule', label: 'Schedule',     sub: 'Show Times',  img: cardImg3 },
  { to: '/about#djs',     label: 'Meet the DJs', sub: 'The Team',    img: cardImg4 },
]

const genres = ['R&B', 'Hip Hop', 'Jazz', 'Funk', 'Reggae']

// Each card sticks at a slightly lower position than the previous one,
// so they visually fan out / stack like a deck of cards.
const CARD_TOP_OFFSET = 48   // px — top position for the first card
const CARD_TOP_STEP   = 20   // px — each subsequent card is pushed down by this amount

const stackingCardStyles = `
  #cards {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr;
    padding-bottom: calc(var(--numcards, 4) * 1.5rem);
  }

  .card {
    padding-top: 1.5rem;
  }

  /* sticky on card__content (NOT .card) so scroll height is preserved */
  .card__content {
    position: sticky;
    transform-origin: 50% 0%;
    will-change: transform;
  }

  /* never clip sticky children */
  .cards-section {
    overflow: visible !important;
  }
`

export default function Home() {
  const videoRef = useRef(null)
  const cardsRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const styleEl = document.createElement('style')
    styleEl.id = 'stacking-card-styles'
    styleEl.textContent = stackingCardStyles
    if (!document.getElementById('stacking-card-styles')) {
      document.head.appendChild(styleEl)
    }
    return () => {
      document.getElementById('stacking-card-styles')?.remove()
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!cardsRef.current) return

    const cardEls = cardsRef.current.querySelectorAll('.card__content')
    const numCards = cardEls.length
    if (!numCards) return

    cardsRef.current.style.setProperty('--numcards', numCards)

    if (!('ViewTimeline' in window)) {
      console.warn('ViewTimeline not supported — requires Chrome 115+')
      return
    }

    const viewTimeline = new ViewTimeline({
      subject: cardsRef.current,
      axis: 'block',
    })

    cardEls.forEach(($card, index0) => {
      const index        = index0 + 1
      const reverseIndex0 = numCards - index

      $card.animate(
        { transform: [`scale(1)`, `scale(${1 - 0.1 * reverseIndex0})`] },
        {
          timeline: viewTimeline,
          fill: 'forwards',
          rangeStart: `exit-crossing ${CSS.percent((index0 / numCards) * 100)}`,
          rangeEnd:   `exit-crossing ${CSS.percent((index  / numCards) * 100)}`,
        }
      )
    })
  }, [])

  return (
    <main
      style={{ fontFamily: 'var(--font-body)' }}
      className="bg-[var(--color-soul-black)] text-[var(--color-soul-white)]"
    >

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-soul-black)]/60" />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.3) 50%, transparent 100%)'
        }} />

        <div className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-40 transition-all duration-1000 ease-out
          ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-6">
            San Bernardino · Est. 2024
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
            className="text-[var(--color-soul-white)] mb-2 max-w-4xl"
          >
            Groove to<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(245,240,235,0.85)' }}>Timeless</em>{' '}
            R&B Hits
          </h1>

          <p className="text-white/40 text-sm tracking-wide mt-6 mb-10 max-w-md font-light">
            Tune into old school R&B in San Bernardino & listen worldwide
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <Link
              to="/now-playing"
              className="group flex items-center gap-3 px-7 py-3.5 rounded-full text-[12px] tracking-[0.12em] uppercase font-medium
                bg-[var(--color-soul-accent)] text-[var(--color-soul-black)]
                hover:brightness-110 transition-all duration-200 active:scale-95"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-soul-black)]/50 group-hover:animate-ping" />
              Listen Now
            </Link>
            <a
              href="tel:9098930169"
              className="text-[11px] tracking-[0.15em] uppercase text-white/25 hover:text-white/60 transition-colors duration-200"
            >
              (909) 893-0169
            </a>
          </div>

          <div className="mt-16 flex items-center gap-3">
            <div className="w-px h-8 bg-white/10" style={{ animation: 'soulfm-breathe 2.5s ease-in-out infinite' }} />
            <span className="text-[9px] tracking-[0.2em] uppercase text-white/15">Scroll</span>
          </div>
        </div>
      </section>

      {/* ── STACKING CARDS ──
          .cards-section keeps overflow:visible so sticky works.
          Each card__content gets its own `top` offset via inline style —
          this is what makes them fan/stack instead of all colliding at the same Y. */}
      <section className="cards-section max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <ul id="cards" ref={cardsRef}>
          {cards.map(({ to, label, sub, img }, index0) => (
            <li key={to} className="card">
              <div
                className="card__content grid grid-cols-2 rounded-2xl overflow-hidden border border-white/[0.06] bg-[#141414]"
                style={{
                  minHeight: '320px',
                  // Each card sticks progressively lower so you can see the stack
                  top: `${CARD_TOP_OFFSET + index0 * CARD_TOP_STEP}px`,
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
                  <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/40 to-transparent" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-16 items-start border-t border-white/[0.04]">
        <div>
          <p className="text-[9px] tracking-[0.22em] uppercase text-white/20 mb-6">Immerse Yourself</p>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
            className="text-white/85"
          >
            Classic Sounds<br />
            <em>for the soul</em>
          </h2>
        </div>
        <div className="space-y-5 text-white/35 text-sm leading-relaxed font-light pt-2">
          <p>
            Step into a world where the rich tones of R&B, Hip Hop, Jazz, Funk, and Reggae fill the airwaves.
            At Soul FM, based in San Bernardino, you're invited to relive the golden era of music with a modern twist.
          </p>
          <p>
            Our station, which began in 2024, is more than just music — it's an experience. We take song requests
            from our listeners, ensuring your voice is part of our playlist.
          </p>
          <div className="pt-4 flex flex-wrap gap-2">
            {genres.map(g => (
              <span key={g} className="px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase border border-white/[0.08] text-white/30 rounded-full">
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULLWIDTH BANNER ── */}
      <section className="relative overflow-hidden mt-16 py-32 border-t border-white/[0.04]">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,255,0,0.04) 0%, transparent 70%)'
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[9px] tracking-[0.25em] uppercase text-white/15 mb-8">Your Retro Music Haven</p>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
            className="text-white/80 mb-10"
          >
            Feel the rhythm<br />
            <em>with every beat</em>
          </h2>
          <Link
            to="/now-playing"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[11px] tracking-[0.15em] uppercase
              border border-white/10 text-white/35 hover:border-white/25 hover:text-white/70
              transition-all duration-300"
          >
            <span className="w-1 h-1 rounded-full bg-[var(--color-soul-accent)]" />
            Listen Now
          </Link>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 border-t border-white/[0.04]">
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <p className="text-[9px] tracking-[0.22em] uppercase text-white/20 mb-4">Values</p>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
              className="text-white/75"
            >
              What drives<br /><em>Soul FM</em>
            </h2>
          </div>
          <div className="lg:col-span-2 space-y-6 text-white/30 text-sm leading-relaxed font-light">
            <p>
              Soul FM is more than just a radio station — it's a community of music lovers in San Bernardino.
              We cherish the city's vibrant culture and strive to reflect its energy in every broadcast.
            </p>
            <p>
              Our commitment to quality sound and engaging content ensures that every listener feels connected
              to the music they love. With a nod to the past and an eye on the future, we blend nostalgia
              with innovation to create an unforgettable listening experience.
            </p>
            <div className="pt-4">
              <a
                href="tel:9098930169"
                className="text-[11px] tracking-[0.12em] uppercase text-white/20 hover:text-white/50 transition-colors duration-200 border-b border-white/[0.08] pb-1"
              >
                Call us — (909) 893-0169
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}