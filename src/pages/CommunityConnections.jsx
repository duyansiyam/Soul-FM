import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryHeader from "../components/CommunityConnectionsComponents/GalleryHeader";
import GalleryFooter from "../components/CommunityConnectionsComponents/GalleryFooter";
import { photos } from "../components/CommunityConnectionsComponents/communityData";

export default function CommunityConnections() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // only show first 8 photos = 4 / 4 layout
  const visiblePhotos = photos.slice(0, 8);
  const firstRow = visiblePhotos.slice(0, 4);
  const secondRow = visiblePhotos.slice(4, 8);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevPhoto = (e) => {
    e.stopPropagation();
    setLightboxIndex(
      (prev) => (prev - 1 + visiblePhotos.length) % visiblePhotos.length
    );
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % visiblePhotos.length);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        * {
          box-sizing: border-box;
        }

        .community-page {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
          color: #f0f0f0;
          min-height: 100vh;
          padding-top: 90px;
          padding-bottom: 80px;
          overflow-x: hidden;
        }

        .gallery-shell {
          width: min(1400px, calc(100% - 40px));
          margin: 0 auto;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: #1e1e1e;
          margin: 0 0 48px;
        }

        .gallery-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          margin-bottom: 22px;
          justify-items: center;
        }

        .gallery-card {
          position: relative;
          width: 100%;
          max-width: 320px;
          height: 540px;
          overflow: hidden;
          border-radius: 28px;
          background: #141414;
          border: 1px solid #1f1f1f;
          cursor: pointer;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.28);
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease, filter 0.35s ease;
        }

        .gallery-card:hover .gallery-image {
          transform: scale(1.05);
          filter: brightness(1.03);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.82) 0%,
            rgba(0, 0, 0, 0.28) 42%,
            rgba(0, 0, 0, 0.06) 100%
          );
          display: flex;
          align-items: flex-end;
          padding: 22px;
        }

        .image-meta {
          transform: translateY(10px);
          opacity: 0.94;
          transition: all 0.35s ease;
        }

        .gallery-card:hover .image-meta {
          transform: translateY(0);
          opacity: 1;
        }

        .image-kicker {
          display: inline-block;
          margin-bottom: 8px;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(240, 240, 240, 0.74);
        }

        .image-title {
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: rem;
          font-weight: 600;
          line-height: 1;
          color: #ffffff;
        }

        .image-sub {
          margin: 10px 0 0;
          font-size: 0.95rem;
          line-height: 1.5;
          color: rgba(240, 240, 240, 0.86);
          max-width: 90%;
        }

        .floating-accent {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 58px;
          height: 58px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          color: #fff;
          font-size: 22px;
          z-index: 2;
        }

        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .lightbox-content {
          position: relative;
          width: min(1100px, 100%);
          height: min(88vh, 820px);
          border-radius: 28px;
          background: #111111;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 70px 70px 110px;
          background: #0d0d0d;
        }

        .lightbox-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .lightbox-topbar {
          position: absolute;
          top: 16px;
          left: 16px;
          right: 16px;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .lightbox-chip {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.38);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #fff;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }

        .lightbox-btn {
          width: 46px;
          height: 46px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(0, 0, 0, 0.38);
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: transform 0.25s ease, background 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-btn:hover {
          transform: scale(1.06);
          background: rgba(255, 255, 255, 0.12);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
        }

        .lightbox-nav.left {
          left: 18px;
        }

        .lightbox-nav.right {
          right: 18px;
        }

        .lightbox-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 26px 24px 22px;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.82) 0%,
            rgba(0, 0, 0, 0.18) 100%
          );
        }

        .lightbox-caption h3 {
          margin: 0 0 6px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 2vw, 2.3rem);
          font-weight: 600;
          line-height: 1.05;
          color: #ffffff;
        }

        .lightbox-caption p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(240, 240, 240, 0.84);
        }

        @media (max-width: 1280px) {
          .gallery-row {
            grid-template-columns: repeat(2, 1fr);
          }

          .gallery-card {
            max-width: 340px;
          }
        }

        @media (max-width: 768px) {
          .community-page {
            padding-top: 78px;
            padding-bottom: 64px;
          }

          .gallery-shell {
            width: min(1400px, calc(100% - 20px));
          }

          .gallery-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .gallery-card {
            max-width: 100%;
            width: 100%;
            height: 480px;
          }

          .image-title {
            font-size: 2.4rem;
          }

          .floating-accent {
            width: 50px;
            height: 50px;
            font-size: 18px;
          }

          .lightbox-content {
            height: min(84vh, 720px);
          }

          .lightbox-image-wrap {
            padding: 72px 18px 115px;
          }

          .lightbox-nav.left {
            left: 10px;
          }

          .lightbox-nav.right {
            right: 10px;
          }
        }
      `}</style>

      <div className="community-page">
        <GalleryHeader />

        <div className="gallery-shell">
          <div className="divider" />

          <div className="gallery-row">
            {firstRow.map((photo, rowIndex) => {
              const index = rowIndex;
              return (
                <motion.div
                  key={index}
                  className="gallery-card"
                  onClick={() => openLightbox(index)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: rowIndex * 0.08 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="floating-accent">↗</div>

                  <img
                    src={photo.src}
                    alt={photo.alt || `Community photo ${index + 1}`}
                    className="gallery-image"
                  />

                  <div className="image-overlay">
                    <div className="image-meta">
                      <span className="image-kicker">Soul FM Community</span>
                      <h3 className="image-title">
                        {photo.title || "Par 3: Corona, CA"}
                      </h3>
                      <p className="image-sub">
                        {photo.description ||
                          "Captured connection, culture, and community."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="gallery-row">
            {secondRow.map((photo, rowIndex) => {
              const index = rowIndex + 4;
              return (
                <motion.div
                  key={index}
                  className="gallery-card"
                  onClick={() => openLightbox(index)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: rowIndex * 0.08 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="floating-accent">↗</div>

                  <img
                    src={photo.src}
                    alt={photo.alt || `Community photo ${index + 1}`}
                    className="gallery-image"
                  />

                  <div className="image-overlay">
                    <div className="image-meta">
                      <span className="image-kicker">Soul FM Community</span>
                      <h3 className="image-title">
                        {photo.title || "Par 3: Corona, CA"}
                      </h3>
                      <p className="image-sub">
                        {photo.description ||
                          "Captured connection, culture, and community."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <GalleryFooter totalPhotos={visiblePhotos.length} />
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox-backdrop"
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="lightbox-topbar">
                <div className="lightbox-chip">
                  {lightboxIndex + 1} / {visiblePhotos.length}
                </div>

                <button className="lightbox-btn" onClick={closeLightbox}>
                  ✕
                </button>
              </div>

              <button
                className="lightbox-btn lightbox-nav left"
                onClick={prevPhoto}
                type="button"
              >
                ←
              </button>

              <button
                className="lightbox-btn lightbox-nav right"
                onClick={nextPhoto}
                type="button"
              >
                →
              </button>

              <div className="lightbox-image-wrap">
                <motion.img
                  key={lightboxIndex}
                  src={visiblePhotos[lightboxIndex].src}
                  alt={
                    visiblePhotos[lightboxIndex].alt ||
                    `Photo ${lightboxIndex + 1}`
                  }
                  className="lightbox-image"
                  initial={{ opacity: 0.2, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>

              <div className="lightbox-caption">
                <h3>
                  {visiblePhotos[lightboxIndex].title ||
                    `Photo ${lightboxIndex + 1}`}
                </h3>
                <p>
                  {visiblePhotos[lightboxIndex].description ||
                    "A featured moment from the Soul FM community gallery."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}