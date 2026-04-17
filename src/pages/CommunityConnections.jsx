import { useState } from "react";
import GalleryHeader from "../components/CommunityConnectionsComponents/GalleryHeader";
import GalleryGrid from "../components/CommunityConnectionsComponents/GalleryGrid";
import GalleryFooter from "../components/CommunityConnectionsComponents/GalleryFooter";
import Lightbox from "../components/CommunityConnectionsComponents/Lightbox";
import { photos } from "../components/CommunityConnectionsComponents/communityData";

export default function CommunityConnections() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
  const nextPhoto = () =>
    setLightboxIndex((i) => (i + 1) % photos.length);

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
          paddingTop: "64px",
          paddingBottom: "80px",
          boxSizing: "border-box",
        }}
      >
        <GalleryHeader />

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "#1e1e1e",
            marginBottom: "56px",
          }}
        />

        <GalleryGrid photos={photos} onPhotoClick={openLightbox} />

        <GalleryFooter totalPhotos={photos.length} />
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  );
}