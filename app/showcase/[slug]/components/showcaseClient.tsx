'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Grid } from 'lucide-react';

interface ProcessedImageData {
  id: number;
  originalName: string;
  originalSize: string;
  alt: string;
  urls: {
    desktop_landscape: {
      url: string;
      webp_url: string;
      size_reduced: string;
    };
    desktop_square: {
      url: string;
      webp_url: string;
      size_reduced: string;
    };
    mobile_portrait: {
      url: string;
      webp_url: string;
      size_reduced: string;
    };
  };
}

interface ShowcaseClientProps {
  images: ProcessedImageData[];
  categoryName: string;
  categorySlug: string;
  categoryDescription: string;
  totalImages: number;
}

type ViewMode = 'canvas' | 'grid';
type ImageVariant = 'desktop_landscape' | 'desktop_square' | 'mobile_portrait';

const ShowcaseClient: React.FC<ShowcaseClientProps> = ({
  images,
  categoryName,
  categorySlug,
  categoryDescription,
  totalImages
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('canvas');
  const [imageVariant, setImageVariant] = useState<ImageVariant>('desktop_landscape');
  const [backgroundOffset, setBackgroundOffset] = useState(0);

  // Initialize background offset based on current image index
  useEffect(() => {
    setBackgroundOffset(-currentImageIndex * window.innerHeight);
  }, [currentImageIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setImageVariant('mobile_portrait');
      } else if (window.innerWidth < 1024) {
        setImageVariant('desktop_square');
      } else {
        setImageVariant('desktop_landscape');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (viewMode !== 'canvas') return;
      
      e.preventDefault();
      
      // Smooth continuous scrolling
      const scrollSpeed = 2; // Adjust for sensitivity
      const newOffset = backgroundOffset + (e.deltaY * scrollSpeed);
      
      // Calculate which image should be "active" based on scroll
      const imageHeight = window.innerHeight;
      const maxOffset = -(images.length - 1) * imageHeight;
      
      // Constrain the offset
      const constrainedOffset = Math.max(maxOffset, Math.min(0, newOffset));
      
      setBackgroundOffset(constrainedOffset);
      
      // Update current image index based on scroll position
      const newIndex = Math.round(-constrainedOffset / imageHeight);
      setCurrentImageIndex(Math.max(0, Math.min(images.length - 1, newIndex)));
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [backgroundOffset, images.length, viewMode]);

  const getImageUrl = (image: ProcessedImageData, variant: ImageVariant, useWebP = true) => {
    return useWebP ? image.urls[variant].webp_url : image.urls[variant].url;
  };

  if (viewMode === 'grid') {
    return (
      <div className="min-h-screen bg-white">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/"
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="font-light">{categoryName}</span>
              </Link>
              <button
                onClick={() => setViewMode('canvas')}
                className="px-6 py-3 bg-black text-white rounded text-sm font-light hover:bg-gray-800 transition-colors"
              >
                Canvas View
              </button>
            </div>
          </div>
        </header>

        <main className="pt-20 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="aspect-[4/3] relative cursor-pointer group"
                onClick={() => {
                  setCurrentImageIndex(index);
                  setViewMode('canvas');
                }}
              >
                <Image
                  src={getImageUrl(image, imageVariant, true)}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Background - Vertical film strip that moves smoothly */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${backgroundOffset}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="w-full h-screen relative"
          >
            <Image
              src={getImageUrl(image, imageVariant, true)}
              alt={image.alt}
              fill
              className="object-cover"
              priority={Math.abs(index - currentImageIndex) <= 1}
            />
          </div>
        ))}
      </div>

      {/* NEW: Fixed Canvas Frame with rounded inner corners */}
      <div
        className="fixed z-10 pointer-events-none"
        style={{
          // This defines the central transparent "hole" or viewport for the image
          top: '80px',
          bottom: '60px',
          left: '60px',
          right: '60px',
          // This sets the radius of the inner corners of the frame
          borderRadius: '24px',
          // This casts a massive white shadow outwards, creating the frame effect
          boxShadow: '0 0 0 100vmax white',
        }}
      />

      {/* UI integrated into the frame */}
      <div className="fixed top-[25px] left-[25px] z-20 pointer-events-auto">
        <Link 
          href="/"
          className="flex items-center text-black bg-transparent hover:bg-black/5 px-4 py-2 rounded-full transition-colors border border-black/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="font-light">{categoryName}</span>
        </Link>
      </div>

      <div className="fixed top-[25px] right-[25px] z-20 pointer-events-auto">
        <button
          onClick={() => setViewMode('grid')}
          className="flex items-center space-x-2 px-4 py-2 bg-transparent hover:bg-black/5 text-black rounded-full transition-colors border border-black/10"
        >
          <Grid className="w-4 h-4" />
          <span className="font-light">Grid</span>
        </button>
      </div>
    </div>
  );
};

export default ShowcaseClient;