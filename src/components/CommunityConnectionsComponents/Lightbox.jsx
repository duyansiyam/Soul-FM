import { useEffect } from "react";


export default function Lightbox({ photos, activeIndex, onClose, onPrev, onNext }) {
  const photo = photos[activeIndex];


  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);


  if (!photo) return null;


  return (
    <>
      <style>{`
        .lightbox-img-wrap {
          max-width: 90vw;
          max-height: 80vh;
        }
        @media (max-width: 640px) {
          .lightbox-img-wrap {
            max-width: 100vw;
            max-height: 70vh;
          }
          .lightbox-nav-btn {
            width: 36px !important;
            height: 36px !important;
            font-size: 16px !important;
          }
          .lightbox-meta {
            padding: 16px 20px !important;
          }
        }
      `}</style>


      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(5,5,5,0.96)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#3a3a3a",
            }}
          >
            Soul FM · {String(activeIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "1px solid #2a2a2a",
              color: "#6a6a6a",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#c0392b";
              e.currentTarget.style.color = "#c0392b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2a2a2a";
              e.currentTarget.style.color = "#6a6a6a";
            }}
          >
            ✕
          </button>
        </div>


        {/* Image */}
        <div
          className="lightbox-img-wrap"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            key={photo.id}
            src={photo.src}
            alt={photo.caption}
            style={{
              maxWidth: "90vw",
              maxHeight: "78vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              display: "block",
              animation: "lbFadeIn 0.3s ease",
            }}
          />


          {/* Prev */}
          <button
            className="lightbox-nav-btn"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            style={{
              position: "absolute",
              left: "-56px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "1px solid #2a2a2a",
              color: "#6a6a6a",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#f0f0f0";
              e.currentTarget.style.color = "#f0f0f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2a2a2a";
              e.currentTarget.style.color = "#6a6a6a";
            }}
          >
            ‹
          </button>


          {/* Next */}
          <button
            className="lightbox-nav-btn"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            style={{
              position: "absolute",
              right: "-56px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "1px solid #2a2a2a",
              color: "#6a6a6a",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#f0f0f0";
              e.currentTarget.style.color = "#f0f0f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2a2a2a";
              e.currentTarget.style.color = "#6a6a6a";
            }}
          >
            ›
          </button>
        </div>


        {/* Bottom meta */}
        <div
          className="lightbox-meta"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 28px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#c0392b",
                margin: "0 0 6px",
              }}
            >
              {photo.tag}
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.15rem",
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgba(240,240,240,0.7)",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {photo.caption}
            </p>
          </div>
        </div>
      </div>


      <style>{`
        @keyframes lbFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
