import React from 'react'
import imageData, { ImageDataItem } from '../data/imgData';
import GalleryItem from './GalleryItem';


interface GalleryProps {
    onImageClick: (image: ImageDataItem) => void;
}
const Washroom = ({ onImageClick }: GalleryProps) => {
    const images = imageData.washroom;

    return (
        <div className="flex flex-wrap justify-center">
            {images.map((image) => (
                <GalleryItem key={image.id} image={image} onClick={() => onImageClick(image)} />
            ))}
        </div>
    );
}

export default Washroom
