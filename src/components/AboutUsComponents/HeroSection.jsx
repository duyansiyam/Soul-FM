import { useRef, useEffect, memo } from "react";
import heroVideo from "../../assets/hero-video.mp4";
import EQBars from "./EQBars";

const NAV_H = 64;

export default memo(function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.src = heroVideo;
    v.play().catch(() => {});
  }, []);

  return (
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, var(--color-soul-black) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.3) 100%)",
          }}
        />
      </div>

      {/* Hero text */}
      <div
        className="hero-text-enter"
        style={{ position: "relative", zIndex: 1, maxWidth: 900 }}
      >
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-soul-accent)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "1.5rem",
          }}
          className="hero-fade-1"
        >
          <span
            style={{
              width: 24,
              height: 1,
              background: "var(--color-soul-accent)",
              display: "block",
            }}
          />
          Est. 2024 · San Bernardino, CA
        </div>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "var(--color-soul-white)",
            margin: "0 0 1.5rem",
          }}
          className="hero-fade-2"
        >
          Revive Your Love
          <br />
          <em style={{ color: "var(--color-soul-accent)", fontStyle: "italic" }}>
            for R&B
          </em>{" "}
          Today
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "clamp(14px, 1.6vw, 17px)",
            color: "rgba(240,240,240,0.5)",
            maxWidth: 520,
            lineHeight: 1.75,
            margin: "0 0 2rem",
          }}
          className="hero-fade-3"
        >
          San Bernardino's home for rhythm, soul, and the music that moves you —
          24 hours a day.
        </p>

        <div className="hero-fade-4">
          <EQBars />
        </div>
      </div>
    </section>
  );
});