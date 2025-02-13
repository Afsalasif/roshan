'use client'
import { useState } from "react";
import useImagePreloader from "../useImagePreloader";
// import useImagePreloader from "../hooks/useImagePreloader";
export const imagePaths = [
    // Washroom images
    "/images/washroom/bathroom1.jpg",
    "/images/washroom/bathroom2.jpg",
    "/images/washroom/bathroom3.png",
    "/images/washroom/bathroom4.jpg",
    
    // Apartment images
    "/images/apartment/a1.jpg",
    "/images/apartment/a2.jpg",
    "/images/apartment/a3.jpg",
    "/images/apartment/a4.jpg",
    "/images/apartment/a5.jpg",
    "/images/apartment/a6.jpg",
    "/images/apartment/a7.jpg",
    "/images/apartment/a8.jpg",
    "/images/apartment/a9.jpg",
    "/images/apartment/a10.jpg",
    "/images/apartment/a11.jpg",
  
    // Bar images
    "/images/bar/A1.jpg",
    "/images/bar/A2.jpg",
  
    // Bedroom images
    "/images/bedroom/be1.jpg",
    "/images/bedroom/be2.jpg",
    "/images/bedroom/be3.jpg",
    "/images/bedroom/be4.jpg",
    "/images/bedroom/be5.jpg",
    "/images/bedroom/be6.jpg",
    "/images/bedroom/be7.jpg",
  
    // Dining images
    "/images/dining/d1.jpg",
    "/images/dining/d2.jpg",
    "/images/dining/d3.jpg",
    "/images/dining/d4.jpg",
  
    // Office images
    "/images/offfice/o1.jpg",
    "/images/offfice/o2.jpg",
    "/images/offfice/o3.jpg",
    "/images/offfice/o4.jpg",
    "/images/offfice/o5.jpg",
    "/images/offfice/o6.jpg",
    "/images/offfice/o7.jpg",
    "/images/offfice/o8.jpg",
  
    // Spa images
    "/images/spa/s1.jpg",
    "/images/spa/s2.jpg",
    "/images/spa/s3.jpg",
    "/images/spa/s4.jpg",
    "/images/spa/s5.jpg",
    "/images/spa/s6.jpg",
    "/images/spa/s7.jpg",
    "/images/spa/s8.jpg",
    "/images/spa/s9.jpg",
    "/images/spa/s10.jpg",
    "/images/spa/s11.jpg",
    "/images/spa/s12.jpg",
    "/images/spa/s13.jpg",
    "/images/spa/s14.jpg",
    "/images/spa/s15.jpg",
    "/images/spa/s16.jpg",
    "/images/spa/s17.jpg",
    "/images/spa/s18.jpg",
    "/images/spa/s19.jpg",
    "/images/spa/s20.jpg",
    "/images/spa/s21.jpg",
  
    // Villa images
    "/images/villa/v1.jpg",
    "/images/villa/v2.jpg",
    "/images/villa/v3.jpg",
    "/images/villa/v4.jpg",
    "/images/villa/v5.jpg",
    "/images/villa/v6.jpg",
    "/images/villa/v7.jpg",
    "/images/villa/v8.jpg",
    "/images/villa/v9.jpg",
    "/images/villa/v10.jpg",
    "/images/villa/v11.jpg"
  ];
  

const Preloader = ({ children }: { children: React.ReactNode }) => {
  const imagesLoaded = useImagePreloader(imagePaths);
  const [hideLoader, setHideLoader] = useState(false);

  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="loader"></div> {/* Add your custom loader */}
      </div>
    );
  }

  // Optional: Smooth fade out effect
  if (imagesLoaded && !hideLoader) {
    setTimeout(() => setHideLoader(true), 500);
  }

  return <>{!hideLoader && children}</>;
};

export default Preloader;
