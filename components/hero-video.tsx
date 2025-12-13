"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"

export function HeroVideo() {
  const [startAnimation, setStartAnimation] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [scrollOffset, setScrollOffset] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Split text into individual letters for animation
  const line1 = "WELCOME TO"
  const line2 = "ENOU"
  const subtitle = "Bespoke architecture that blends vision, craft, and timeless elegance."

  useEffect(() => {
    // Force play on mobile devices with enhanced attributes
    if (videoRef.current) {
      const video = videoRef.current
      video.muted = true
      video.setAttribute('muted', 'true')
      video.setAttribute('playsinline', 'true')
      video.setAttribute('webkit-playsinline', 'true')
      video.setAttribute('x5-playsinline', 'true')
      
      // Multiple play attempts for better success rate
      const attemptPlay = () => {
        video.play()
          .then(() => console.log("Hero video started playing"))
          .catch(error => {
            console.log("Hero video autoplay prevented:", error)
            // Retry after a short delay
            setTimeout(() => {
              video.play().catch(err => console.log("Hero video retry failed:", err))
            }, 500)
          })
      }
      
      attemptPlay()
      // Second attempt after a brief delay
      setTimeout(attemptPlay, 100)
    }

    // Start animations 3 seconds after page load
    const timer = setTimeout(() => {
      setStartAnimation(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Extra safeguard: try playing after first user interaction (for strict mobile autoplay policies)
  useEffect(() => {
    const enableAutoplay = () => {
      if (videoRef.current && videoRef.current.paused) {
        const video = videoRef.current
        video.muted = true
        video.setAttribute('muted', 'true')
        video
          .play()
          .then(() => console.log("Hero video started after user interaction"))
          .catch(err => console.log("Hero video autoplay after interaction failed:", err))
      }
    }

    // Listen for various user interaction events
    window.addEventListener('touchstart', enableAutoplay, { passive: true, once: true })
    window.addEventListener('click', enableAutoplay, { once: true })
    window.addEventListener('scroll', enableAutoplay, { passive: true, once: true })

    return () => {
      window.removeEventListener('touchstart', enableAutoplay)
      window.removeEventListener('click', enableAutoplay)
      window.removeEventListener('scroll', enableAutoplay)
    }
  }, [])

  // Handle scroll for text movement
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      
      // Only apply effect when section is in viewport
      if (sectionTop < window.innerHeight && sectionTop > -sectionHeight) {
        // Calculate scroll offset (limited range: -30px to 30px)
        const scrollProgress = -sectionTop / sectionHeight
        const maxOffset = 30 // Maximum pixels to move
        const offset = Math.max(-maxOffset, Math.min(maxOffset, scrollProgress * 60 - 30))
        setScrollOffset(offset)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate when to show buttons (after all text is done)
  useEffect(() => {
    if (startAnimation) {
      // Calculate total animation time for text
      // Line 1: 10 letters * 80ms + 500ms initial delay = 1300ms
      // Line 2: 4 letters * 100ms + 200ms gap = 600ms
      // Subtitle: word-by-word animation ~2000ms
      // Total: ~4000ms, add 500ms buffer
      const buttonTimer = setTimeout(() => {
        setShowButtons(true)
      }, 4500)

      return () => clearTimeout(buttonTimer)
    }
  }, [startAnimation])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
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
        <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
          {/* Main Title */}
          <div className="mb-6 sm:mb-8">
            {/* Decorative Line */}
            <div 
              className={`w-16 sm:w-20 h-px bg-white/60 mx-auto mb-6 sm:mb-8 transition-all duration-1000 ${
                startAnimation ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            ></div>

            {/* Line 1: WELCOME TO - Letter by letter fade with scroll reaction */}
            <div className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-wider leading-tight mb-4 sm:mb-6">
              <div 
                className="block mb-2 transition-transform duration-200 ease-out"
                style={{
                  transform: `translateY(${scrollOffset}px)`
                }}
              >
                {line1.split('').map((letter, index) => (
                  <span
                    key={`line1-${index}`}
                    className="inline-block transition-all duration-700 ease-out"
                    style={{
                      opacity: startAnimation ? 1 : 0,
                      transform: startAnimation ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: `${500 + index * 80}ms`
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </div>

              {/* Line 2: ENOU - Letter by letter fade with gradient and scroll reaction */}
              <div 
                className="block transition-transform duration-200 ease-out"
                style={{
                  transform: `translateY(${scrollOffset}px)`
                }}
              >
                {line2.split('').map((letter, index) => (
                  <span
                    key={`line2-${index}`}
                    className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent transition-all duration-700 ease-out"
                    style={{
                      opacity: startAnimation ? 1 : 0,
                      transform: startAnimation ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: `${1300 + index * 100}ms`
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            {/* Subtitle - Word by word fade */}
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white/90 tracking-wide max-w-2xl mx-auto leading-relaxed px-4">
              {subtitle.split(' ').map((word, index) => (
                <span
                  key={`subtitle-${index}`}
                  className="inline-block transition-all duration-600 ease-out mr-2"
                  style={{
                    opacity: startAnimation ? 1 : 0,
                    transform: startAnimation ? 'translateY(0)' : 'translateY(15px)',
                    transitionDelay: `${1800 + index * 100}ms`
                  }}
                >
                  {word}
                </span>
              ))}
            </p>
          </div>

          {/* CTA Buttons - Rise from bottom with smooth fade, side by side */}
          <div 
            className={`flex flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center transition-all duration-1200 ease-out ${
              showButtons ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <Link 
              href="/projects" 
              className="group relative inline-flex items-center justify-center min-w-[140px] px-4 sm:px-5 py-2.5 sm:py-3 bg-white text-stone-900 font-medium text-xs sm:text-sm tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                transitionDelay: showButtons ? '0ms' : '0ms'
              }}
            >
              <span className="relative z-10">EXPLORE PROJECTS</span>
            </Link>

            <Link 
              href="#video-showcase" 
              className="group relative inline-flex items-center justify-center min-w-[140px] px-4 sm:px-5 py-2.5 sm:py-3 border border-white/60 text-white font-medium text-xs sm:text-sm tracking-wide rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
              style={{
                transitionDelay: showButtons ? '200ms' : '0ms'
              }}
            >
              <span className="relative z-10">WATCH SHOWCASE</span>
            </Link>
          </div>

          {/* Scroll Indicator - Fades in after buttons */}
          <div 
            className={`mt-6 sm:mt-8 flex flex-col items-center transition-all duration-1000 ease-out ${
              showButtons ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{
              transitionDelay: showButtons ? '600ms' : '0ms'
            }}
          >
            <span className="text-xs tracking-widest mb-2 sm:mb-3 font-light text-white/80">SCROLL TO EXPLORE</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/40 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/90 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Fade in early */}
      <div 
        className={`absolute top-4 sm:top-8 left-4 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 border-l-2 border-t-2 border-white/30 transition-all duration-1000 ${
          startAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{ transitionDelay: '800ms' }}
      ></div>
      
      <div 
        className={`absolute top-4 sm:top-8 right-4 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 border-r-2 border-t-2 border-white/30 transition-all duration-1000 ${
          startAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{ transitionDelay: '1000ms' }}
      ></div>
      
      <div 
        className={`absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 border-l-2 border-b-2 border-white/30 transition-all duration-1000 ${
          startAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{ transitionDelay: '1200ms' }}
      ></div>
      
      <div 
        className={`absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 border-r-2 border-b-2 border-white/30 transition-all duration-1000 ${
          startAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{ transitionDelay: '1400ms' }}
      ></div>
    </section>
  )
}
