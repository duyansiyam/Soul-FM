import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const vinylImgUrl =
  'https://v3b.fal.media/files/b/0a9629c9/fkfb8IWDppZuAivc5zPIw_cebad2617c1347bda9491a23c3e3cddb.webp'

const weekdayShows = [
  {
    time: '5:00 AM – 6:30 AM',
    title: 'Waxx in the Morning',
    host: 'Morning Show',
    description:
      'Start your day with classic R&B energy, feel-good tracks, and smooth morning vibes.',
  },
  {
    time: '12:00 PM – 3:00 PM',
    title: 'Bringing Back the Heartbeat of Soul',
    host: 'Midday Show',
    description:
      'A nostalgic mix of timeless soul and R&B favorites to keep your afternoon moving.',
  },
  {
    time: '3:00 PM – 6:00 PM',
    title: 'Adventures with Auntie Soul',
    host: 'Afternoon Show',
    description:
      'A lively blend of music, personality, and community-centered entertainment.',
  },
  {
    time: '6:00 PM – 9:00 PM',
    title: 'Principal P the MC',
    host: 'Evening Show',
    description:
      'Wind down with engaging commentary, rich grooves, and crowd-favorite classics.',
  },
]

const sundayShows = [
  {
    time: '6:00 AM – 12:00 PM',
    title: 'Soulful Sundays',
    host: 'Sunday Gospel Special',
    description:
      'A soulful and uplifting gospel program made for peaceful Sunday mornings.',
  },
  {
    time: '12:00 PM PST',
    title: 'Live on Waxx',
    host: 'Featured Segment',
    description:
      'A live on-air segment bringing strong personality, music, and listener connection.',
  },
  {
    time: '3:00 PM PST',
    title: 'Auntie Sol',
    host: 'Featured Segment',
    description:
      'A signature show with a warm tone, familiar classics, and community energy.',
  },
  {
    time: '6:00 PM PST',
    title: 'Principal P',
    host: 'Featured Segment',
    description:
      'A bold evening set designed for listeners who love rhythm, voice, and presence.',
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}

function SectionLabel({ children }) {
  return (
    <p className="mb-4 text-[10px] font-light uppercase tracking-[0.24em] text-white/20">
      {children}
    </p>
  )
}

function SectionHeading({ children, className = '' }) {
  return (
    <h2
      style={{ fontFamily: 'var(--font-heading)' }}
      className={`text-[clamp(2.2rem,5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.035em] text-white/88 ${className}`}
    >
      {children}
    </h2>
  )
}

function RedDivider() {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="h-px w-7 bg-[#c0392b]" />
      <div className="h-1 w-1 rounded-full bg-[#c0392b]/70" />
    </div>
  )
}

function ScheduleCard({ time, title, host, description, delay = 0 }) {
  const [ref, visible] = useInView(0.12)

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px) scale(1)' : 'translateY(26px) scale(0.98)',
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
      className="group relative min-h-55 overflow-hidden rounded-[14px] border border-white/6 bg-white/2 p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-[#c0392b]/30 hover:bg-white/4"
    >
      <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-60" />
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#c0392b]/6 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-70" />

      <div className="relative z-10">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
          {time}
        </p>

        <h3
          style={{ fontFamily: 'var(--font-heading)' }}
          className="mb-2 text-[1.35rem] font-normal leading-tight tracking-[-0.02em] text-white"
        >
          {title}
        </h3>

        <p className="mb-3 text-[10px] font-light uppercase tracking-[0.16em] text-white/70">
          {host}
        </p>

        <p className="text-[12px] font-light leading-relaxed text-white/85">
          {description}
        </p>
      </div>
    </div>
  )
}

function FeaturePill({ label, delay, visible }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `all 0.45s ease ${delay}ms`,
      }}
      className="rounded-[14px] border border-white/6 bg-white/2 px-4 py-3 text-[12px] font-light leading-[1.55] text-white/40 transition-all duration-300 hover:border-[#c0392b]/30 hover:bg-[#c0392b]/5 hover:text-white/70"
    >
      <span className="mr-2 inline-block h-1 w-1 rounded-full bg-[#c0392b] opacity-70 align-middle" />
      {label}
    </div>
  )
}

