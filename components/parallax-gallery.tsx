"use client"

import { useEffect, useRef, useState } from "react"

interface ParallaxGalleryProps {
  images: string[]
  title: string
  description: string
}

export function ParallaxGallery({ images, title, description }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollY = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const scrollProgress = Math.max(0, -rect.top / (rect.height - window.innerHeight))
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
    <div ref={containerRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-stone-900">
        <div className="flex h-full">
          {/* Left Content */}
          <div className="w-full lg:w-2/5 flex items-center justify-center p-8 lg:p-16 bg-stone-900 relative z-10">
            <div className="max-w-md text-white">
              <div
                style={{
                  transform: `translateY(${scrollY * -30}px)`,
                  opacity: Math.max(0.3, 1 - scrollY * 0.7),
                }}
              >
                <h2 className="text-4xl lg:text-5xl font-light tracking-wider mb-6 leading-tight">{title}</h2>
                <div className="w-16 h-px bg-white mb-6"></div>
                <p className="text-lg font-light leading-relaxed text-stone-300">{description}</p>
              </div>
            </div>
          </div>

          {/* Right Parallax Images */}
          <div className="hidden lg:block lg:w-3/5 relative overflow-hidden">
            {/* Background layer */}
            <div
              className="absolute inset-0 bg-stone-800"
              style={{
                transform: `translateY(${scrollY * 20}px)`,
              }}
            />

            {/* Image layers with different speeds */}
            {images.map((image, index) => (
              <div
                key={index}
                className="absolute inset-0"
                style={{
                  transform: `translateY(${scrollY * (40 + index * 20)}px)`,
                  opacity: Math.max(0.1, 1 - scrollY * 0.8),
                }}
              >
                <div
                  className={`absolute bg-stone-${300 + index * 100}/30 ${
                    index === 0
                      ? "top-1/4 right-1/4 w-48 h-32"
                      : index === 1
                        ? "top-1/2 right-1/3 w-32 h-48"
                        : "top-3/4 right-1/6 w-40 h-24"
                  }`}
                />
              </div>
            ))}

            {/* Floating elements */}
            <div
              className="absolute inset-0"
              style={{
                transform: `translateY(${scrollY * 100}px) rotate(${scrollY * 15}deg)`,
              }}
            >
              <div className="absolute top-1/3 right-2/3 w-4 h-32 bg-white/20"></div>
              <div className="absolute bottom-1/3 right-1/2 w-32 h-4 bg-white/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
