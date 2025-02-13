"use client"; // Required for useState

import React, { useState } from "react";
import { ImageDataItem } from "./data/imgData";
import Washroom from "./components/Washroom";
import Apartment from "./components/Apartments";
import Bar from "./components/Bar";
import Bedroom from "./components/Bedroom";
import Dining from "./components/Dining";
import Office from "./components/Office";
import Spa from "./components/Spa";
import Villa from "./components/Villa";

interface TabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

function Tabs({ activeTab, onTabChange }: TabsProps) {
    const tabs = [
        "washroom",
        "apartment",
        "bar",
        "bedroom",
        "dining",
        "office",
        "spa",
        "villa",
    ];

    return (
        <div className="flex overflow-x-auto space-x-4 md:space-x-8 justify-center mb-6 px-4">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`relative text-sm md:text-lg font-medium whitespace-nowrap hover:text-blue-300 transition-colors duration-200 focus:outline-none ${
                        activeTab === tab ? "text-blue-400" : "text-gray-300"
                    }`}
                    onClick={() => onTabChange(tab)}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"></span>
                    )}
                </button>
            ))}
        </div>
    );
}

export default function Home() {
    const [activeTab, setActiveTab] = useState("washroom");
    const [selectedImage, setSelectedImage] = useState<ImageDataItem | null>(null);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleImageClick = (image: ImageDataItem) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    let content;
    switch (activeTab) {
        case "washroom":
            content = <Washroom onImageClick={handleImageClick} />;
            break;
        case "apartment":
            content = <Apartment onImageClick={handleImageClick} />;
            break;
        case "bar":
            content = <Bar onImageClick={handleImageClick} />;
            break;
        case "bedroom":
            content = <Bedroom onImageClick={handleImageClick} />;
            break;
        case "dining":
            content = <Dining onImageClick={handleImageClick} />;
            break;
        case "office":
            content = <Office onImageClick={handleImageClick} />;
            break;
        case "spa":
            content = <Spa onImageClick={handleImageClick} />;
            break;
        case "villa":
            content = <Villa onImageClick={handleImageClick} />;
            break;
        default:
            content = <Washroom onImageClick={handleImageClick} />;
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen py-10 md:py-16">
            <div className="container mx-auto px-4">
                <header className="mb-6 md:mb-12 text-center">
                    <h1 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
                        Interior Design Showcase
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base">
                        Explore a collection of my Stunning Works
                    </p>
                </header>

                <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

                <main className="bg-gray-800 rounded-lg shadow-lg overflow-hidden p-4 md:p-8">
                    {content}
                </main>

                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
                        <div className="relative bg-gray-700 rounded-lg w-full max-w-md md:max-w-4xl mx-auto overflow-hidden">
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-100 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="block w-full h-auto max-h-[80vh] object-contain"
                            />
                            <div className="p-4 md:p-6">
                                <h2 className="text-lg md:text-2xl font-semibold mb-2">
                                    {selectedImage.alt}
                                </h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
