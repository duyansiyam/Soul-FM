import PhotoCell from "./PhotoCell";


export default function GalleryGrid({ photos, onPhotoClick }) {
  return (
    <div style={{ width: "100%" }}>
      {photos.map((photo, index) => (
        <PhotoCell
          key={photo.id}
          photo={photo}
          index={index}
          onClick={onPhotoClick}
        />
      ))}
    </div>
  );
}
