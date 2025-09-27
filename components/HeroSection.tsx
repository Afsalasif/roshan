"use client"
import React, { useState, useEffect } from 'react';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 800);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Heading - Floating */}
        <div
          className={`transition-all duration-2000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
          style={{
            transform: `translateY(${scrollY * -0.1}px)`
          }}
        >
          <h1 className="text-7xl md:text-9xl font-extralight tracking-tight leading-none">
            <div
              className="block text-gray-900 mb-4"
              style={{
                transform: `translateX(${Math.sin(scrollY * 0.002) * 10}px)`
              }}
            >
              Transform
            </div>
            <div
              className="block bg-gradient-to-r from-gray-400 via-gray-700 to-gray-400 bg-clip-text text-transparent"
              style={{
                transform: `translateX(${Math.cos(scrollY * 0.003) * -15}px)`
              }}
            >
              Your Space
            </div>
          </h1>
        </div>

        {/* Subtitle - Floating */}
        <div
          className={`mt-12 transition-all duration-2000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
          style={{
            transform: `translateY(${scrollY * -0.05}px)`
          }}
        >
          <p
            className="text-2xl md:text-3xl text-gray-400 font-extralight max-w-4xl mx-auto leading-relaxed tracking-wide"
            style={{
              transform: `translateX(${Math.sin(scrollY * 0.001) * 5}px)`
            }}
          >
            Where minimalism meets luxury
          </p>
        </div>

        {/* Artistic Line - Animated */}
        <div
          className={`mt-16 flex justify-center transition-all duration-2000 delay-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        >
          <div
            className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
            style={{
              transform: `scaleX(${1 + Math.sin(scrollY * 0.01) * 0.5}) translateY(${Math.cos(scrollY * 0.005) * 3}px)`
            }}
          />
        </div>
      </div>
    </section>
  );
}