"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface ParallaxSlide {
  id: number
  title: string
  subtitle: string
  description: string
  backgroundImage: string
  overlayColor: string
  textColor: string
}

const parallaxSlides: ParallaxSlide[] = [
  {
    id: 1,
    title: "ARCHITECTURAL VISION",
    subtitle: "Where Dreams Take Shape",
    description: "Experience the transformation of ideas into architectural masterpieces. Our design philosophy centers on creating spaces that inspire, function beautifully, and stand the test of time.",
    backgroundImage: "/portfolio/13.png",
    overlayColor: "from-stone-900/80 via-stone-900/60 to-transparent",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "INNOVATIVE DESIGN",
    subtitle: "Pushing Boundaries Forward",
    description: "We embrace cutting-edge technology and sustainable practices to create buildings that are not just structures, but living ecosystems that enhance human experience.",
    backgroundImage: "/portfolio/03.png",
    overlayColor: "from-stone-800/85 via-stone-700/65 to-transparent",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "SUSTAINABLE FUTURE",
    subtitle: "Building for Tomorrow",
    description: "Every project is an opportunity to create positive environmental impact. Our sustainable design approach ensures beauty, functionality, and responsibility converge seamlessly.",
    backgroundImage: "/portfolio/07.png",
    overlayColor: "from-stone-900/75 via-stone-800/55 to-transparent",
    textColor: "text-white"
  },
  {
    id: 4,
    title: "PRECISION CRAFTSMANSHIP",
    subtitle: "Excellence in Every Detail",
    description: "From initial concept to final construction, we maintain unwavering attention to detail. Every element is carefully considered to create spaces that exceed expectations.",
    backgroundImage: "/Project 1/S_1 - Photo.png",
    overlayColor: "from-stone-900/70 via-stone-800/50 to-transparent",
    textColor: "text-white"
  },
  {
    id: 5,
    title: "COLLABORATIVE JOURNEY",
    subtitle: "Your Vision, Our Expertise",
    description: "Great architecture is born from collaboration. We work closely with you throughout every phase, ensuring your vision becomes reality while exceeding your expectations.",
    backgroundImage: "/Project 2/ST_11 - Photo.jpg",
    overlayColor: "from-stone-900/80 via-stone-800/60 to-transparent",
    textColor: "text-white"
  }
]

