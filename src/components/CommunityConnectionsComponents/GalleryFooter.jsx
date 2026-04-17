export default function GalleryFooter({ totalPhotos }) {
  return (
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
        {String(totalPhotos).padStart(2, "0")}
      </span>
    </footer>
  );
}
