"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * GSAP Demo Component
 * 
 * This component demonstrates various GSAP animation techniques
 * that can be used throughout your application.
 */
export function GSAPDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const fadeInRef = useRef<HTMLDivElement>(null)
  const slideInRef = useRef<HTMLDivElement>(null)
  const scaleInRef = useRef<HTMLDivElement>(null)
  const rotateInRef = useRef<HTMLDivElement>(null)
  const staggerRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const magneticRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 1. Fade In Animation
      gsap.from(fadeInRef.current, {
        scrollTrigger: {
          trigger: fadeInRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        opacity: 0,
        y: 50,
      })

      // 2. Slide In Animation
      gsap.from(slideInRef.current, {
        scrollTrigger: {
          trigger: slideInRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        x: -100,
        opacity: 0,
      })

      // 3. Scale In Animation
      gsap.from(scaleInRef.current, {
        scrollTrigger: {
          trigger: scaleInRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        scale: 0.5,
        opacity: 0,
      })

      // 4. Rotate In Animation
      gsap.from(rotateInRef.current, {
        scrollTrigger: {
          trigger: rotateInRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        rotation: 180,
        opacity: 0,
      })

      // 5. Stagger Animation
      const staggerItems = staggerRef.current?.querySelectorAll('.stagger-item')
      gsap.from(staggerItems, {
        scrollTrigger: {
          trigger: staggerRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
      })

      // 6. Parallax Effect
      gsap.to(parallaxRef.current, {
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -100,
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Magnetic Effect
  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magneticRef.current) return
    
    const rect = magneticRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(magneticRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMagneticLeave = () => {
    gsap.to(magneticRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    })
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-light text-stone-900 mb-4 text-center">
          GSAP Animation Showcase
        </h1>
        <p className="text-xl text-stone-600 text-center mb-20">
          Scroll down to see various animation techniques
        </p>

        <div className="space-y-32">
          {/* 1. Fade In */}
          <div ref={fadeInRef} className="bg-white p-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-light text-stone-900 mb-4">
              1. Fade In Animation
            </h2>
            <p className="text-lg text-stone-600">
              Elements fade in smoothly as you scroll. Perfect for revealing content gradually.
            </p>
            <code className="block mt-4 bg-stone-100 p-4 rounded text-sm">
              gsap.from(element, {`{ opacity: 0, y: 50, scrollTrigger: {...} }`})
            </code>
          </div>

          {/* 2. Slide In */}
          <div ref={slideInRef} className="bg-white p-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-light text-stone-900 mb-4">
              2. Slide In Animation
            </h2>
            <p className="text-lg text-stone-600">
              Content slides in from the left. Great for side panels and cards.
            </p>
            <code className="block mt-4 bg-stone-100 p-4 rounded text-sm">
              gsap.from(element, {`{ x: -100, opacity: 0, scrollTrigger: {...} }`})
            </code>
          </div>

          {/* 3. Scale In */}
          <div ref={scaleInRef} className="bg-white p-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-light text-stone-900 mb-4">
              3. Scale In Animation
            </h2>
            <p className="text-lg text-stone-600">
              Elements grow from small to full size. Excellent for highlighting important content.
            </p>
            <code className="block mt-4 bg-stone-100 p-4 rounded text-sm">
              gsap.from(element, {`{ scale: 0.5, opacity: 0, scrollTrigger: {...} }`})
            </code>
          </div>

          {/* 4. Rotate In */}
          <div ref={rotateInRef} className="bg-white p-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-light text-stone-900 mb-4">
              4. Rotate In Animation
            </h2>
            <p className="text-lg text-stone-600">
              Content rotates into view. Perfect for creative, dynamic presentations.
            </p>
            <code className="block mt-4 bg-stone-100 p-4 rounded text-sm">
              gsap.from(element, {`{ rotation: 180, opacity: 0, scrollTrigger: {...} }`})
            </code>
          </div>

          {/* 5. Stagger Animation */}
          <div ref={staggerRef} className="bg-white p-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-light text-stone-900 mb-4">
              5. Stagger Animation
            </h2>
            <p className="text-lg text-stone-600 mb-6">
              Multiple elements animate in sequence. Ideal for lists and grids.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="stagger-item bg-stone-900 text-white p-8 rounded-lg text-center text-2xl font-light"
                >
                  {i}
                </div>
              ))}
            </div>
            <code className="block mt-6 bg-stone-100 p-4 rounded text-sm">
              gsap.from(items, {`{ y: 50, opacity: 0, stagger: 0.1, scrollTrigger: {...} }`})
            </code>
          </div>

          {/* 6. Parallax Effect */}
          <div className="relative h-96 bg-stone-900 rounded-lg overflow-hidden">
            <div
              ref={parallaxRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <div className="text-center text-white">
                <h2 className="text-4xl font-light mb-4">6. Parallax Effect</h2>
                <p className="text-xl">
                  Background moves at a different speed than scroll
                </p>
              </div>
            </div>
            <code className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded text-sm">
              gsap.to(element, {`{ y: -100, scrollTrigger: { scrub: 1 } }`})
            </code>
          </div>

          {/* 7. Magnetic Effect */}
          <div className="bg-white p-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-light text-stone-900 mb-4">
              7. Magnetic Effect (Hover)
            </h2>
            <p className="text-lg text-stone-600 mb-6">
              Element follows your cursor. Perfect for interactive buttons.
            </p>
            <div className="flex justify-center">
              <div
                ref={magneticRef}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="bg-stone-900 text-white px-12 py-6 rounded-lg text-xl font-light cursor-pointer hover:bg-stone-800 transition-colors"
              >
                Hover Over Me
              </div>
            </div>
            <code className="block mt-6 bg-stone-100 p-4 rounded text-sm">
              {`gsap.to(element, { x: mouseX * 0.3, y: mouseY * 0.3, ease: "power2.out" })`}
            </code>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-12 rounded-lg text-white">
            <h2 className="text-4xl font-light mb-4">Ready to Use GSAP?</h2>
            <p className="text-xl mb-6">
              All these techniques are already implemented in your parallax section!
            </p>
            <ul className="space-y-2 text-lg">
              <li>✅ Smooth scroll animations</li>
              <li>✅ Professional easing functions</li>
              <li>✅ GPU-accelerated performance</li>
              <li>✅ Cross-browser compatibility</li>
              <li>✅ Mobile-optimized</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}













