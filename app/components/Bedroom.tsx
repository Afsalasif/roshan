import React, { useState } from 'react';
import imageData, { ImageDataItem } from '../data/imgData';

interface GalleryProps {
  onImageClick: (image: ImageDataItem) => void;
}

interface GalleryItemProps {
  image: ImageDataItem;
  onClick: () => void;
}

function GalleryItem({ image, onClick }: GalleryItemProps) {
  return (
    <div
      className="group relative w-64 h-64 m-4 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-110"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700/40 to-black/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 transition-all duration-500 group-hover:shadow-2xl group-hover:border-white/20" />
      <div className="relative w-full h-full flex items-center justify-center p-2">
        <img 
          src={image.src} 
          alt={image.alt} 
          className="object-cover w-full h-full rounded-xl shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:rounded-[18px]" 
        />
      </div>
    </div>
  );
}

const Bedroom = ({ onImageClick }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageDataItem | null>(null);
  const images = imageData.bedroom;

  return (
    <div className="flex flex-wrap justify-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
      {images.map((image) => (
        <GalleryItem 
          key={image.id} 
          image={image} 
          onClick={() => {
            setSelectedImage(image);
            onImageClick(image);
          }}
        />
      ))}

      {/* Enhanced Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 p-6 relative flex flex-col items-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="object-contain max-h-[80vh] rounded-xl shadow-lg"
              />
              <button
                className="absolute top-4 right-4 p-2 text-gray-300 hover:text-white transition-colors backdrop-blur-sm bg-gray-800/40 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bedroom;
