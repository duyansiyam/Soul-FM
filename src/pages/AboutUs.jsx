import { useEffect, useRef, useState } from "react"; // useRef kept for useReveal's IntersectionObserver
import heroVideo from "../assets/hero-video2.mp4";
import rnbPhoto from "../assets/rnb.jpg";
import rnbPhoto2 from "../assets/rhythm.jpg";

// Nav height constant — matches Navbar h-16 (64px)
const NAV_H = 64;

// ─── Scroll-reveal hook ───────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Reveal wrapper ───────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── EQ Bars ──────────────────────────────────────
function EQBars() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 28 }}>
      {[0, 180, 360, 120, 280, 60, 220].map((delay, i) => (
        <div
          key={i}
          style={{
            width: 2,
            background: "var(--color-soul-accent)",
            borderRadius: 2,
            animation: `soulfm-eq 1.4s ${delay}ms infinite ease-in-out`,
          }}
        />
      ))}
      <style>{`
        @keyframes soulfm-eq {
          0%,100% { height: 4px; }
          25%      { height: 20px; }
          50%      { height: 10px; }
          75%      { height: 26px; }
        }
      `}</style>
    </div>
  );
}

// ─── Image / Video Placeholder ───────────────────
function MediaSlot({ label = "Add your photo here", aspect = "56.25%" }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingTop: aspect,
        background: "var(--color-soul-card)",
        border: "1px dashed var(--color-soul-border)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          color: "var(--color-soul-muted)",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>{label}</span>
      </div>
    </div>
  );
}

// ─── Thin rule ────────────────────────────────────
function Rule({ color = "var(--color-soul-border)" }) {
  return <div style={{ width: "100%", height: 1, background: color, margin: "0" }} />;
}

// ─── Section label ────────────────────────────────
function Eyebrow({ children }) {
  return (
    <div style={{
      fontFamily: "var(--font-body)",
      fontWeight: 300,
      fontSize: 10,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "var(--color-soul-accent)",
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: "1.25rem",
    }}>
      <span style={{ display: "block", width: 24, height: 1, background: "var(--color-soul-accent)" }} />
      {children}
    </div>
  );
}

// ─── Feature item ─────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "24 / 7 access",
    desc: "The best R&B tracks, around the clock, every single day of the year.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Artist interviews",
    desc: "Exclusive conversations with the R&B artists you love, unfiltered.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Live from San Bernardino",
    desc: "Real-time broadcasts direct from events in our home city.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
        <path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1z"/>
      </svg>
    ),
    title: "High-quality streaming",
    desc: "Crystal-clear sound with seamless, uninterrupted playback.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Listener requests",
    desc: "Your voice on air — interactive shout-outs and song requests.",
  },
];