export default function ShowSchedule() {
  const [heroReady, setHeroReady] = useState(false)
  const [weekRef, weekVisible] = useInView(0.1)
  const [featureRef, featureVisible] = useInView(0.1)
  const [sundayRef, sundayVisible] = useInView(0.1)
  const [ctaRef, ctaVisible] = useInView(0.15)

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80)
    return () => clearTimeout(t)
  }, [])

  const reveal = (visible, delay = 0, y = 28) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0px)' : `translateY(${y}px)`,
    transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  })

  return (
    <main
      style={{ fontFamily: 'var(--font-body)' }}
      className="overflow-x-hidden bg-(--color-soul-black) text-(--color-soul-white)"
    >
      <style>{`
        @keyframes soulFloatOne {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(18px,-24px,0) scale(1.04); }
        }

        @keyframes soulFloatTwo {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(-22px,18px,0) scale(1.08); }
        }

        @keyframes soulLineMove {
          0% { transform: translateX(-8%); opacity: 0.18; }
          50% { transform: translateX(8%); opacity: 0.32; }
          100% { transform: translateX(-8%); opacity: 0.18; }
        }

        @keyframes soulPulse {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.06); }
        }

        @keyframes soulGridDrift {
          0% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      <section className="relative overflow-hidden border-b border-white/4 bg-linear-to-br from-[#3a120d] via-[#1b0d0b] to-black">
        {/* animated background designs */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-24 -top-20 h-80 w-[320px] rounded-full bg-[#a33222]/20 blur-3xl"
            style={{ animation: 'soulFloatOne 10s ease-in-out infinite' }}
          />
          <div
            className="absolute -right-15 top-[20%] h-65 w-65 rounded-full bg-[#7a2319]/20 blur-3xl"
            style={{ animation: 'soulFloatTwo 12s ease-in-out infinite' }}
          />
          <div
            className="absolute -bottom-20 left-[28%] h-60 w-60 rounded-full bg-[#c0392b]/10 blur-3xl"
            style={{ animation: 'soulPulse 8s ease-in-out infinite' }}
          />

          <div
            className="absolute inset-x-[-10%] top-[18%] h-px bg-linear-to-r from-transparent via-[#c56a5a]/40 to-transparent"
            style={{ animation: 'soulLineMove 8s ease-in-out infinite' }}
          />
          <div
            className="absolute inset-x-[-5%] top-[58%] h-px bg-linear-to-r from-transparent via-[#8b3022]/30 to-transparent"
            style={{ animation: 'soulLineMove 10s ease-in-out infinite reverse' }}
          />

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              animation: 'soulGridDrift 12s ease-in-out infinite',
            }}
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(192,57,43,0.22),transparent_38%),radial-gradient(circle_at_78%_22%,rgba(140,40,28,0.18),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_40%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-10 lg:pb-24 lg:pt-36">
          <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              
              <h1
                style={{ fontFamily: 'var(--font-heading)', ...reveal(heroReady, 100, 22) }}
                className="mb-6 text-[clamp(3.2rem,7vw,6.2rem)] font-normal leading-none tracking-[-0.04em] text-white/90"
              >
                Catch Your
                <br />
                Favorite Shows
                <br />
                <em className="not-italic text-[#c0392b]">Every Day</em>
              </h1>

              <p
                style={{ fontFamily: 'var(--font-heading)', ...reveal(heroReady, 180, 22) }}
                className="mb-7 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] font-light italic leading-[1.65] text-white/45"
              >
                Explore our show schedule and discover the rhythm behind every
                broadcast.
              </p>

              <div
                style={reveal(heroReady, 260, 24)}
                className="max-w-2xl space-y-3 text-[13px] font-light leading-[1.85] text-white/35"
              >
                <p>
                  Soul FM&apos;s schedule is built for listeners who love timeless
                  R&B, soulful storytelling, and community-driven radio.
                </p>
                <p>
                  Whether you tune in during the workday or settle in at night, our
                  programming offers a smooth mix of music, live voices, and
                  memorable on-air moments.
                </p>
              </div>

              <div style={reveal(heroReady, 340, 22)} className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/now-playing"
                  className="inline-flex items-center gap-3 rounded-full bg-[#a33222] px-7 py-3.5 text-[11px] font-normal uppercase tracking-[0.14em] text-white transition-all duration-200 hover:shadow-[0_0_28px_rgba(163,50,34,0.45)]"
                >
                  Listen Now
                </Link>

                <a
                  href="#weekly-schedule"
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/3 px-7 py-3.5 text-[11px] font-light uppercase tracking-[0.14em] text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-[#c0392b]/40 hover:text-white/80"
                >
                  View Schedule
                </a>
              </div>
            </div>

            <div style={reveal(heroReady, 220, 30)} className="hidden lg:block">
              <div className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(135deg,rgba(43,18,13,0.9),rgba(16,16,16,0.92),rgba(10,10,10,0.95))] p-8 backdrop-blur-md">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(192,57,43,0.18),transparent_35%)]" />
                <div className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-[#c0392b]/70 to-transparent" />

                <div className="relative z-10 flex h-80 flex-col justify-between">
                  <div>
                    <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/20">
                      Today&apos;s flow
                    </p>
                    <h3
                      style={{ fontFamily: 'var(--font-heading)' }}
                      className="text-[2.2rem] leading-[1.05] tracking-[-0.03em] text-white/88"
                    >
                      Smooth radio
                      <br />
                      all day long
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      'Morning classics',
                      'Midday soul sessions',
                      'Afternoon favorites',
                      'Evening radio energy',
                    ].map((item, index) => (
                      <div
                        key={item}
                        style={reveal(heroReady, 260 + index * 60, 14)}
                        className="flex items-center justify-between border-b border-white/6 pb-3 text-sm text-white/42"
                      >
                        <span>{item}</span>
                        <span className="text-[#c56a5a]">•</span>
                      </div>
                    ))}
                  </div>

                  <div style={reveal(heroReady, 420, 16)} className="flex items-center gap-3 pt-3">
                    <span className="h-2 w-2 rounded-full bg-[#b34533] shadow-[0_0_10px_rgba(179,69,51,0.75)]" />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                      Live schedule
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="weekly-schedule"
        ref={weekRef}
        className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <div className="absolute left-[8%] top-10 h-28 w-28 rounded-full bg-[#8f2d1f] blur-3xl" />
          <div className="absolute right-[12%] bottom-0 h-24 w-24 rounded-full bg-[#c0392b] blur-3xl" />
        </div>

        <div className="relative z-10 mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <div style={reveal(weekVisible, 0, 24)}>
            <SectionLabel>Monday to Friday</SectionLabel>
            <RedDivider />
            <SectionHeading>
              Weekday
              <br />
              Soulful Lineup
            </SectionHeading>
          </div>

          <p
            style={reveal(weekVisible, 140, 24)}
            className="max-w-md text-[13px] font-light leading-[1.85] text-white/30"
          >
            A full lineup of smooth classics, live personalities, and engaging
            on-air experiences throughout the day.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {weekdayShows.map((show, i) => (
            <ScheduleCard key={`${show.title}-${show.time}`} {...show} delay={i * 90} />
          ))}
        </div>
      </section>

      <section
        ref={featureRef}
        className="relative overflow-hidden border-y border-white/4 bg-[#0c0c0c]"
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-10 top-[20%] h-44 w-44 rounded-full bg-[#7d2518]/15 blur-3xl"
            style={{ animation: 'soulFloatOne 14s ease-in-out infinite' }}
          />
          <div
            className="absolute -right-7.5 bottom-[10%] h-36 w-36 rounded-full bg-[#b13b29]/10 blur-3xl"
            style={{ animation: 'soulFloatTwo 16s ease-in-out infinite' }}
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
          <div
            style={{
              opacity: featureVisible ? 1 : 0,
              transform: featureVisible ? 'translateY(0px) scale(1)' : 'translateY(24px) scale(0.96)',
              transition:
                'opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="group overflow-hidden rounded-3xl border border-white/6 bg-[#0f0f0f] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <img
              src={vinylImgUrl}
              alt="Soul FM vinyl music feature"
              className="block h-full w-full rounded-[18px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>

          <div style={reveal(featureVisible, 140, 26)}>
            <SectionLabel>Why listeners stay tuned</SectionLabel>
            <RedDivider />
            <SectionHeading className="mb-6">
              Why Locals Choose
              <br />
              This Station
            </SectionHeading>

            <p className="mb-8 text-[13px] font-light leading-[1.85] text-white/40">
              Soul FM&apos;s show schedule is crafted to offer the best in R&B
              entertainment, with programs that reflect the sound, energy, and
              spirit of the San Bernardino community.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Diverse programming for R&B lovers',
                'Convenient showtimes throughout the day',
                'Engaging hosts with strong personalities',
                'Live broadcasts with community connection',
                'Exclusive featured segments',
                'Smooth listening from day to night',
              ].map((item, i) => (
                <FeaturePill
                  key={item}
                  label={item}
                  delay={i * 60}
                  visible={featureVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={sundayRef}
        className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <div className="absolute right-[6%] top-8 h-28 w-28 rounded-full bg-[#8f2d1f] blur-3xl" />
          <div className="absolute left-[10%] bottom-4 h-20 w-20 rounded-full bg-[#c0392b] blur-3xl" />
        </div>

        <div className="relative z-10 mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <div style={reveal(sundayVisible, 0, 24)}>
            <SectionLabel>Sunday highlights</SectionLabel>
            <RedDivider />
            <SectionHeading>
              Soulful
              <br />
              Sunday Lineup
            </SectionHeading>
          </div>

          <p
            style={reveal(sundayVisible, 140, 24)}
            className="max-w-md text-[13px] font-light leading-[1.85] text-white/30"
          >
            A weekend selection designed for uplifting listening, featured voices,
            and smooth transitions from morning to evening.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {sundayShows.map((show, i) => (
            <ScheduleCard key={`${show.title}-${show.time}`} {...show} delay={i * 90} />
          ))}
        </div>
      </section>

      <section
        ref={ctaRef}
        className="relative overflow-hidden border-t border-white/4 bg-[#0c0c0c]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,57,43,0.08),transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center lg:px-10 lg:py-28">
          <div style={reveal(ctaVisible, 0, 20)}>
            <SectionLabel>Stay connected</SectionLabel>
          </div>

          <h2
            style={{ fontFamily: 'var(--font-heading)', ...reveal(ctaVisible, 100, 24) }}
            className="mb-5 text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.04em] text-white/85"
          >
            Lock in your favorite shows
            <br />
            and never miss a <em className="not-italic text-[#c0392b]">beat</em>
          </h2>

          <p
            style={reveal(ctaVisible, 180, 22)}
            className="mx-auto mb-10 max-w-xl text-[13px] font-light leading-[1.85] text-white/30"
          >
            Listen live, follow the lineup, and enjoy the classic Soul FM sound
            wherever you are.
          </p>

          <div style={reveal(ctaVisible, 260, 20)}>
            <Link
              to="/now-playing"
              className="inline-flex items-center gap-3 rounded-full border border-[#c0392b]/30 px-8 py-4 text-[11px] font-light uppercase tracking-[0.17em] text-white/50 transition-all duration-300 hover:border-[#c0392b]/70 hover:text-white/85 hover:shadow-[0_0_32px_rgba(192,57,43,0.15)]"
            >
              <span className="h-1 w-1 rounded-full bg-[#c0392b]" />
              Go to Now Playing
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}