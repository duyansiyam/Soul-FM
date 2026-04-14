import { Reveal } from "./utils";

// ─── Mission Banner ───────────────────────────────
export default function MissionBanner() {
  return (
    <section
      style={{
        padding: "8rem 5vw",
        background: "var(--color-soul-dark)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative large italic text */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-heading)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(6rem, 18vw, 18rem)",
          color: "rgba(192,57,43,0.04)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}
      >
        Soul
      </div>

      <Reveal>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(192,57,43,0.08)",
            border: "1px solid rgba(192,57,43,0.2)",
            borderRadius: 999,
            padding: "4px 16px",
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-soul-accent)",
            marginBottom: "2.5rem",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--color-soul-accent)",
              display: "block",
              animation: "soulfm-breathe 2s infinite",
            }}
          />
          Our mission
        </div>

        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
            lineHeight: 1.45,
            letterSpacing: "-0.01em",
            color: "var(--color-soul-white)",
            maxWidth: 780,
            margin: "0 auto 1.5rem",
          }}
        >
          "Our mission is to provide a platform where R&B music thrives — a
          diverse range of tracks that cater to every listener's taste."
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: 14,
            color: "rgba(240,240,240,0.38)",
            letterSpacing: "0.04em",
          }}
        >
          Join the growing community of R&B enthusiasts in San Bernardino who
          have made Soul FM their preferred station.
        </p>
      </Reveal>
    </section>
  );
}
