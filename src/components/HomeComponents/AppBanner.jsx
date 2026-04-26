import { useEffect, useRef, useState } from 'react'

export default function AppBanner() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.25 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const shimmerEffect = (el) => {
    if (!el) return
    const btn = el.parentElement
    const over = () => (el.style.transform = 'scaleX(1)')
    const out = () => (el.style.transform = 'scaleX(0)')
    btn.addEventListener('mouseenter', over)
    btn.addEventListener('mouseleave', out)
  }

  const buttonStyle = {
  border: '1px solid var(--color-soul-accent)',
  padding: '1rem 1.6rem',
  color: 'var(--color-soul-white)',
  textDecoration: 'none',
  letterSpacing: '0.08em',
  fontSize: '0.75rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  background: 'transparent',
  transition: 'all 0.3s ease',

  minWidth: '260px',

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',   
  gap: '10px',               
}

  return (
    <section
      ref={ref}
      style={{ fontFamily: 'var(--font-body)' }}
      className="relative overflow-hidden bg-(--color-soul-dark) border-t border-b border-(--color-soul-border)"
    >

      {/* Glow */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(192,57,43,0.18), transparent 70%)' }} />

      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(192,57,43,0.10), transparent 70%)' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-8 py-20 md:py-28 flex flex-col md:flex-row items-center justify-between gap-16">

        {/* LEFT TEXT */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease'
          }}
          className="flex flex-col gap-6 max-w-xl"
        >
          <span
            style={{
              letterSpacing: '0.22em',
              fontSize: '0.65rem',
              color: 'var(--color-soul-accent)'
            }}
            className="uppercase"
          >
            Now available — iOS & Android
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              color: 'var(--color-soul-white)',
              fontWeight: 300
            }}
          >
            Carry the soul <br />
            <em style={{ color: 'var(--color-soul-accent)' }}>
              everywhere.
            </em>
          </h2>

          <p style={{ color: 'rgba(240,240,240,0.45)', maxWidth: '38ch' }}>
            Stream curated music, live shows, and exclusive Soul FM content —
            anytime, anywhere.
          </p>
        </div>

        {/* RIGHT BUTTONS */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.2s'
          }}
          className="flex flex-col gap-4 w-full md:w-auto items-center md:items-end"
        >

          {/* APP STORE */}
          <a
            href="https://apps.apple.com/us/app/soul-fm/id6737055669"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden"
            style={buttonStyle}
          >
            <span
              ref={shimmerEffect}
              className="absolute inset-0"
              style={{
                background: 'var(--color-soul-accent)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: '0.45s'
              }}
            />

            {/* Apple Icon */}
            <span className="relative z-10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83"/>
              </svg>
            </span>

            <span className="relative z-10">Download on App Store</span>
          </a>

          {/* GOOGLE PLAY */}
          <a
            href="https://play.google.com/store/apps/details?id=com.m2e38d956d1ee2.app"
            className="group relative inline-flex items-center gap-3 overflow-hidden"
            style={buttonStyle}
          >
            <span
              ref={shimmerEffect}
              className="absolute inset-0"
              style={{
                background: 'var(--color-soul-accent)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: '0.45s'
              }}
            />

            {/* Play Icon */}
            <span className="relative z-10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 2l18 10L3 22V2z"/>
              </svg>
            </span>

            <span className="relative z-10">Get it on Google Play</span>
          </a>

          <p
            style={{
              color: 'rgba(240,240,240,0.25)',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            iOS · Android · Free
          </p>
        </div>
      </div>
    </section>
  )
}