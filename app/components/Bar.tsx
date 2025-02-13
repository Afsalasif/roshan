import React from 'react'
import imageData, { ImageDataItem } from '../data/imgData';
import GalleryItem from './GalleryItem';


interface GalleryProps {
    onImageClick: (image: ImageDataItem) => void;
}
const Bar = ({ onImageClick }: GalleryProps) => {
    const images = imageData.bar;

    return (
        <div className="flex flex-wrap justify-center">
            {images.map((image) => (
                <GalleryItem key={image.id} image={image} onClick={() => onImageClick(image)} />
            ))}
        </div>
    );
}

export default Bar
