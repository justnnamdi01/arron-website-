"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [autoScrollY, setAutoScrollY] = useState(0)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const [currentAutoSection, setCurrentAutoSection] = useState(0)
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-progression timer
  useEffect(() => {
    if (isUserScrolling) return

    const interval = setInterval(() => {
      setCurrentAutoSection((prev) => {
        const next = (prev + 1) % 3 // Cycle through 0, 1, 2
        // Convert section index to scroll progress (0-1)
        const targetScrollY = (next + 1) / 3
        setAutoScrollY(targetScrollY)
        return next
      })
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [isUserScrolling])

  // Smooth auto-scroll transition
  useEffect(() => {
    if (isUserScrolling) return

    const targetScrollY = (currentAutoSection + 1) / 3
    let startTime: number
    const duration = 1500 // 1.5 seconds transition

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth transition
      const easeInOutCubic = (t: number) => 
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

      const easedProgress = easeInOutCubic(progress)
      const currentScrollY = autoScrollY + (targetScrollY - autoScrollY) * easedProgress
      
      setAutoScrollY(currentScrollY)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [currentAutoSection, isUserScrolling])

  useEffect(() => {
    let ticking = false

    const updateScrollY = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
        
        // When user scrolls, use scroll-based position
        if (Math.abs(scrollProgress - scrollY) > 0.01) {
          setScrollY(scrollProgress)
          setIsUserScrolling(true)
          
          // Clear existing timeout
          if (userScrollTimeoutRef.current) {
            clearTimeout(userScrollTimeoutRef.current)
          }
          
          // Resume auto-scroll after 3 seconds of no scrolling
          userScrollTimeoutRef.current = setTimeout(() => {
            setIsUserScrolling(false)
            // Sync auto section with current scroll position
            const section = Math.floor(scrollProgress * 3)
            setCurrentAutoSection(section)
            setAutoScrollY(scrollProgress)
          }, 3000)
        }
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollY)
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    updateScrollY() // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current)
      }
    }
  }, [scrollY])

  // Use either user scroll or auto scroll
  const effectiveScrollY = isUserScrolling ? scrollY : autoScrollY

  // Calculate which image should be visible and transition opacity
  const getImageOpacity = (imageIndex: number) => {
    const sectionSize = 1 / 3 // Three images, so each takes 33.33% of scroll
    const currentSection = effectiveScrollY / sectionSize

    if (imageIndex === 0) {
      // First image: visible from 0 to 0.33, fades out from 0.25 to 0.5
      if (effectiveScrollY <= 0.25) return 1
      if (effectiveScrollY <= 0.5) return Math.max(0, 1 - (effectiveScrollY - 0.25) * 4)
      return 0
    } else if (imageIndex === 1) {
      // Second image: fades in from 0.25 to 0.5, visible until 0.75, fades out until 1.0
      if (effectiveScrollY <= 0.25) return 0
      if (effectiveScrollY <= 0.5) return Math.min(1, (effectiveScrollY - 0.25) * 4)
      if (effectiveScrollY <= 0.75) return 1
      return Math.max(0, 1 - (effectiveScrollY - 0.75) * 4)
    } else {
      // Third image: fades in from 0.75 to 1.0
      if (effectiveScrollY <= 0.75) return 0
      return Math.min(1, (effectiveScrollY - 0.75) * 4)
    }
  }

  // Calculate text content based on scroll position
  const getTextContent = () => {
    if (effectiveScrollY <= 0.33) {
      return {
        title: "ARCHITECTURAL\nPLANNING",
        subtitle: "Master Planning & Site Design",
        description:
          "From concept to completion, we create comprehensive architectural plans that transform your vision into detailed blueprints for extraordinary living spaces.",
      }
    } else if (effectiveScrollY <= 0.66) {
      return {
        title: "MODERN\nARCHITECTURE",
        subtitle: "Contemporary Design Excellence",
        description:
          "Our modern architectural designs blend innovative aesthetics with functional living, creating homes that are both beautiful and perfectly suited to your lifestyle.",
      }
    } else {
      return {
        title: "INTERIOR\nDESIGN",
        subtitle: "Luxury Living Spaces",
        description:
          "Complete interior design solutions that complement our architectural vision, creating cohesive and sophisticated living environments that inspire daily life.",
      }
    }
  }

  const textContent = getTextContent()

  return (
    <div ref={containerRef} className="relative min-h-[300vh] pt-20">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Auto-progression indicator */}
        {!isUserScrolling && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  currentAutoSection === index
                    ? 'bg-amber-500 scale-125'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Scroll indicator when user is scrolling */}
        {isUserScrolling && (
          <div className="absolute top-4 right-6 z-30 text-xs text-stone-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
            Scroll to explore • Auto-play in 3s
          </div>
        )}
        {/* Constant header overlay */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="px-6 lg:px-16 pt-8">
            <div className="max-w-3xl">
              <div className="w-16 h-px bg-stone-900/80 mb-4"></div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wider text-stone-900/95">
                  What we Offer at ENOU
              </h2>
            </div>
          </div>
        </div>
        <div className="flex h-full">
          {/* Left side - Dynamic text content */}
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-stone-50 relative z-10">
            <div className="max-w-lg px-8 lg:px-16">
              <div className="mb-8">
                <div className="w-16 h-px bg-stone-900 mb-6"></div>
                <h1
                  className="text-4xl lg:text-6xl font-light tracking-wider text-stone-900 mb-6 leading-tight transition-all duration-700 ease-out"
                  style={{
                    transform: `translateY(${Math.sin(effectiveScrollY * Math.PI) * 10}px)`,
                    opacity: 0.8 + Math.sin(effectiveScrollY * Math.PI * 2) * 0.2,
                  }}
                >
                  {textContent.title.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      {index === 0 && <br />}
                    </span>
                  ))}
                </h1>
                <h2 className="text-xl lg:text-2xl font-light text-stone-600 mb-6 tracking-wide transition-all duration-700 ease-out">
                  {textContent.subtitle}
                </h2>
                <p className="text-lg text-stone-600 font-light leading-relaxed mb-8 transition-all duration-700 ease-out">
                  {textContent.description}
                </p>
                <Button className="bg-stone-900 hover:bg-stone-800 text-white font-light tracking-wide px-8 py-3 transition-all duration-300">
                  EXPLORE WORK
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Sequential background images */}
          <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
            {/* Image 1 - Site Planning */}
            <div
              className="absolute inset-0 transition-opacity duration-1000 ease-out"
              style={{
                opacity: getImageOpacity(0),
                transform: `translateY(${effectiveScrollY * 20}px) scale(${1 + effectiveScrollY * 0.1})`,
                backgroundImage: `url('/Project 1/p1.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Image 2 - Modern Architecture */}
            <div
              className="absolute inset-0 transition-opacity duration-1000 ease-out"
              style={{
                opacity: getImageOpacity(1),
                transform: `translateY(${(effectiveScrollY - 0.33) * 30}px) scale(${1 + (effectiveScrollY - 0.33) * 0.1})`,
                backgroundImage: `url('/Project 1/p2.png.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Image 3 - Interior Design */}
            <div
              className="absolute inset-0 transition-opacity duration-1000 ease-out"
              style={{
                opacity: getImageOpacity(2),
                transform: `translateY(${(effectiveScrollY - 0.66) * 40}px) scale(${1 + (effectiveScrollY - 0.66) * 0.1})`,
                backgroundImage: `url('/Project 1/p3.png.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Dynamic floating elements that change with each image */}
            <div
              className="absolute inset-0 transition-all duration-1000 ease-out"
              style={{
                transform: `translateY(${effectiveScrollY * 60}px) rotate(${effectiveScrollY * 15}deg)`,
                opacity: 0.3 + Math.sin(effectiveScrollY * Math.PI * 3) * 0.2,
              }}
            >
              <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white/20 backdrop-blur-sm rotate-45 transition-all duration-1000"></div>
              <div className="absolute top-3/4 right-1/3 w-16 h-16 bg-white/25 backdrop-blur-sm rounded-full transition-all duration-1000"></div>
            </div>

            {/* Architectural grid lines */}
            <div
              className="absolute inset-0"
              style={{
                transform: `translateY(${effectiveScrollY * 80}px)`,
                opacity: 0.1 + effectiveScrollY * 0.2,
              }}
            >
              <div className="absolute top-1/3 right-1/2 w-1 h-32 bg-white/30"></div>
              <div className="absolute top-2/3 right-1/4 w-32 h-1 bg-white/30"></div>
              <div className="absolute top-1/6 right-1/6 w-1 h-20 bg-white/40"></div>
            </div>

            {/* Progressive overlay for depth and readability */}
            <div
              className="absolute inset-0 transition-all duration-1000 ease-out"
              style={{
                background: `linear-gradient(to left, transparent, rgba(245, 245, 244, ${0.1 + effectiveScrollY * 0.3}), rgba(245, 245, 244, ${0.4 + effectiveScrollY * 0.2}))`,
              }}
            ></div>
          </div>
        </div>

        {/* Mobile responsive background */}
        <div className="lg:hidden absolute inset-0 -z-10">
          {/* Mobile Image 1 */}
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{
              opacity: getImageOpacity(0),
              transform: `translateY(${effectiveScrollY * 30}px)`,
              backgroundImage: `url('/Project 1/p1.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Mobile Image 2 */}
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{
              opacity: getImageOpacity(1),
              transform: `translateY(${effectiveScrollY * 40}px)`,
              backgroundImage: `url('/Project 1/p2.png.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Mobile Image 3 */}
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{
              opacity: getImageOpacity(2),
              transform: `translateY(${effectiveScrollY * 50}px)`,
              backgroundImage: `url('/Project 1/p3.png.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Mobile overlay */}
          <div className="absolute inset-0 bg-stone-50/60"></div>
        </div>
      </div>
    </div>
  )
}
