import { useState } from "react"

const genres = ['R&B', 'Hip Hop', 'Jazz', 'Funk', 'Reggae']

export default function AboutStrip() {
  const [active, setActive] = useState('Jazz')

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0c0a14] via-red-900/10 to-[#0c0a14] py-16 px-6 lg:px-10">

      {/* top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-500/35 to-transparent" />

      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 bottom-0 h-64 w-96 rounded-full bg-red-800/10 blur-3xl" />
        <div className="absolute left-1/4 top-0 h-48 w-64 rounded-full bg-orange-700/6 blur-3xl" />
      </div>

      {/* vinyl decoration */}
      <svg
        className="pointer-events-none absolute -bottom-7.5 -right-5 w-36 opacity-[0.045] animate-[float_6s_ease-in-out_infinite]"
        viewBox="0 0 100 100"
        fill="none"
      >
        {[49, 42, 36, 30, 24, 18].map(r => (
          <circle key={r} cx="50" cy="50" r={r} stroke="white" strokeWidth={r === 49 ? 0.8 : 0.4} />
        ))}
        <circle cx="50" cy="50" r="12" fill="white" opacity="0.4" />
        <circle cx="50" cy="50" r="3" fill="white" opacity="0.7" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        {/* left col */}
        <div className="animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]">
          <p className="flex items-center gap-3 text-[9px] tracking-[0.26em] uppercase text-white/20 mb-5">
            <span className="inline-block w-4 h-px bg-red-400/50" />
            Immerse yourself
          </p>

          <h2
            className="text-white/88 font-serif font-normal tracking-tight leading-[1.08]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
          >
            Classic Sounds<br />
            <em className="bg-linear-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent bg-size-[200%_auto] animate-[shimmer_4s_linear_1s_infinite] not-italic">
              for the soul
            </em>
          </h2>

          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 text-[10px] tracking-widest text-white/25 animate-[fadeUp_0.6s_ease_0.8s_both]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
            Est. 2024 · San Bernardino
          </div>
        </div>

        {/* right col */}
        <div className="pt-1 space-y-4">
          <p className="text-white/32 text-sm leading-[1.8] font-light animate-[fadeUp_0.65s_ease_0.5s_both]">
            Step into a world where the rich tones of R&amp;B, Hip Hop, Jazz, Funk, and Reggae fill the airwaves.
            At Soul FM, you're invited to relive the golden era of music with a modern twist.
          </p>
          <p className="text-white/32 text-sm leading-[1.8] font-light animate-[fadeUp_0.65s_ease_0.65s_both]">
            Our station is more than just music — it's an experience. We take song requests from our listeners,
            ensuring your voice is always part of our playlist.
          </p>

          <div className="w-6 h-px bg-white/7 my-5" />

          <div className="flex flex-wrap gap-2">
            {genres.map((g, i) => (
              <button
                key={g}
                onClick={() => setActive(g)}
                style={{ animationDelay: `${0.85 + i * 0.08}s` }}
                className={`
                  px-3 py-1.5 rounded-full text-[9.5px] tracking-[0.14em] uppercase border transition-all duration-250
                  animate-[tagIn_0.5s_cubic-bezier(0.16,1,0.3,1)_both]
                  hover:-translate-y-0.5
                  ${active === g
                    ? 'border-orange-500/35 text-orange-400/80 bg-orange-500/4'
                    : 'border-white/8 text-white/25 hover:border-red-500/40 hover:text-red-400/85'
                  }
                `}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes tagIn {
          from { opacity: 0; transform: scale(0.88) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  )
}