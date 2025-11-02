"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function HeroVideo() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          preload="auto"
        >
          <source src="/video/first (2).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className={`text-center text-white max-w-4xl mx-auto px-4 sm:px-6 transform transition-all duration-1500 delay-500 ${
          isMounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Main Title */}
          <div className="mb-6 sm:mb-8">
            <div className="w-16 sm:w-20 h-px bg-white/60 mx-auto mb-6 sm:mb-8"></div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-wider leading-tight mb-4 sm:mb-6">
              <span className="block">WELCOME TO</span>
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">ENOU</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white/90 tracking-wide max-w-2xl mx-auto leading-relaxed px-4">
              Bespoke architecture that blends vision, craft, and timeless elegance.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center transform transition-all duration-1000 delay-1000 ${
            isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <Link href="/projects" className="group relative inline-flex items-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-stone-900 font-medium text-sm tracking-wide rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <span className="relative z-10 mr-3">EXPLORE PROJECTS</span>
              <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link href="#video-showcase" className="group relative inline-flex items-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/50 text-white font-medium text-sm tracking-wide rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <span className="mr-3">WATCH SHOWCASE</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </Link>

            {/* Indicator moved below buttons */}
          </div>

          <div className={`mt-6 sm:mt-8 flex flex-col items-center transform transition-all duration-1000 delay-1200 ${
            isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <span className="text-xs tracking-widest mb-2 sm:mb-3 font-light text-white/80">SCROLL TO EXPLORE</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/40 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/90 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-4 sm:top-8 left-4 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 border-l-2 border-t-2 border-white/30 transition-all duration-1000 delay-700 ${
        isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}></div>
      
      <div className={`absolute top-4 sm:top-8 right-4 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 border-r-2 border-t-2 border-white/30 transition-all duration-1000 delay-800 ${
        isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}></div>
      
      <div className={`absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 border-l-2 border-b-2 border-white/30 transition-all duration-1000 delay-900 ${
        isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}></div>
      
      <div className={`absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 border-r-2 border-b-2 border-white/30 transition-all duration-1000 delay-1000 ${
        isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}></div>
    </section>
  )
}
