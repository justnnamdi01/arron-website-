'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export function ArchitectureStudioVideo() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Force play video on mobile
          if (videoRef.current) {
            videoRef.current.play().catch(error => {
              console.log("Video autoplay prevented:", error)
            })
          }
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Extra safeguard: try playing after first user interaction (for strict mobile autoplay policies)
  useEffect(() => {
    const enableAutoplay = () => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.muted = true
        videoRef.current
          .play()
          .catch(err => console.log("Studio video autoplay after interaction failed:", err))
      }
      window.removeEventListener('touchstart', enableAutoplay)
      window.removeEventListener('click', enableAutoplay)
    }

    window.addEventListener('touchstart', enableAutoplay, { passive: true })
    window.addEventListener('click', enableAutoplay)

    return () => {
      window.removeEventListener('touchstart', enableAutoplay)
      window.removeEventListener('click', enableAutoplay)
    }
  }, [])

  return (
    <section 
      id="showcase"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-stone-900 to-stone-800 text-white overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
        {/* Transparent dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Section Title */}
      <div className="relative z-10 text-center pt-16 pb-8">
        <div className={`transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="w-20 h-px bg-amber-400 mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-2 tracking-wider">
            PORTFOLIO SHOWCASE
          </h2>
          <h3 className="text-3xl md:text-5xl font-light bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent tracking-wider">
            ARCHITECTURE BY ENOU
          </h3>
          <p className="text-lg text-stone-300 mt-6 max-w-2xl mx-auto leading-relaxed">
            A curated selection of built works and design studies highlighting form, light, and detail.
          </p>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium tracking-wide">PREMIUM DESIGN SERVICES</span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block text-amber-400">ARCHITECTURE</span>
                <span className="block text-white">&</span>
                <span className="block text-white">DESIGN</span>
                <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  STUDIO
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl lg:text-2xl text-stone-300 leading-relaxed max-w-xl">
              Crafting exceptional spaces that blend innovative design with timeless elegance. 
              Every project tells a story of vision, precision, and architectural mastery.
            </p>

            {/* CTA Button */}
            <div className="pt-8">
              <Link href="/projects" className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25">
                <span className="relative z-10 mr-3">VIEW FULL PORTFOLIO</span>
                <svg 
                  className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">150+</div>
                <div className="text-sm text-stone-400 mt-1">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">15+</div>
                <div className="text-sm text-stone-400 mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">98%</div>
                <div className="text-sm text-stone-400 mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Video */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
          }`}>
            <div className="relative">
              {/* Video container with elegant border */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-1">
                <div className="relative overflow-hidden rounded-xl bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    className="w-full h-[70vh] object-cover"
                  >
                    <source src="/video/first (1).mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full opacity-15 animate-pulse delay-1000"></div>
              
              {/* Play button overlay (optional) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Video info badge */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">STUDIO SHOWCASE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-900 to-transparent"></div>
    </section>
  )
}
