import { Reveal } from "./utils";

// ─── CTA Footer ───────────────────────────────────
export default function CTAFooter() {
  return (
    <section
      style={{
        padding: "6rem 5vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      <Reveal>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-soul-muted)",
            marginBottom: "0.75rem",
          }}
        >
          Ready to tune in?
        </div>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--color-soul-white)",
            margin: 0,
          }}
        >
          Contact us today
          <br />
          <em style={{ fontStyle: "italic", color: "var(--color-soul-accent)" }}>
            and get involved.
          </em>
        </h3>
      </Reveal>

      <Reveal delay={150}>
        <a
          href="tel:9098930169"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--color-soul-black)",
            background: "var(--color-soul-accent)",
            padding: "16px 36px",
            textDecoration: "none",
            borderRadius: 0,
            transition: "opacity 0.2s",
          }}
          data-hover
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          (909) 893-0169
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}