// src/components/GalleryItem.tsx
// Adjust path if needed

import { ImageDataItem } from "../data/imgData";

interface GalleryItemProps {
  image: ImageDataItem;
  onClick: () => void;
}

function GalleryItem({ image, onClick }: GalleryItemProps) {
  return (
    <div
      className="w-48 h-48 m-2 overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 shadow-md rounded-md"
      onClick={onClick}
    >
      <img src={image.src} alt={image.alt} className="object-cover w-full h-full" />
    </div>
  );
}

export default GalleryItem;