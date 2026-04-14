import rnbPhoto2 from "../../assets/rhythm.jpg";
import { Reveal, Eyebrow } from "./utils";

// ─── Rhythm Section ───────────────────────────────
export default function RhythmSection() {
  return (
    <section
      style={{
        padding: "0 5vw 8rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "5rem",
        alignItems: "center",
      }}
      className="about-two-col"
    >
      <Reveal delay={100}>
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "130%",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <img
            src={rnbPhoto2}
            alt="Soul FM — feel the rhythm"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>
      </Reveal>

      <Reveal delay={200}>
        <Eyebrow>Feel the rhythm</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--color-soul-white)",
            margin: "0 0 1.5rem",
          }}
        >
          Let the music
          <br />
          <em style={{ fontStyle: "italic", color: "var(--color-soul-accent)" }}>
            move you.
          </em>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: 15,
            color: "rgba(240,240,240,0.5)",
            lineHeight: 1.85,
            marginBottom: "1rem",
          }}
        >
          When you choose Soul FM, you're not just tuning into a radio station —
          you're becoming part of a community that celebrates the rich history
          and vibrant future of R&B music.
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: 15,
            color: "rgba(240,240,240,0.5)",
            lineHeight: 1.85,
            marginBottom: "2.5rem",
          }}
        >
          Tune in today and feel the rhythm and blues coursing through your
          veins, igniting a passion for the genre that's hard to resist.
        </p>
        <button
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--color-soul-white)",
            background: "transparent",
            border: "1px solid var(--color-soul-border)",
            padding: "14px 32px",
            borderRadius: 0,
            transition: "border-color 0.3s, color 0.3s",
          }}
          data-hover
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-soul-accent)";
            e.currentTarget.style.color = "var(--color-soul-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-soul-border)";
            e.currentTarget.style.color = "var(--color-soul-white)";
          }}
        >
          Explore our station
        </button>
      </Reveal>
    </section>
  );
}
