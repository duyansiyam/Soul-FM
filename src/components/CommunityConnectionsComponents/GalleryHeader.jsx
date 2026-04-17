export default function GalleryHeader() {
  return (
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
        Moments shared, souls connected. A living archive of the people who make
        this station breathe.
      </p>
    </header>
  );
}
