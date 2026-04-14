import { useEffect, useRef, useState } from 'react'

/**
 * AppBanner — Soul FM App Store promo strip
 * Drop this between any two sections in Home.jsx
 * Uses the existing CSS variable palette from globals.css
 */
export default function AppBanner() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.25 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{ fontFamily: 'var(--font-body)' }}
      className="relative overflow-hidden bg-(--color-soul-dark) border-t border-b border-(--color-soul-border)"
    >
      {/* Ambient red glow — left edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(192,57,43,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Ambient glow — right edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(192,57,43,0.10) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8 py-20 md:py-28 flex flex-col md:flex-row items-center md:items-end justify-between gap-12">

        {/* ── Left: copy ─────────────────────────────── */}
        <div
          className="flex flex-col gap-5 max-w-xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* Eyebrow */}
          <span
            style={{
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.22em',
              fontSize: '0.65rem',
              color: 'var(--color-soul-accent)',
            }}
            className="uppercase font-medium"
          >
            Now available — App Store
          </span>

          {/* Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--color-soul-white)',
              fontWeight: 300,
            }}
          >
            Carry the soul
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-soul-accent)' }}>
              everywhere.
            </em>
          </h2>

          {/* Body */}
          <p
            style={{
              color: 'rgba(240,240,240,0.45)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              maxWidth: '38ch',
            }}
          >
            Stream curated music, live shows, and exclusive Soul FM content —
            anytime, anywhere. Your sound, in your pocket.
          </p>
        </div>

        {/* ── Right: CTA + badge ──────────────────────── */}
        <div
          className="flex flex-col items-center md:items-end gap-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.18s, transform 0.8s ease 0.18s',
          }}
        >
          {/* App Store button */}
          <a
            href="https://apps.apple.com/app/soul-fm"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden"
            style={{
              border: '1px solid var(--color-soul-accent)',
              padding: '0.9rem 2rem',
              color: 'var(--color-soul-white)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              background: 'transparent',
              transition: 'color 0.3s ease',
            }}
          >
            {/* Shimmer fill on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: 'var(--color-soul-accent)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.45s cubic-bezier(0.77,0,0.175,1)',
              }}
              ref={el => {
                if (!el) return
                const btn = el.parentElement
                const over = () => { el.style.transform = 'scaleX(1)' }
                const out  = () => { el.style.transform = 'scaleX(0)' }
                btn.addEventListener('mouseenter', over)
                btn.addEventListener('mouseleave', out)
              }}
            />

            {/* Apple icon */}
            <span className="relative z-10" style={{ fontSize: '1.1rem', lineHeight: 1 }}>
              {/* SVG Apple logo */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </span>

            <span className="relative z-10">Download on the App Store</span>
          </a>

          {/* Subtle availability note */}
          <p
            style={{
              color: 'rgba(240,240,240,0.22)',
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            iOS · Free to download
          </p>
        </div>
      </div>

      {/* Bottom rule with accent dot */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'var(--color-soul-border)' }}
      />
    </section>
  )
}
