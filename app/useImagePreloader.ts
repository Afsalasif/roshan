import { useState, useEffect } from "react";

const useImagePreloader = (imageUrls: string[]) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;

    const loadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === imageUrls.length) {
            setLoaded(true);
            resolve();
          }
        };
        img.onerror = () => resolve(); // Handle broken images gracefully
      });
    };

    if (imageUrls.length) {
      Promise.all(imageUrls.map(loadImage));
    }
  }, [imageUrls]);

  return loaded;
};

export default useImagePreloader;
