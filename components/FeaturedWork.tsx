"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function FeaturedWork() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredPage, setHoveredPage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pages = [
    'Apartment', 'Bar', 'Bedroom','Washroom', 
    'Dining', 'Office', 'Spa', 'Villa'
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <div
        className="max-w-6xl mx-auto"
        style={{
          transform: `translateY(${scrollY * -0.15}px) scale(${1 - scrollY * 0.0001})`
        }}
      >
        {/* Main Image Container */}
        <div className="relative group">
          <div
            className="h-[70vh] bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-[3rem] shadow-2xl overflow-hidden"
            style={{
              transform: `rotateY(${Math.sin(scrollY * 0.001) * 2}deg) rotateX(${Math.cos(scrollY * 0.0015) * 1}deg)`
            }}
          >
            {/* Inner glow effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30"
              style={{
                transform: `scale(${1 + Math.sin(scrollY * 0.003) * 0.02})`
              }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full opacity-20"
                  style={{
                    top: `${20 + (i * 10)}%`,
                    left: `${15 + (i * 8)}%`,
                    transform: `translateY(${Math.sin(scrollY * 0.002 + i) * 20}px) scale(${1 + Math.cos(scrollY * 0.003 + i) * 0.5})`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating Navigation */}
          <div
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
            style={{
              transform: `translateY(${Math.sin(scrollY * 0.004) * 5}px) translateX(-50%)`
            }}
          >
            <div className="text-center">
              <p className="text-sm text-gray-400 font-light tracking-widest uppercase mb-6">
                All My Work
              </p>

              {/* Elegant Page Links with Individual Hover Effects */}
              <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
                {pages.map((page, index) => (
                  <div
                    key={page}
                    className="group"
                    onMouseEnter={() => setHoveredPage(page)}
                    onMouseLeave={() => setHoveredPage(null)}
                    style={{
                      transform: `translateY(${Math.sin(scrollY * 0.002 + index * 0.5) * 3}px)`
                    }}
                  >
                    <Link 
                      href={`/showcase/${page.toLowerCase()}`}
                      className="block text-lg font-extralight text-gray-600 hover:text-gray-900 transition-all duration-500 tracking-wide relative cursor-pointer"
                    >
                      {page}
                      {/* Individual underline animation */}
                      <div 
                        className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-gray-300 to-gray-500 transition-all duration-700 ease-out ${
                          hoveredPage === page ? 'w-full' : 'w-0'
                        }`} 
                      />
                      {/* Individual background glow */}
                      <div
                        className={`absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-transparent via-gray-50/50 to-transparent rounded transition-all duration-500 -z-10 ${
                          hoveredPage === page ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                          transform: `scale(${1 + Math.sin(scrollY * 0.005 + index) * 0.05})`
                        }}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}