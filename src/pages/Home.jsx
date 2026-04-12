import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroVideo from '../assets/hero-video.mp4'

const cards = [
  { to: '/about', label: 'About', sub: 'Our Story' },
  { to: '/now-playing', label: 'Now Playing', sub: 'Live Stream' },
  { to: '/show-schedule', label: 'Schedule', sub: 'Show Times' },
]

const genres = ['R&B', 'Hip Hop', 'Jazz', 'Funk', 'Reggae']

export default function Home() {
  const videoRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <main style={{ fontFamily: 'var(--font-body)' }} className="bg-[var(--color-soul-black)] text-[var(--color-soul-white)] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">

        {/* Video */}
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-[var(--color-soul-black)]/60" />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.3) 50%, transparent 100%)'
        }} />

        {/* Content */}
        <div className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-40 transition-all duration-1000 ease-out
          ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          {/* Eyebrow */}
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-6"
            style={{ animationDelay: '0.1s' }}>
            San Bernardino · Est. 2024
          </p>

          {/* Headline */}
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
            R&amp;B Hits
          </h1>

          {/* Sub */}
          <p className="text-white/40 text-sm tracking-wide mt-6 mb-10 max-w-md font-light">
            Tune into old school R&B in San Bernardino &amp; listen worldwide
          </p>

          {/* CTAs */}
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

          {/* Scroll cue */}
          <div className="mt-16 flex items-center gap-3">
            <div className="w-px h-8 bg-white/10" style={{ animation: 'soulfm-breathe 2.5s ease-in-out infinite' }} />
            <span className="text-[9px] tracking-[0.2em] uppercase text-white/15">Scroll</span>
          </div>
        </div>
      </section>

      {/* ── CARDS ROW ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]">
          {cards.map(({ to, label, sub }) => (
            <Link
              key={to}
              to={to}
              className="group relative bg-[var(--color-soul-black)] px-8 py-10 hover:bg-[var(--color-soul-card)] transition-colors duration-300"
            >
              <span className="block text-[9px] tracking-[0.2em] uppercase text-white/20 mb-3">{sub}</span>
              <span
                style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.02em' }}
                className="block text-white/70 group-hover:text-white transition-colors duration-300"
              >
                {label}
              </span>
              <span className="absolute bottom-8 right-8 text-white/15 group-hover:text-[var(--color-soul-accent)] transition-colors duration-300 text-lg">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-16 items-start border-t border-white/[0.04]">
        <div>
          <p className="text-[9px] tracking-[0.22em] uppercase text-white/20 mb-6">Immerse Yourself</p>
          <h2
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em' }}
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

      {/* ── DJ FEATURE ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 border-t border-white/[0.04]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-[9px] tracking-[0.22em] uppercase text-white/20 mb-4">The Team</p>
            <h2
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, letterSpacing: '-0.02em' }}
              className="text-white/80"
            >
              Meet the DJs
            </h2>
          </div>
          <Link
            to="/about"
            className="text-[11px] tracking-[0.14em] uppercase text-white/20 hover:text-white/55 transition-colors duration-200 pb-1 border-b border-white/10 hover:border-white/25 self-start md:self-auto"
          >
            Learn More →
          </Link>
        </div>

        {/* Placeholder DJ cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['DJ One', 'DJ Two', 'DJ Three', 'DJ Four'].map((dj, i) => (
            <div key={dj} className="group aspect-[3/4] bg-[var(--color-soul-card)] rounded-xl overflow-hidden relative border border-white/[0.04] hover:border-white/[0.08] transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-[10px] tracking-[0.12em] uppercase text-white/30 mb-1">Slot {i + 1}</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 400 }} className="text-white/60 group-hover:text-white transition-colors duration-300">{dj}</p>
              </div>
            </div>
          ))}
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
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 8vw, 7rem)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.03em' }}
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
              style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em' }}
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