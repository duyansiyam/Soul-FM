import { Link } from 'react-router-dom'

export default function AboutUs() {
  return (
    <main
      style={{ fontFamily: 'var(--font-body)' }}
      className="bg-[var(--color-soul-black)] text-[var(--color-soul-white)] overflow-x-hidden"
    >

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24">
        <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-6">
          About Soul FM
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
          className="text-white/85 mb-6 max-w-4xl"
        >
          The Sound that<br />
          <em>Connects Souls</em>
        </h1>

        <p className="text-white/40 text-sm max-w-xl leading-relaxed font-light">
          Soul FM is a modern radio experience rooted in timeless sound.
          Broadcasting from San Bernardino, we bring together classic R&B,
          smooth rhythms, and a community that lives through music.
        </p>
      </section>

      {/* ── STORY ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 border-t border-white/[0.04] grid lg:grid-cols-2 gap-16">
        <div>
          <p className="text-[9px] tracking-[0.22em] uppercase text-white/20 mb-6">
            Our Story
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 400,
            }}
            className="text-white/80"
          >
            Built on Passion<br />
            <em>Driven by Sound</em>
          </h2>
        </div>

        <div className="space-y-5 text-white/35 text-sm leading-relaxed font-light">
          <p>
            Founded in 2024, Soul FM started with a simple goal — to bring back
            the feeling of real music.
          </p>
          <p>
            We are more than a station. We are a platform where listeners connect,
            request songs, and become part of the rhythm.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 border-t border-white/[0.04]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { label: '24/7', sub: 'Streaming' },
            { label: '100+', sub: 'Tracks Daily' },
            { label: 'Global', sub: 'Listeners' },
            { label: 'Live', sub: 'Requests' },
          ].map((item) => (
            <div key={item.label}>
              <h3 className="text-3xl font-semibold text-[var(--color-soul-accent)]">
                {item.label}
              </h3>
              <p className="text-white/30 text-xs mt-2 uppercase">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── REVIVE SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 border-t border-white/[0.04]">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <div className="max-w-2xl">
            <p className="text-[9px] tracking-[0.22em] uppercase text-white/20 mb-6">
              Rediscover the Sound
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                fontWeight: 400,
                lineHeight: 0.98,
              }}
              className="text-white/85 mb-6"
            >
              Revive Your Love<br />
              for <em className="text-white/70">R&amp;B Today</em>
            </h2>

            <p className="uppercase text-white/35 mb-8 italic">
              Rediscover R&amp;B Music in San Bernardino
            </p>

            <div className="space-y-5 text-white/35 text-sm leading-relaxed font-light">
              <p>
                Soul FM is dedicated to bringing R&amp;B music back to the forefront
                of your listening experience. Feel the rhythm and reconnect with
                timeless sound.
              </p>
              <p>
                Whether you're driving or relaxing at home, Soul FM delivers the
                best in R&amp;B — from classic hits to modern releases.
              </p>
            </div>

            <div className="mt-10 flex gap-6">
              <Link
                to="/now-playing"
                className="px-7 py-3 rounded-full text-[11px] uppercase bg-[var(--color-soul-accent)] text-black"
              >
                Tune In Today
              </Link>
            </div>
          </div>

          {/* Placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[460px]">
              <div className="aspect-[4/5] rounded-2xl border border-white/[0.06] bg-[var(--color-soul-card)] flex items-center justify-center text-white/20 text-xs uppercase">
                Image Placeholder
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── KEY BENEFITS ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 border-t border-white/[0.04]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Placeholder */}
          <div className="flex justify-center">
            <div className="w-full max-w-[420px]">
              <div className="aspect-[4/5] rounded-2xl border border-white/[0.06] bg-[var(--color-soul-card)] flex items-center justify-center text-white/20 text-xs uppercase">
                Image Placeholder
              </div>
            </div>
          </div>

          <div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.3rem, 5vw, 4.8rem)',
              }}
              className="text-white/85 mb-8"
            >
              Key Benefits of This<br />
              <em className="text-white/70">Service</em>
            </h2>

            <div className="space-y-5 text-white/35 text-sm leading-relaxed font-light">
              <p>
                When you choose Soul FM, you’re not just tuning into a radio station;
                you’re becoming part of a community.
              </p>

              <ul className="space-y-2">
                <li>• 24/7 access to the best R&amp;B tracks</li>
                <li>• Exclusive interviews with artists</li>
                <li>• Live broadcasts from events</li>
                <li>• High-quality seamless streaming</li>
                <li>• Interactive listener requests</li>
              </ul>

              <p>Explore our station and let the music move you.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 border-t border-white/[0.04]">
        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-[var(--color-soul-card)] border border-white/[0.04] rounded-xl p-8">
            <p className="text-[9px] uppercase text-white/20 mb-4">Our Vision</p>
            <h3 className="text-white/80 mb-4 font-[var(--font-heading)] text-xl">
              A Global Voice for Soul
            </h3>
            <p className="text-white/40 text-sm">
              To become a global hub for soulful music and authentic sound.
            </p>
          </div>

          <div className="bg-[var(--color-soul-card)] border border-white/[0.04] rounded-xl p-8">
            <p className="text-[9px] uppercase text-white/20 mb-4">Our Mission</p>
            <h3 className="text-white/80 mb-4 font-[var(--font-heading)] text-xl">
              Curated Sound, Real Connection
            </h3>
            <p className="text-white/40 text-sm">
              We create a listening experience that feels personal and meaningful.
            </p>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-28 text-center border-t border-white/[0.04]">
        <h2 className="text-white/80 text-5xl mb-10 font-[var(--font-heading)]">
          Tune In.<br /><em>Feel the Music</em>
        </h2>

        <Link
          to="/now-playing"
          className="px-8 py-4 bg-[var(--color-soul-accent)] text-black rounded-full"
        >
          Listen Now
        </Link>
      </section>

    </main>
  )
}