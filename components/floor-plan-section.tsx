"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

// Floor plan images data
const floorPlanImages = [
  {
    id: 1,
    image: "/portfolio/09.png",
    alt: "Floor Plan Design 1"
  },
  {
    id: 2,
    image: "/portfolio/10.png",
    alt: "Floor Plan Design 2"
  },
  {
    id: 3,
    image: "/portfolio/11.png",
    alt: "Floor Plan Design 3"
  },
  {
    id: 4,
    image: "/portfolio/12.png",
    alt: "Floor Plan Design 4"
  }
]

export function FloorPlanSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleImages, setVisibleImages] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Trigger image animations with staggered delays
          floorPlanImages.forEach((_, index) => {
            setTimeout(() => {
              setVisibleImages(prev => [...prev, index])
            }, index * 200) // 200ms delay between each image
          })
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 py-20 overflow-hidden"
    >
      {/* Dynamic Background with Architectural Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div 
                key={i} 
                className="border border-stone-300/50 animate-pulse"
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '4s'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-amber-400/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-stone-300/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 border border-amber-500/40 rotate-12 animate-pulse"></div>
        
        {/* Blueprint-style Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprint" patternUnits="userSpaceOnUse" width="100" height="100">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1c1917" strokeWidth="1"/>
              <path d="M 20 0 L 20 100 M 40 0 L 40 100 M 60 0 L 60 100 M 80 0 L 80 100" fill="none" stroke="#1c1917" strokeWidth="0.5"/>
              <path d="M 0 20 L 100 20 M 0 40 L 100 40 M 0 60 L 100 60 M 0 80 L 100 80" fill="none" stroke="#1c1917" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint)" />
        </svg>
        
        {/* Architectural Elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-stone-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-amber-400/30 rounded-lg animate-spin" style={{ animationDuration: '15s' }}></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-l from-stone-400/30 to-amber-300/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-amber-500/20 rotate-45 animate-bounce" style={{ animationDuration: '4s' }}></div>
                  </div>
                </div>
        
        {/* Technical Drawing Lines */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-stone-400/30 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/4 left-1/4 w-1/2 h-px bg-gradient-to-r from-amber-500/40 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-1/2 h-px bg-gradient-to-l from-stone-500/40 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
              </div>
        
        {/* Compass Rose */}
        <div className="absolute top-20 right-20 w-16 h-16 opacity-20">
          <svg viewBox="0 0 64 64" className="w-full h-full animate-spin" style={{ animationDuration: '30s' }}>
            <circle cx="32" cy="32" r="30" fill="none" stroke="#d97706" strokeWidth="1"/>
            <path d="M32 2 L36 16 L32 14 L28 16 Z" fill="#d97706"/>
            <path d="M32 62 L28 48 L32 50 L36 48 Z" fill="#d97706"/>
            <path d="M2 32 L16 28 L14 32 L16 36 Z" fill="#d97706"/>
            <path d="M62 32 L48 36 L50 32 L48 28 Z" fill="#d97706"/>
          </svg>
                </div>
        
        {/* Measurement Indicators */}
        <div className="absolute bottom-10 left-10 opacity-10">
          <div className="flex items-center space-x-2 text-stone-600">
            <div className="w-8 h-px bg-stone-600"></div>
            <span className="text-xs font-mono">100'</span>
            <div className="w-8 h-px bg-stone-600"></div>
              </div>
            </div>
        
        <div className="absolute top-10 right-1/3 opacity-10 rotate-90">
          <div className="flex items-center space-x-2 text-stone-600">
            <div className="w-12 h-px bg-stone-600"></div>
            <span className="text-xs font-mono">75'</span>
            <div className="w-12 h-px bg-stone-600"></div>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className={`relative z-10 mb-16 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-medium text-stone-900 tracking-wider mb-4 transition-all duration-1200 ease-out delay-300 ${
              isVisible ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-8 scale-95'
            }`}>
              <span className="text-amber-600">Floor plans</span>
            </h1>
            <div className={`w-24 h-px bg-amber-600 mx-auto transition-all duration-800 ease-out delay-500 ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}></div>
          </div>
        </div>
      </div>

      {/* Floor Plan Images Grid */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop: 2x2 Grid, Mobile: 1 column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {floorPlanImages.map((plan, index) => {
              const isImageVisible = visibleImages.includes(index)
              const slideDirection = index % 2 === 0 ? 'translate-x-[-100px]' : 'translate-x-[100px]'
              
              return (
                <div 
                  key={plan.id} 
                  className={`relative group transition-all duration-1000 ease-out ${
                    isImageVisible 
                      ? 'opacity-100 transform translate-x-0 translate-y-0 scale-100' 
                      : `opacity-0 transform ${slideDirection} translate-y-8 scale-95`
                  }`}
                  style={{ 
                    transitionDelay: `${700 + (index * 200)}ms` // Start after header animation
                  }}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                    <Image
                      src={plan.image}
                      alt={plan.alt}
                      fill
                      className="object-cover transition-all duration-500"
                      priority
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Plan number indicator */}
                    <div className={`absolute top-6 left-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all duration-500 ${
                      isImageVisible 
                        ? 'opacity-80 group-hover:opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-[-20px]'
                    }`}
                    style={{ 
                      transitionDelay: `${1000 + (index * 200)}ms` // Appear after image slides in
                    }}>
                      <span className="text-sm font-medium">Plan {plan.id}</span>
                    </div>
                    
                    {/* Animated border effect */}
                    <div className={`absolute inset-0 border-2 border-amber-400/50 rounded-2xl transition-all duration-700 ${
                      isImageVisible 
                        ? 'opacity-0 scale-100' 
                        : 'opacity-100 scale-110'
                    }`}
                    style={{ 
                      transitionDelay: `${800 + (index * 200)}ms`
                    }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
