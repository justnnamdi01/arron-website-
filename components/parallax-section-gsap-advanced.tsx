"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ParallaxSectionGSAPAdvanced() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const image1Ref = useRef<HTMLDivElement>(null)
  const image2Ref = useRef<HTMLDivElement>(null)
  const image3Ref = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement>(null)
  const gridLinesRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const headerLineRef = useRef<HTMLDivElement>(null)
  
  const [currentSection, setCurrentSection] = useState(0)
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [textContent, setTextContent] = useState({
    title: "ARCHITECTURAL\nPLANNING",
    subtitle: "Master Planning & Site Design",
    description:
      "From concept to completion, we create comprehensive architectural plans that transform your vision into detailed blueprints for extraordinary living spaces.",
  })

  const sections = [
    {
      title: "ARCHITECTURAL\nPLANNING",
      subtitle: "Master Planning & Site Design",
      description:
        "From concept to completion, we create comprehensive architectural plans that transform your vision into detailed blueprints for extraordinary living spaces.",
    },
    {
      title: "MODERN\nARCHITECTURE",
      subtitle: "Contemporary Design Excellence",
      description:
        "Our modern architectural designs blend innovative aesthetics with functional living, creating homes that are both beautiful and perfectly suited to your lifestyle.",
    },
    {
      title: "INTERIOR\nDESIGN",
      subtitle: "Luxury Living Spaces",
      description:
        "Complete interior design solutions that complement our architectural vision, creating cohesive and sophisticated living environments that inspire daily life.",
    },
  ]

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Animate header line on load
      gsap.from(headerLineRef.current, {
        width: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      })

      // Create a timeline for the entire section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".sticky-content",
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress
            const section = Math.floor(progress * 3)
            
            if (section !== currentSection && section < 3) {
              setCurrentSection(section)
              animateTextChange(section)
            }
          },
        },
      })

      // Image 1 animations with advanced effects
      tl.fromTo(image1Ref.current, 
        { opacity: 0, scale: 1, y: 0 },
        { opacity: 1, scale: 1.05, y: 10, duration: 0.2, ease: "power2.out" }
      )
      .to(image1Ref.current, {
        opacity: 1,
        scale: 1.15,
        y: 30,
        duration: 0.13,
        ease: "none",
      })
      .to(image1Ref.current, {
        opacity: 0,
        scale: 1.25,
        y: 50,
        duration: 0.17,
        ease: "power2.in",
      })

      // Image 2 animations
      tl.fromTo(
        image2Ref.current,
        { opacity: 0, scale: 0.95, y: -20 },
        {
          opacity: 1,
          scale: 1.05,
          y: 10,
          duration: 0.17,
          ease: "power2.out",
        },
        0.33
      )
      .to(image2Ref.current, {
        opacity: 1,
        scale: 1.15,
        y: 40,
        duration: 0.16,
        ease: "none",
      })
      .to(image2Ref.current, {
        opacity: 0,
        scale: 1.25,
        y: 70,
        duration: 0.17,
        ease: "power2.in",
      })

      // Image 3 animations
      tl.fromTo(
        image3Ref.current,
        { opacity: 0, scale: 0.95, y: -20 },
        {
          opacity: 1,
          scale: 1.05,
          y: 10,
          duration: 0.17,
          ease: "power2.out",
        },
        0.66
      )
      .to(image3Ref.current, {
        opacity: 1,
        scale: 1.2,
        y: 60,
        duration: 0.34,
        ease: "power1.out",
      })

      // Floating elements with rotation and scale
      gsap.to(floatingElementsRef.current?.children[0], {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
        y: 150,
        rotation: 90,
        scale: 1.5,
        opacity: 0.6,
        ease: "none",
      })

      gsap.to(floatingElementsRef.current?.children[1], {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
        y: 100,
        x: -50,
        scale: 0.8,
        opacity: 0.4,
        ease: "none",
      })

      // Grid lines with stagger
      const gridLines = gridLinesRef.current?.children
      if (gridLines) {
        gsap.to(Array.from(gridLines), {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
          y: 150,
          opacity: 0.4,
          stagger: 0.1,
          ease: "none",
        })
      }

      // Overlay gradient animation
      gsap.to(overlayRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        opacity: 0.8,
        ease: "none",
      })

      // Text parallax
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        y: 50,
        ease: "none",
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const animateTextChange = (section: number) => {
    const newContent = sections[section]
    
    // Advanced text animation with split and stagger
    const tl = gsap.timeline()
    
    // Animate out with blur effect
    tl.to([titleRef.current, subtitleRef.current, descriptionRef.current], {
      opacity: 0,
      y: -30,
      filter: "blur(10px)",
      duration: 0.4,
      stagger: 0.08,
      ease: "power3.in",
      onComplete: () => {
        setTextContent(newContent)
      },
    })
    // Animate in with clear focus
    .fromTo([titleRef.current, subtitleRef.current, descriptionRef.current], 
      { opacity: 0, y: 30, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      }
    )
    
    // Button bounce effect
    tl.fromTo(buttonRef.current,
      { scale: 0.9, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" },
      "-=0.2"
    )
  }

  // Magnetic button effect
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleButtonMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    })
    setIsHoveringButton(false)
  }

  // Indicator click animation
  const handleIndicatorClick = (index: number) => {
    setCurrentSection(index)
    animateTextChange(index)
    
    // Pulse animation on clicked indicator
    const indicators = document.querySelectorAll('.section-indicator')
    gsap.fromTo(indicators[index],
      { scale: 1 },
      { scale: 1.5, duration: 0.3, ease: "back.out(3)", yoyo: true, repeat: 1 }
    )
  }

  return (
    <div ref={containerRef} className="relative min-h-[300vh]">
      <div className="sticky-content sticky top-0 h-screen overflow-hidden">
        {/* Auto-progression indicator with animations */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`section-indicator w-3 h-3 rounded-full transition-all duration-500 cursor-pointer ${
                currentSection === index
                  ? 'bg-amber-500 scale-125 shadow-lg shadow-amber-500/50'
                  : 'bg-white/50 hover:bg-white/70 hover:scale-110'
              }`}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </div>

        {/* Constant header overlay with animated line */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="px-6 lg:px-16 pt-8">
            <div className="max-w-3xl">
              <div 
                ref={headerLineRef}
                className="w-16 h-px bg-stone-900/80 mb-4"
              ></div>
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
                  ref={titleRef}
                  className="text-4xl lg:text-6xl font-light tracking-wider text-stone-900 mb-6 leading-tight"
                >
                  {textContent.title.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      {index === 0 && <br />}
                    </span>
                  ))}
                </h1>
                <h2 
                  ref={subtitleRef}
                  className="text-xl lg:text-2xl font-light text-stone-600 mb-6 tracking-wide"
                >
                  {textContent.subtitle}
                </h2>
                <p 
                  ref={descriptionRef}
                  className="text-lg text-stone-600 font-light leading-relaxed mb-8"
                >
                  {textContent.description}
                </p>
                <Button 
                  ref={buttonRef}
                  className="bg-stone-900 hover:bg-stone-800 text-white font-light tracking-wide px-8 py-3 transition-all duration-300 relative overflow-hidden group"
                  onMouseMove={handleButtonMouseMove}
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={handleButtonMouseLeave}
                >
                  <span className="relative z-10">EXPLORE WORK</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Sequential background images */}
          <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
            {/* Image 1 - Site Planning */}
            <div
              ref={image1Ref}
              className="absolute inset-0"
              style={{
                opacity: 0,
                backgroundImage: `url('/Project 1/p1.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Image 2 - Modern Architecture */}
            <div
              ref={image2Ref}
              className="absolute inset-0"
              style={{
                opacity: 0,
                backgroundImage: `url('/Project 1/p2.png.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Image 3 - Interior Design */}
            <div
              ref={image3Ref}
              className="absolute inset-0"
              style={{
                opacity: 0,
                backgroundImage: `url('/Project 1/p3.png.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Dynamic floating elements with enhanced animations */}
            <div
              ref={floatingElementsRef}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white/20 backdrop-blur-sm rotate-45 transition-all duration-700"></div>
              <div className="absolute top-3/4 right-1/3 w-16 h-16 bg-white/25 backdrop-blur-sm rounded-full transition-all duration-700"></div>
            </div>

            {/* Architectural grid lines with stagger */}
            <div
              ref={gridLinesRef}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-1/3 right-1/2 w-1 h-32 bg-white/30"></div>
              <div className="absolute top-2/3 right-1/4 w-32 h-1 bg-white/30"></div>
              <div className="absolute top-1/6 right-1/6 w-1 h-20 bg-white/40"></div>
            </div>

            {/* Progressive overlay with animation */}
            <div 
              ref={overlayRef}
              className="absolute inset-0 bg-gradient-to-l from-transparent via-stone-50/20 to-stone-50/50"
            ></div>
          </div>
        </div>

        {/* Mobile responsive background */}
        <div className="lg:hidden absolute inset-0 -z-10">
          <div
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              backgroundImage: `url('/Project 1/p${currentSection + 1}.png${currentSection > 0 ? '.png' : ''}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-stone-50/60"></div>
        </div>
      </div>
    </div>
  )
}













