import { useState } from "react";

export default function PhotoCell({ photo, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isPortrait = photo.layout === "tall";

  return (
    <>
      <style>{`
        .photo-row-portrait {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid #1e1e1e;
          cursor: pointer;
          max-width: 1200px;
          margin: 0 auto;
        }
        .photo-row-landscape {
          display: block;
          border-bottom: 1px solid #1e1e1e;
          cursor: pointer;
        }
        @media (max-width: 640px) {
          .photo-row-portrait {
            grid-template-columns: 1fr !important;
          }
          .portrait-caption-side {
            padding: 20px 20px 28px !important;
          }
          .landscape-meta-row {
            padding: 14px 20px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
        }
      `}</style>

      <article
        className={isPortrait ? "photo-row-portrait" : "photo-row-landscape"}
        onClick={() => onClick(index)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Image ── */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#161616",
            aspectRatio: isPortrait ? "3/4" : "16/7",
          }}
        >
          <img
            src={photo.src}
            alt={`Community moment ${String(photo.id).padStart(2, "0")}`}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: hovered
                ? "grayscale(0%) brightness(0.95) contrast(1.02)"
                : "grayscale(18%) brightness(0.88) contrast(1.05)",
              transform: hovered ? "scale(1.03)" : "scale(1)",
              transition:
                "filter 0.55s ease, transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          />
        </div>

        {/* ── Portrait: side caption panel ── */}
        {isPortrait && (
          <div
            className="portrait-caption-side"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 48px",
              background: "#0a0a0a",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "#2a2a2a",
                textTransform: "uppercase",
              }}
            >
              {String(index + 1).padStart(2, "0")} / Soul FM
            </span>
          </div>
        )}

        {/* ── Landscape/wide: bottom meta strip ── */}
        {!isPortrait && (
          <div
            className="landscape-meta-row"
            style={{
              padding: "18px 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              background: "#0a0a0a",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "#2a2a2a",
                textTransform: "uppercase",
                flexShrink: 0,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
      </article>
    </>
  );
}