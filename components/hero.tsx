"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Background images that change with scroll
  const backgroundImages = [
    "/portfolio/13.png",
    "/portfolio/03.png", 
    "/portfolio/07.png"
  ]

  useEffect(() => {
    setIsMounted(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate which image to show based on scroll position
  const getImageIndex = () => {
    if (!isMounted) return 0
    const scrollPercent = Math.min(scrollY / (window.innerHeight * 2), 1)
    return Math.floor(scrollPercent * backgroundImages.length)
  }

  const currentImageIndex = getImageIndex()
  const scrollProgress = isMounted ? Math.min(scrollY / (window.innerHeight * 2), 1) : 0

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Scroll-based Transitions */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: isMounted ? (index === currentImageIndex ? 1 : index === currentImageIndex - 1 ? 0.3 : 0) : (index === 0 ? 1 : 0)
            }}
          >
            <Image
              src={image}
              alt={`Architecture background ${index + 1}`}
              fill
              className="object-cover"
              style={{
                transform: isMounted ? `scale(${1 + scrollProgress * 0.1}) translateY(${scrollProgress * 20}px)` : 'scale(1) translateY(0px)'
              }}
              priority={index === 0}
            />
            {/* Overlay for text readability */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"
              style={{
                opacity: isMounted ? 0.6 + Math.sin(scrollProgress * Math.PI) * 0.2 : 0.6
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Parallax decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Moving geometric shapes */}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rotate-45 transition-all duration-1000"
          style={{
            transform: isMounted ? `translateY(${scrollProgress * -50}px) rotate(${45 + scrollProgress * 20}deg)` : 'translateY(0px) rotate(45deg)',
            opacity: 0.3 - scrollProgress * 0.2
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/10 rounded-full transition-all duration-1000"
          style={{
            transform: isMounted ? `translateY(${scrollProgress * 30}px) scale(${1 + scrollProgress * 0.5})` : 'translateY(0px) scale(1)',
            opacity: 0.4 - scrollProgress * 0.3
          }}
        ></div>

        {/* Floating particles */}
        {isMounted && Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-white/20 rounded-full transition-all duration-1000"
            style={{
              width: `${3 + (i % 2)}px`,
              height: `${3 + (i % 2)}px`,
              left: `${20 + (i * 15) % 60}%`,
              top: `${30 + (i * 20) % 40}%`,
              transform: `
                translateY(${Math.sin(scrollProgress * Math.PI * 2 + i) * 30}px)
                translateX(${Math.cos(scrollProgress * Math.PI * 1.5 + i) * 20}px)
                scale(${1 + Math.sin(scrollProgress * Math.PI * 3 + i) * 0.5})
              `,
              opacity: 0.3 + Math.sin(scrollProgress * Math.PI * 2 + i) * 0.2
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-white mb-8 transition-all duration-700"
            style={{
              transform: isMounted ? `translateY(${scrollProgress * -30}px)` : 'translateY(0px)',
              opacity: Math.max(0.3, 1 - scrollProgress * 0.8)
            }}
          >
            ARCHITECTURE
            <br />& DESIGN
          </h1>

          {/* Minimalist line element with animation */}
          <div 
            className="bg-white mx-auto mb-8 transition-all duration-700"
            style={{
              width: isMounted ? `${Math.max(50, 128 - scrollProgress * 60)}px` : '128px',
              height: '1px',
              transform: isMounted ? `translateY(${scrollProgress * -20}px)` : 'translateY(0px)',
              opacity: Math.max(0.4, 1 - scrollProgress * 0.6)
            }}
          ></div>

          <p 
            className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed transition-all duration-700"
            style={{
              transform: isMounted ? `translateY(${scrollProgress * -10}px)` : 'translateY(0px)',
              opacity: Math.max(0.4, 1 - scrollProgress * 0.7)
            }}
          >
            Creating timeless spaces through thoughtful design and innovative architecture
          </p>

          {/* Scroll indicator */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 transition-all duration-500"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 2),
              transform: isMounted ? `translateX(-50%) translateY(${Math.sin(scrollProgress * Math.PI * 4) * 5}px)` : 'translateX(-50%) translateY(0px)'
            }}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm tracking-wider">SCROLL TO EXPLORE</span>
              <svg 
                className="w-5 h-5 animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-100"
          style={{ 
            width: `${scrollProgress * 100}%`,
            background: `linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) ${scrollProgress * 50}%, rgba(255,255,255,0.8) 100%)`
          }}
        ></div>
      </div>
    </section>
  )
}
