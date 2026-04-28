import { useNavigate } from 'react-router-dom'

export default function FullwidthBanner() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden mt-16 py-32 border-t border-white/4">
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
        <button
  onClick={() => navigate('/now-playing')}
  className="relative z-10 inline-flex items-center gap-3 px-8 py-4 rounded-full text-[11px] tracking-[0.15em] uppercase
    border border-white/10 text-white/35 hover:border-white/25 hover:text-white/70
    transition-[border-color,color] duration-300 cursor-pointer bg-transparent"
>
  <span className="w-1 h-1 rounded-full bg-(--color-soul-accent)" />
  Listen Now
</button>
      </div>
    </section>
  )
}
