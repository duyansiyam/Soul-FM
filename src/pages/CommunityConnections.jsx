import { useState } from "react";

const photos = [
  {
    id: 1,
    src: "/src/assets/comm-pic01.webp",
    tag: "Live Session",
    caption: "Something in the silence between notes",
    layout: "tall",
  },
  {
    id: 2,
    src: "/src/assets/comm-pic02.webp",
    tag: "Community",
    caption: "Where strangers become family",
    layout: "normal",
  },
  {
    id: 3,
    src: "/src/assets/comm-pic03.webp",
    tag: "After Hours",
    caption: "The night never really ends here",
    layout: "normal",
  },
  {
    id: 4,
    src: "/src/assets/comm-pic04.webp",
    tag: "On Air",
    caption: "Every voice deserves a mic",
    layout: "normal",
  },
  {
    id: 5,
    src: "/src/assets/comm-pic05.webp",
    tag: "Gathering",
    caption: "Gathered under the same signal",
    layout: "normal",
  },
  {
    id: 6,
    src: "/src/assets/comm-pic06.webp",
    tag: "Portrait",
    caption: "Tuned in, turned on",
    layout: "tall",
  },
  {
    id: 7,
    src: "/src/assets/comm-pic07.webp",
    tag: "Event",
    caption: "The room remembers every frequency",
    layout: "wide",
  },
  {
    id: 8,
    src: "/src/assets/comm-pic08.webp",
    tag: "Studio",
    caption: "Born in the booth",
    layout: "normal",
  },
  {
    id: 9,
    src: "/src/assets/comm-pic09.webp",
    tag: "Soul",
    caption: "Still here, still transmitting",
    layout: "normal",
  },
];

function PhotoCell({ photo }) {
  const [hovered, setHovered] = useState(false);

  const baseStyle = {
    position: "relative",
    overflow: "hidden",
    background: "#161616",
    gridRow: photo.layout === "tall" ? "span 2" : undefined,
    gridColumn: photo.layout === "wide" ? "span 2" : undefined,
    aspectRatio:
      photo.layout === "tall"
        ? undefined
        : photo.layout === "wide"
        ? "16/7"
        : "4/5",
    minHeight: photo.layout === "tall" ? "520px" : undefined,
  };

  return (
    <div
      style={baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* shimmer bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#161616",
          zIndex: 0,
        }}
      />

      <img
        src={photo.src}
        alt={`Community moment ${String(photo.id).padStart(2, "0")}`}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          position: "relative",
          zIndex: 1,
          filter: hovered
            ? "grayscale(0%) brightness(0.95) contrast(1.02)"
            : "grayscale(18%) brightness(0.88) contrast(1.05)",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          transition:
            "filter 0.55s ease, transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />

      {/* overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 55%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          display: "flex",
          alignItems: "flex-end",
          padding: "20px",
          zIndex: 2,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 300,
              color: "#c0392b",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: "0 0 6px",
            }}
          >
            {photo.tag}
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "15px",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgba(240,240,240,0.85)",
              letterSpacing: "0.02em",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CommunityConnections() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@200;300;400&display=swap');
      `}</style>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          background: "#0a0a0a",
          color: "#f0f0f0",
          minHeight: "100vh",
          paddingTop: "64px", // accounts for navbar (pt-16)
          paddingBottom: "80px",
          boxSizing: "border-box",
        }}
      >
        {/* ── Header ── */}
        <header style={{ padding: "0 48px", marginBottom: "56px" }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#c0392b",
              margin: "0 0 16px",
            }}
          >
            Soul FM · Community
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              margin: "0 0 20px",
              color: "#f0f0f0",
            }}
          >
            Faces of{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "rgba(240,240,240,0.4)",
              }}
            >
              the frequency
            </em>
          </h1>

          <p
            style={{
              fontSize: "13px",
              fontWeight: 300,
              color: "#4a4a4a",
              letterSpacing: "0.04em",
              maxWidth: "360px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Moments shared, souls connected. A living archive of the people who
            make this station breathe.
          </p>
        </header>

        {/* ── Divider ── */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "#1e1e1e",
            marginBottom: "56px",
          }}
        />

        {/* ── Gallery Grid ── */}
        <div
          style={{
            padding: "0 48px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
          }}
        >
          {photos.map((photo) => (
            <PhotoCell key={photo.id} photo={photo} />
          ))}
        </div>

        {/* ── Footer ── */}
        <footer
          style={{
            padding: "56px 48px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#4a4a4a",
            }}
          >
            Soul FM · Est. 2020 · Broadcasting from the heart
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.8rem",
              fontWeight: 300,
              color: "rgba(240,240,240,0.08)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            09
          </span>
        </footer>
      </div>
    </>
  );
}