export function ParallaxScrollSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !isInView || !isMounted) return

      const element = sectionRef.current
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate if section is in viewport
      const isVisible = rect.top < windowHeight && rect.bottom > 0
      
      if (!isVisible) return

      // Calculate scroll progress within the section
      const sectionHeight = element.offsetHeight
      const viewportTop = -rect.top
      
      // Calculate progress (0 to 1) based on scroll position
      const progress = Math.max(0, Math.min(1, viewportTop / (sectionHeight - windowHeight)))
      setScrollProgress(progress)

      // Determine which slide should be active
      const slideIndex = Math.floor(progress * parallaxSlides.length)
      const clampedSlide = Math.min(slideIndex, parallaxSlides.length - 1)
      
      if (clampedSlide !== currentSlide) {
        setCurrentSlide(clampedSlide)
      }
    }

    // Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [currentSlide, isInView, isMounted])

  const currentContent = parallaxSlides[currentSlide]

  // Calculate individual slide progress for smooth transitions
  const slideProgress = (scrollProgress * parallaxSlides.length) % 1
  const nextSlideIndex = Math.min(currentSlide + 1, parallaxSlides.length - 1)
  const nextContent = parallaxSlides[nextSlideIndex]

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <section 
        className="relative"
        style={{ height: `${parallaxSlides.length * 120}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={currentContent.backgroundImage}
              alt="Architecture background"
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${currentContent.overlayColor}`}></div>
          </div>
          <div className="relative z-10 h-full">
            <div className="max-w-7xl mx-auto px-6 h-full">
              <div className="grid lg:grid-cols-2 gap-12 h-full items-center">
                <div className={`space-y-8 ${currentContent.textColor}`}>
                  <div className="space-y-4">
                    <div className="w-20 h-px bg-current opacity-60"></div>
                    <h2 className="text-5xl md:text-6xl font-light leading-tight tracking-wide">
                      {currentContent.title}
                    </h2>
                    <p className="text-2xl font-light opacity-90">
                      {currentContent.subtitle}
                    </p>
                  </div>
                  <p className="text-lg leading-relaxed opacity-80 max-w-lg">
                    {currentContent.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      ref={sectionRef}
      className="relative"
      style={{ height: `${parallaxSlides.length * 120}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Background Images with Smooth Transitions */}
        <div className="absolute inset-0">
          {/* Current Background */}
          <div 
            className="absolute inset-0 transition-all duration-1000 ease-out"
            style={{
              transform: `scale(${1 + scrollProgress * 0.1}) translateY(${scrollProgress * -20}px)`,
              opacity: 1 - slideProgress * 0.3
            }}
          >
            <Image
              key={`bg-${currentSlide}`}
              src={currentContent.backgroundImage}
              alt={`Architecture ${currentSlide + 1}`}
              fill
              className="object-cover transition-all duration-1000"
              priority
            />
          </div>

          {/* Next Background for Smooth Transition */}
          {currentSlide < parallaxSlides.length - 1 && (
            <div 
              className="absolute inset-0 transition-all duration-1000 ease-out"
              style={{
                transform: `scale(${1.1 - slideProgress * 0.1}) translateY(${slideProgress * 20}px)`,
                opacity: slideProgress * 0.8
              }}
            >
              <Image
                key={`bg-next-${nextSlideIndex}`}
                src={nextContent.backgroundImage}
                alt={`Architecture ${nextSlideIndex + 1}`}
                fill
                className="object-cover transition-all duration-1000"
                priority
              />
            </div>
          )}

          {/* Dynamic Overlay with Color Transition */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r transition-all duration-1000 ${currentContent.overlayColor}`}
            style={{
              opacity: 0.9 - slideProgress * 0.2
            }}
          ></div>

          {/* Next Overlay */}
          {currentSlide < parallaxSlides.length - 1 && (
            <div 
              className={`absolute inset-0 bg-gradient-to-r transition-all duration-1000 ${nextContent.overlayColor}`}
              style={{
                opacity: slideProgress * 0.7
              }}
            ></div>
          )}

          {/* Animated Gradient Overlays */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: isMounted ? `
                radial-gradient(circle at ${30 + Math.sin(scrollProgress * Math.PI * 2) * 20}% ${40 + Math.cos(scrollProgress * Math.PI * 1.5) * 30}%, 
                rgba(255, 255, 255, 0.1) 0%, transparent 60%),
                radial-gradient(circle at ${70 + Math.cos(scrollProgress * Math.PI * 1.8) * 25}% ${60 + Math.sin(scrollProgress * Math.PI * 2.2) * 20}%, 
                rgba(0, 0, 0, 0.2) 0%, transparent 50%)
              ` : 'transparent'
            }}
          ></div>
        </div>

        {/* Content Grid */}
        <div className="relative z-10 h-full">
          <div className="max-w-7xl mx-auto px-6 h-full">
            <div className="grid lg:grid-cols-2 gap-12 h-full items-center">
              
              {/* Left Side - Text Content */}
              <div 
                className={`space-y-8 transition-all duration-1000 ${currentContent.textColor}`}
                style={{
                  transform: `translateX(${slideProgress * -30}px) translateY(${Math.sin(scrollProgress * Math.PI * 4) * 5}px)`,
                  opacity: 1 - slideProgress * 0.5
                }}
              >
                {/* Header Section */}
                <div 
                  className="space-y-4"
                  style={{
                    transform: `translateY(${slideProgress * -20}px)`,
                    opacity: 1 - slideProgress * 0.7
                  }}
                >
                  <div 
                    className="w-20 h-px bg-current transition-all duration-700"
                    style={{
                      width: `${20 + scrollProgress * 60}px`,
                      opacity: 0.6 + Math.sin(scrollProgress * Math.PI * 6) * 0.2
                    }}
                  ></div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide">
                    {currentContent.title}
                  </h2>
                  <p className="text-2xl md:text-3xl font-light opacity-90">
                    {currentContent.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p 
                  className="text-lg md:text-xl leading-relaxed opacity-80 max-w-lg transition-all duration-500"
                  style={{
                    transform: `translateY(${slideProgress * -15}px)`,
                    opacity: 0.8 - slideProgress * 0.6
                  }}
                >
                  {currentContent.description}
                </p>

                {/* Progress Indicator */}
                <div 
                  className="space-y-4"
                  style={{
                    transform: `translateY(${slideProgress * -10}px)`,
                    opacity: 0.9 - slideProgress * 0.5
                  }}
                >
                  <div className="flex justify-between text-sm opacity-70">
                    <span>Scroll Progress</span>
                    <span>{currentSlide + 1} / {parallaxSlides.length}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
                    <div 
                      className="bg-current h-1 rounded-full transition-all duration-300 relative"
                      style={{ 
                        width: `${((currentSlide + slideProgress) / parallaxSlides.length) * 100}%`
                      }}
                    >
                      {/* Animated shine effect */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full"
                        style={{
                          transform: isMounted ? `translateX(${(scrollProgress % 0.3) * 333 - 100}%)` : 'translateX(-100%)'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div 
                  className="pt-4"
                  style={{
                    transform: `translateY(${slideProgress * -8}px)`,
                    opacity: 0.9 - slideProgress * 0.4
                  }}
                >
                  <button className="group flex items-center space-x-3 text-lg font-medium hover:opacity-80 transition-all duration-300">
                    <span>Explore Our Work</span>
                    <svg 
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Side - Visual Elements */}
              <div className="relative lg:h-full min-h-[400px] flex items-center justify-center">
                
                {/* Floating Geometric Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  {isMounted && Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${20 + (i * 15) % 60}%`,
                        top: `${20 + (i * 20) % 60}%`,
                        transform: `
                          translateY(${Math.sin(scrollProgress * Math.PI * 2 + i) * 30}px)
                          translateX(${Math.cos(scrollProgress * Math.PI * 1.5 + i) * 20}px)
                          scale(${1 + Math.sin(scrollProgress * Math.PI * 3 + i) * 0.3})
                          rotate(${scrollProgress * 45 + i * 30}deg)
                        `,
                        opacity: 0.1 + Math.sin(scrollProgress * Math.PI * 4 + i) * 0.1
                      }}
                    >
                      {i % 3 === 0 && (
                        <div className="w-16 h-16 border border-white/30 rotate-45"></div>
                      )}
                      {i % 3 === 1 && (
                        <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                      )}
                      {i % 3 === 2 && (
                        <div className="w-8 h-20 bg-white/15"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Central Design Element */}
                <div 
                  className="relative w-64 h-64 md:w-80 md:h-80"
                  style={{
                    transform: `
                      scale(${1 + Math.sin(scrollProgress * Math.PI * 2) * 0.1})
                      rotate(${scrollProgress * 20}deg)
                    `
                  }}
                >
                  <div 
                    className="absolute inset-4 border-2 border-white/40 rounded-full"
                    style={{
                      transform: `rotate(${-scrollProgress * 30}deg)`
                    }}
                  ></div>
                  <div 
                    className="absolute inset-8 border border-white/30 rounded-full"
                    style={{
                      transform: `rotate(${scrollProgress * 45}deg)`
                    }}
                  ></div>
                  <div 
                    className="absolute inset-16 bg-white/10 rounded-full backdrop-blur-sm"
                    style={{
                      transform: `scale(${1 + Math.sin(scrollProgress * Math.PI * 6) * 0.2})`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {parallaxSlides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? 'bg-white scale-125 shadow-lg'
                    : index < currentSlide
                    ? 'bg-white/60'
                    : 'bg-white/30'
                }`}
                style={{
                  transform: `scale(${index === currentSlide ? 1.25 + (isMounted ? Math.sin(scrollProgress * Math.PI * 8) * 0.1 : 0) : 1})`
                }}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-20 right-8 text-white/70 z-20"
          style={{
            transform: isMounted ? `translateY(${Math.sin(scrollProgress * Math.PI * 4) * 3}px)` : 'translateY(0px)'
          }}
        >
          <div className="flex flex-col items-center space-y-2 text-sm">
            <span>Scroll</span>
            <svg 
              className="w-4 h-4 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Top Progress Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-20">
          <div 
            className="h-full bg-white transition-all duration-100"
            style={{ 
              width: `${scrollProgress * 100}%`,
              background: `linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,1) ${scrollProgress * 50}%, rgba(255,255,255,0.8) 100%)`
            }}
          ></div>
        </div>

        {/* Particle Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {isMounted && Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `
                  translateY(${Math.sin(scrollProgress * Math.PI * 2 + i * 0.5) * 50}px)
                  translateX(${Math.cos(scrollProgress * Math.PI * 1.5 + i * 0.3) * 30}px)
                `,
                opacity: 0.3 + Math.sin(scrollProgress * Math.PI * 4 + i) * 0.2,
                animation: `float ${3 + (i % 3)}s ease-in-out infinite ${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
      `}</style>
    </section>
  )
}
