"use client"
import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

export function ContactSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 800);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSend = () => {
    if (email.trim()) {
      setIsAnimating(true);
      
      // Simple fade out animation
      setTimeout(() => {
        setEmail('');
        setIsAnimating(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <footer className="relative py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Floating Email Container */}
        <div
          className={`transition-all duration-2000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{
            transform: `translateY(${Math.sin(scrollY * 0.003) * 3}px)`
          }}
        >
          <p className="text-lg font-extralight text-gray-400 mb-8 tracking-wide">
            Connect with me
          </p>

          <div className="relative max-w-md mx-auto">
            {/* Email Input with Send Button - Cleaned up animations */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your email"
                className={`w-full pl-8 pr-16 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-all duration-500 text-center font-light tracking-wide hover:bg-white/90 focus:bg-white ${
                  isAnimating ? 'opacity-50' : 'opacity-100'
                }`}
                style={{
                  transform: `translateY(${Math.cos(scrollY * 0.004) * 1}px)`,
                }}
              />

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!email.trim() || isAnimating}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full transition-all duration-500 flex items-center justify-center ${
                  email.trim() && !isAnimating
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:scale-110 opacity-100'
                    : 'bg-gray-100 text-gray-300 opacity-50'
                }`}
                style={{
                  transform: `translateY(-50%) scale(${email.trim() ? 1 : 0.8}) rotate(${isAnimating ? '360deg' : '0deg'})`,
                  transition: 'all 0.5s ease'
                }}
              >
                <Send className={`w-4 h-4 transition-all duration-300 ${
                  isAnimating ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`} />

                {/* Loading animation */}
                {isAnimating && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Subtle instruction */}
          <p className="text-xs text-gray-300 mt-6 font-light tracking-widest uppercase">
            Press enter to connect
          </p>
        </div>

        {/* Artistic closing element */}
        <div
          className={`mt-16 flex justify-center transition-all duration-2000 delay-1500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        >
          <div
            className="w-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
            style={{
              transform: `scaleX(${1 + Math.cos(scrollY * 0.008) * 0.3}) translateY(${Math.sin(scrollY * 0.006) * 2}px)`
            }}
          />
        </div>
      </div>
    </footer>
  );
}