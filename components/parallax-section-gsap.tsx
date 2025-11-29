"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Portfolio projects data
const portfolioProjects = [
  {
    id: 1,
    title: "KOTO Villa",
    category: "Residential Architecture",
    image: "/project pages/KOTO/1.jpg",
    description: "Modern luxury villa with contemporary design elements",
  },
  {
    id: 2,
    title: "DÔTÛ Villa",
    category: "Modern Living",
    image: "/project pages/DÔTÛ VILLA/Image.png",
    description: "Sophisticated residential design with elegant interiors",
  },
  {
    id: 3,
    title: "LA CASA",
    category: "Contemporary Design",
    image: "/project pages/LA CASA/S_1 - Photo.png",
    description: "Stunning architectural masterpiece",
  },
  {
    id: 4,
    title: "JORDAN Villa",
    category: "Luxury Residence",
    image: "/project pages/JORDAN VILLA/1.1.jpg",
    description: "Premium villa with exceptional detailing",
  },
  {
    id: 5,
    title: "MINI LUX",
    category: "Compact Luxury",
    image: "/project pages/MINI LUX/1.jpg",
    description: "Efficient luxury in compact spaces",
  },
  {
    id: 6,
    title: "THE GROOVE",
    category: "Modern Architecture",
    image: "/project pages/THE GROOVE/1_1 - Photo.jpg",
    description: "Innovative design with rhythm and flow",
  },
  {
    id: 7,
    title: "Green Cross Apartments",
    category: "Multi-Unit Residential",
    image: "/project pages/GREEN CROSS APARTMENTS/1.jpg",
    description: "Sustainable apartment complex",
  },
  {
    id: 8,
    title: "Interior Design",
    category: "Luxury Interiors",
    image: "/project pages/Interior design/1.jpg",
    description: "Bespoke interior design solutions",
  },
]

export function ParallaxSectionGSAP() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate section title on scroll
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: isMobile ? 0.5 : 1,
        },
        y: isMobile ? 60 : 100,
        opacity: 0,
        ease: "power3.out",
      })

      // Animate subtitle
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 30%",
          scrub: isMobile ? 0.5 : 1,
        },
        y: isMobile ? 40 : 80,
        opacity: 0,
        ease: "power3.out",
      })

      // Animate each project card - slide in from different directions
      projectRefs.current.forEach((card, index) => {
        if (!card) return

        const isEven = index % 2 === 0
        const delay = isMobile ? 0 : index * 0.1

        // Mobile: simpler, faster animations; Desktop: more dramatic
        const mobileConfig = {
          x: 0,
          y: 80,
          opacity: 0,
          scale: 0.92,
          rotationY: 0,
        }

        const desktopConfig = {
          x: isEven ? -200 : 200,
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationY: isEven ? -15 : 15,
        }

        // Set initial state
        gsap.set(card, isMobile ? mobileConfig : desktopConfig)

        // Animate on scroll into view
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: isMobile ? "top 90%" : "top 85%",
            end: isMobile ? "top 60%" : "top 40%",
            scrub: isMobile ? 1 : 1.5,
            toggleActions: "play none none reverse",
          },
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          ease: "power3.out",
          delay: delay,
        })

        // Parallax effect on scroll (lighter on mobile)
        if (!isMobile) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
            y: -50,
            ease: "none",
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  const handleProjectClick = (projectId: number) => {
    // Navigate to project detail or open modal
    console.log(`Opening project ${projectId}`)
    // You can add navigation logic here
  }

  const handleCardTouch = (index: number) => {
    setActiveCard(index)
    // Reset after animation
    setTimeout(() => setActiveCard(null), 300)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-20 lg:py-32 bg-gradient-to-b from-stone-50 via-stone-100 to-stone-50 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-stone-900/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16 lg:mb-24">
          <div className="inline-block mb-3 md:mb-4">
            <div className="w-12 md:w-16 h-px bg-stone-900 mx-auto mb-3 md:mb-4"></div>
          </div>
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-wider text-stone-900 mb-4 md:mb-6 px-4"
          >
            OUR PORTFOLIO
          </h2>
          <p
            ref={subtitleRef}
            className="text-base md:text-lg lg:text-xl text-stone-600 font-light max-w-2xl mx-auto px-4"
          >
            Explore our collection of exceptional architectural projects
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {portfolioProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el
              }}
              onClick={() => handleProjectClick(project.id)}
              onTouchStart={() => handleCardTouch(index)}
              className={`group relative cursor-pointer will-change-transform ${
                activeCard === index ? 'scale-[0.98]' : ''
              } transition-transform duration-200`}
              style={{ perspective: "1000px" }}
            >
              {/* Project Card */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-lg bg-stone-200 shadow-lg transition-all duration-500 group-hover:shadow-2xl active:shadow-xl touch-manipulation">
                {/* Image Container */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 group-active:scale-105">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                      quality={85}
                      priority={index < 4}
                    />
                  </div>
                  
                  {/* Gradient Overlay - Always visible on mobile for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/60 to-transparent md:from-stone-900/90 md:via-stone-900/40 md:opacity-70 md:group-hover:opacity-90 transition-opacity duration-500"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  {/* Category Badge - Always visible on mobile */}
                  <div className="mb-2 md:mb-3 transform md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 md:delay-100">
                    <span className="inline-block px-3 py-1 text-xs font-light tracking-wider text-white bg-amber-500/90 md:bg-amber-500/80 backdrop-blur-sm rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Title - Always visible on mobile */}
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-2 tracking-wide transform transition-all duration-500 md:group-hover:translate-y-0 md:translate-y-4">
                    {project.title}
                  </h3>

                  {/* Description - Always visible on mobile, hidden on desktop until hover */}
                  <p className="text-sm text-white/90 md:text-white/80 font-light transform md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 md:delay-150 line-clamp-2">
                    {project.description}
                  </p>

                  {/* View More Button - Always visible on mobile */}
                  <div className="mt-3 md:mt-4 transform md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 md:delay-200">
                    <div className="inline-flex items-center text-white text-xs md:text-sm font-light tracking-wider">
                      VIEW PROJECT
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 border-2 border-white/0 md:group-hover:border-white/20 rounded-xl md:rounded-lg transition-all duration-500"></div>
                
                {/* Touch ripple effect for mobile */}
                <div className="absolute inset-0 bg-white/0 active:bg-white/10 md:hidden transition-colors duration-200 rounded-xl pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12 md:mt-16 lg:mt-24">
          <button className="group relative inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-stone-900 text-white font-light tracking-wider text-xs md:text-sm overflow-hidden transition-all duration-500 hover:bg-amber-500 hover:shadow-xl active:scale-95 rounded-md touch-manipulation">
            <span className="relative z-10">VIEW ALL PROJECTS</span>
            <svg
              className="w-4 md:w-5 h-4 md:h-5 ml-2 md:ml-3 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </div>
      </div>
    </section>
  )
}