// ─── Main component ───────────────────────────────
// Cursor is handled globally by index.css + #cursor / #cursor-ring in index.html (or layout).
// data-hover attributes on links/buttons trigger the CSS cursor-hover class automatically.
export default function AboutUs() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      {/* paddingTop offsets the fixed h-16 navbar (64px) so content isn't hidden beneath it */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: `${NAV_H}px 5vw 6rem`,
          overflow: "hidden",
        }}
      >
        {/* Hero video */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              display: "block",
            }}
          />
          {/* dark gradient so text stays readable over video */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, var(--color-soul-black) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.3) 100%)",
          }} />
        </div>

        {/* Hero text */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          <div style={{
            fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 10,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--color-soul-accent)",
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: "1.5rem",
            animation: "soulfm-fadein 0.8s 0.1s both ease",
          }}>
            <span style={{ width: 24, height: 1, background: "var(--color-soul-accent)", display: "block" }} />
            Est. 2024 · San Bernardino, CA
          </div>

          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "var(--color-soul-white)",
            margin: "0 0 1.5rem",
            animation: "soulfm-fadein 0.9s 0.25s both ease",
          }}>
            Revive Your Love<br />
            <em style={{ color: "var(--color-soul-accent)", fontStyle: "italic" }}>for R&B</em> Today
          </h1>

          <p style={{
            fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "clamp(14px, 1.6vw, 17px)",
            color: "rgba(240,240,240,0.5)", maxWidth: 520, lineHeight: 1.75, margin: "0 0 2rem",
            animation: "soulfm-fadein 0.9s 0.4s both ease",
          }}>
            San Bernardino's home for rhythm, soul, and the music that moves you — 24 hours a day.
          </p>

          <div style={{ animation: "soulfm-fadein 0.8s 0.55s both ease" }}>
            <EQBars />
          </div>
        </div>
      </section>

      <Rule />

      {/* ── Story ────────────────────────────────── */}
      <section style={{ padding: "8rem 5vw", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
        className="about-two-col">
        <Reveal>
          <Eyebrow>Our story</Eyebrow>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--color-soul-white)",
            margin: "0 0 2rem",
          }}>
            Rediscover R&B music<br />
            <em style={{ fontStyle: "italic", color: "var(--color-soul-accent)" }}>in San Bernardino.</em>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 15, color: "rgba(240,240,240,0.5)", lineHeight: 1.85, marginBottom: "1rem" }}>
            Soul FM, established in 2024, is dedicated to bringing R&B back to the forefront of your listening experience. Whether you're driving through the bustling streets of San Bernardino or relaxing at home, we are your go-to station for the best in R&B.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 15, color: "rgba(240,240,240,0.5)", lineHeight: 1.85, marginBottom: "2.5rem" }}>
            From classic hits to the latest releases, we ensure your musical journey is both nostalgic and refreshing. Join the growing community of R&B enthusiasts who have made Soul FM their preferred station.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "3rem", borderTop: "1px solid var(--color-soul-border)", paddingTop: "2rem" }}>
            {[["2024", "Founded"], ["24/7", "On air"], ["SBD", "Hometown"]].map(([num, lbl]) => (
              <div key={lbl}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontSize: "2rem", color: "var(--color-soul-accent)", lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-soul-muted)", marginTop: 6 }}>{lbl}</div>
              </div>
            ))}
          </div>

          <a href="tel:9098930169" style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginTop: "2.5rem",
            fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 13,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--color-soul-accent)", textDecoration: "none",
            borderBottom: "1px solid rgba(192,57,43,0.3)", paddingBottom: 4,
          }} data-hover>
            (909) 893-0169
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </Reveal>

        <Reveal delay={150}>
          <div style={{
            position: "relative", width: "100%", paddingTop: "120%",
            borderRadius: 2, overflow: "hidden",
          }}>
            <img
              src={rnbPhoto}
              alt="R&B culture in San Bernardino"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center",
                display: "block",
              }}
            />
          </div>
        </Reveal>
      </section>

      <Rule />

      {/* ── Mission banner ───────────────────────── */}
      <section style={{
        padding: "8rem 5vw",
        background: "var(--color-soul-dark)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative large italic text */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-heading)", fontStyle: "italic",
          fontWeight: 300, fontSize: "clamp(6rem, 18vw, 18rem)",
          color: "rgba(192,57,43,0.04)", whiteSpace: "nowrap",
          pointerEvents: "none", userSelect: "none", lineHeight: 1,
          letterSpacing: "-0.05em",
        }}>Soul</div>

        <Reveal>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(192,57,43,0.08)",
            border: "1px solid rgba(192,57,43,0.2)",
            borderRadius: 999, padding: "4px 16px",
            fontFamily: "var(--font-body)", fontWeight: 300,
            fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--color-soul-accent)", marginBottom: "2.5rem",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-soul-accent)", display: "block", animation: "soulfm-breathe 2s infinite" }} />
            Our mission
          </div>

          <p style={{
            fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
            lineHeight: 1.45, letterSpacing: "-0.01em",
            color: "var(--color-soul-white)", maxWidth: 780, margin: "0 auto 1.5rem",
          }}>
            "Our mission is to provide a platform where R&B music thrives — a diverse range of tracks that cater to every listener's taste."
          </p>

          <p style={{
            fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 14,
            color: "rgba(240,240,240,0.38)", letterSpacing: "0.04em",
          }}>
            Join the growing community of R&B enthusiasts in San Bernardino who have made Soul FM their preferred station.
          </p>
        </Reveal>
      </section>

      <Rule />

      {/* ── Features ─────────────────────────────── */}
      <section style={{ padding: "8rem 5vw" }}>
        <Reveal>
          <Eyebrow>Why Soul FM</Eyebrow>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 300,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            letterSpacing: "-0.02em", lineHeight: 1.1,
            color: "var(--color-soul-white)", margin: "0 0 4rem", maxWidth: 500,
          }}>
            Key benefits<br />
            <em style={{ fontStyle: "italic", color: "var(--color-soul-accent)" }}>of this service.</em>
          </h2>
        </Reveal>

        <div>
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div style={{
                display: "grid", gridTemplateColumns: "2rem 1fr auto",
                alignItems: "start", gap: "1.5rem 2rem",
                padding: "2rem 0", borderTop: "1px solid var(--color-soul-border)",
              }}>
                <div style={{ color: "var(--color-soul-accent)", paddingTop: 2 }}>{f.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "1.3rem",
                    letterSpacing: "-0.01em", color: "var(--color-soul-white)", marginBottom: 6,
                  }}>{f.title}</div>
                  <div style={{
                    fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 14,
                    color: "rgba(240,240,240,0.45)", lineHeight: 1.75,
                  }}>{f.desc}</div>
                </div>
                <div style={{
                  fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 12,
                  color: "var(--color-soul-muted)", letterSpacing: "0.05em",
                  paddingTop: 4,
                }}>0{i + 1}</div>
              </div>
            </Reveal>
          ))}
          <Rule />
        </div>
      </section>

      {/* ── Second image + copy ──────────────────── */}
      <section style={{ padding: "0 5vw 8rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
        className="about-two-col">
        <Reveal delay={100}>
          <div style={{
            position: "relative", width: "100%", paddingTop: "130%",
            borderRadius: 2, overflow: "hidden",
          }}>
            <img
              src={rnbPhoto2}
              alt="Soul FM — feel the rhythm"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center",
                display: "block",
              }}
            />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <Eyebrow>Feel the rhythm</Eyebrow>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 300,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1, letterSpacing: "-0.02em",
            color: "var(--color-soul-white)", margin: "0 0 1.5rem",
          }}>
            Let the music<br />
            <em style={{ fontStyle: "italic", color: "var(--color-soul-accent)" }}>move you.</em>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 15, color: "rgba(240,240,240,0.5)", lineHeight: 1.85, marginBottom: "1rem" }}>
            When you choose Soul FM, you're not just tuning into a radio station — you're becoming part of a community that celebrates the rich history and vibrant future of R&B music.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 15, color: "rgba(240,240,240,0.5)", lineHeight: 1.85, marginBottom: "2.5rem" }}>
            Tune in today and feel the rhythm and blues coursing through your veins, igniting a passion for the genre that's hard to resist.
          </p>
          <button style={{
            fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 12,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "var(--color-soul-white)", background: "transparent",
            border: "1px solid var(--color-soul-border)",
            padding: "14px 32px", borderRadius: 0,
            transition: "border-color 0.3s, color 0.3s",
          }} data-hover
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-soul-accent)"; e.currentTarget.style.color = "var(--color-soul-accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-soul-border)"; e.currentTarget.style.color = "var(--color-soul-white)"; }}
          >
            Explore our station
          </button>
        </Reveal>
      </section>

      <Rule />

      {/* ── CTA footer ───────────────────────────── */}
      <section style={{
        padding: "6rem 5vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "2rem",
      }}>
        <Reveal>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-soul-muted)", marginBottom: "0.75rem" }}>
            Ready to tune in?
          </div>
          <h3 style={{
            fontFamily: "var(--font-heading)", fontWeight: 300,
            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            letterSpacing: "-0.02em", lineHeight: 1.1,
            color: "var(--color-soul-white)", margin: 0,
          }}>
            Contact us today<br />
            <em style={{ fontStyle: "italic", color: "var(--color-soul-accent)" }}>and get involved.</em>
          </h3>
        </Reveal>

        <Reveal delay={150}>
          <a href="tel:9098930169" style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            fontFamily: "var(--font-body)", fontWeight: 300,
            fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase",
            color: "var(--color-soul-black)", background: "var(--color-soul-accent)",
            padding: "16px 36px", textDecoration: "none",
            borderRadius: 0, transition: "opacity 0.2s",
          }} data-hover
            onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            (909) 893-0169
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </Reveal>
      </section>

      {/* ── Responsive grid fix ──────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .about-two-col {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </>
  );
}