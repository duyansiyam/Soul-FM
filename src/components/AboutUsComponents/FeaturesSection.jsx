import { Reveal, Eyebrow, Rule } from "./utils";

// ─── Features data ────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "24 / 7 access",
    desc: "The best R&B tracks, around the clock, every single day of the year.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Artist interviews",
    desc: "Exclusive conversations with the R&B artists you love, unfiltered.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Live from San Bernardino",
    desc: "Real-time broadcasts direct from events in our home city.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1z" />
      </svg>
    ),
    title: "High-quality streaming",
    desc: "Crystal-clear sound with seamless, uninterrupted playback.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Listener requests",
    desc: "Your voice on air — interactive shout-outs and song requests.",
  },
];

// ─── Features Section ─────────────────────────────
export default function FeaturesSection() {
  return (
    <section style={{ padding: "8rem 5vw" }}>
      <Reveal>
        <Eyebrow>Why Soul FM</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--color-soul-white)",
            margin: "0 0 4rem",
            maxWidth: 500,
          }}
        >
          Key benefits
          <br />
          <em style={{ fontStyle: "italic", color: "var(--color-soul-accent)" }}>
            of this service.
          </em>
        </h2>
      </Reveal>

      <div>
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 80}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2rem 1fr auto",
                alignItems: "start",
                gap: "1.5rem 2rem",
                padding: "2rem 0",
                borderTop: "1px solid var(--color-soul-border)",
              }}
            >
              <div style={{ color: "var(--color-soul-accent)", paddingTop: 2 }}>
                {f.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 400,
                    fontSize: "1.3rem",
                    letterSpacing: "-0.01em",
                    color: "var(--color-soul-white)",
                    marginBottom: 6,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: 14,
                    color: "rgba(240,240,240,0.45)",
                    lineHeight: 1.75,
                  }}
                >
                  {f.desc}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: 12,
                  color: "var(--color-soul-muted)",
                  letterSpacing: "0.05em",
                  paddingTop: 4,
                }}
              >
                0{i + 1}
              </div>
            </div>
          </Reveal>
        ))}
        <Rule />
      </div>
    </section>
  );
}
