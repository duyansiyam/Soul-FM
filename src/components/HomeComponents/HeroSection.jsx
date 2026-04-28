import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import heroVideo from '../../assets/hero-video2.mp4'

export default function HeroSection() {
  const videoRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-(--color-soul-black)/60" />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.3) 50%, transparent 100%)'
      }} />

      <div className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-40 transition-[opacity,transform] duration-1000 ease-out will-change-transform
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
          className="text-(--color-soul-white) mb-2 max-w-4xl"
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
              bg-(--color-soul-accent) text-(--color-soul-black)
              hover:brightness-110 transition-[filter,transform] duration-200 active:scale-95"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-(--color-soul-black)/50 group-hover:animate-ping" />
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
  )
}
