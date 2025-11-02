"use client"

import { useEffect, useRef, useState } from "react"

interface ParallaxHeroProps {
  title: string
  subtitle: string
  description: string
}

export function ParallaxHero({ title, subtitle, description }: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollY = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const scrollProgress = Math.max(0, -rect.top / window.innerHeight)
        setScrollY(scrollProgress)
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
    updateScrollY()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-[150vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid lg:grid-cols-2 h-full">
          {/* Text Content */}
          <div className="flex items-center justify-center bg-white/95 backdrop-blur-sm relative z-20 p-8 lg:p-16">
            <div className="max-w-lg">
              <div
                className="transform transition-transform duration-1000 ease-out"
                style={{
                  transform: `translateY(${scrollY * -20}px)`,
                  opacity: Math.max(0, 1 - scrollY * 0.5),
                }}
              >
                <h1 className="text-5xl lg:text-7xl font-light tracking-wider text-stone-900 mb-4 leading-none">
                  {title}
                </h1>
                <h2 className="text-2xl lg:text-3xl font-light text-stone-600 mb-6 tracking-wide">{subtitle}</h2>
                <div className="w-20 h-px bg-stone-900 mb-6"></div>
                <p className="text-lg text-stone-600 font-light leading-relaxed">{description}</p>
              </div>
            </div>
          </div>

          {/* Parallax Background */}
          <div className="relative overflow-hidden bg-stone-100">
            {/* Layer 1 - Background */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400"
              style={{
                transform: `translateY(${scrollY * 30}px) scale(${1 + scrollY * 0.1})`,
              }}
            />

            {/* Layer 2 - Geometric elements */}
            <div
              className="absolute inset-0"
              style={{
                transform: `translateY(${scrollY * 50}px) rotate(${scrollY * 5}deg)`,
              }}
            >
              <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-stone-500/20 rounded-full"></div>
              <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-stone-600/30 rotate-45"></div>
            </div>

            {/* Layer 3 - Lines and details */}
            <div
              className="absolute inset-0"
              style={{
                transform: `translateY(${scrollY * 70}px)`,
              }}
            >
              <div className="absolute top-1/2 left-1/3 w-2 h-60 bg-stone-700/40"></div>
              <div className="absolute top-2/3 right-1/3 w-60 h-2 bg-stone-700/40"></div>
            </div>

            {/* Layer 4 - Fast moving elements */}
            <div
              className="absolute inset-0"
              style={{
                transform: `translateY(${scrollY * 90}px) rotate(${scrollY * -10}deg)`,
              }}
            >
              <div className="absolute top-1/6 right-1/6 w-20 h-20 bg-stone-800/50 rotate-12"></div>
              <div className="absolute bottom-1/6 left-1/6 w-12 h-12 bg-stone-900/60 rounded-full"></div>
            </div>

            {/* Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
