const genres = ['R&B', 'Hip Hop', 'Jazz', 'Funk', 'Reggae']

export default function AboutStrip() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-16 items-start border-t border-white/4">
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
            <span key={g} className="px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase border border-white/8 text-white/30 rounded-full">
              {g}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
