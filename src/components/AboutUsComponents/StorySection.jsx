import rnbPhoto from "../../assets/rnb.jpg";
import { Reveal, Eyebrow } from "./utils";

// ─── Story Section ────────────────────────────────
export default function StorySection() {
  return (
    <section
      style={{
        padding: "8rem 5vw",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "5rem",
        alignItems: "center",
      }}
      className="about-two-col"
    >
      <Reveal>
        <Eyebrow>Our story</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--color-soul-white)",
            margin: "0 0 2rem",
          }}
        >
          Rediscover R&B music
          <br />
          <em style={{ fontStyle: "italic", color: "var(--color-soul-accent)" }}>
            in San Bernardino.
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
          Soul FM, established in 2024, is dedicated to bringing R&B back to the
          forefront of your listening experience. Whether you're driving through
          the bustling streets of San Bernardino or relaxing at home, we are your
          go-to station for the best in R&B.
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
          From classic hits to the latest releases, we ensure your musical
          journey is both nostalgic and refreshing. Join the growing community of
          R&B enthusiasts who have made Soul FM their preferred station.
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "3rem",
            borderTop: "1px solid var(--color-soul-border)",
            paddingTop: "2rem",
          }}
        >
          {[
            ["2024", "Founded"],
            ["24/7", "On air"],
            ["SBD", "Hometown"],
          ].map(([num, lbl]) => (
            <div key={lbl}>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "2rem",
                  color: "var(--color-soul-accent)",
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-soul-muted)",
                  marginTop: 6,
                }}
              >
                {lbl}
              </div>
            </div>
          ))}
        </div>

        <a
          href="tel:9098930169"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: "2.5rem",
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-soul-accent)",
            textDecoration: "none",
            borderBottom: "1px solid rgba(192,57,43,0.3)",
            paddingBottom: 4,
          }}
          data-hover
        >
          (909) 893-0169
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </Reveal>

      <Reveal delay={150}>
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "120%",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <img
            src={rnbPhoto}
            alt="R&B culture in San Bernardino"
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
    </section>
  );
}
