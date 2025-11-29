"use client"

import { useEffect, useRef } from "react"
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

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate section title on scroll
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        ease: "power3.out",
      })

      // Animate subtitle
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 30%",
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        ease: "power3.out",
      })

      // Animate each project card - slide in from different directions
      projectRefs.current.forEach((card, index) => {
        if (!card) return

        const isEven = index % 2 === 0
        const delay = index * 0.1

        // Set initial state
        gsap.set(card, {
          x: isEven ? -200 : 200,
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationY: isEven ? -15 : 15,
        })

        // Animate on scroll into view
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 40%",
            scrub: 1.5,
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

        // Parallax effect on scroll
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
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleProjectClick = (projectId: number) => {
    // Navigate to project detail or open modal
    console.log(`Opening project ${projectId}`)
    // You can add navigation logic here
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-stone-50 via-stone-100 to-stone-50 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-stone-900/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block mb-4">
            <div className="w-16 h-px bg-stone-900 mx-auto mb-4"></div>
          </div>
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl xl:text-7xl font-light tracking-wider text-stone-900 mb-6"
          >
            OUR PORTFOLIO
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg lg:text-xl text-stone-600 font-light max-w-2xl mx-auto"
          >
            Explore our collection of exceptional architectural projects
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {portfolioProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el
              }}
              onClick={() => handleProjectClick(project.id)}
              className="group relative cursor-pointer will-change-transform"
              style={{ perspective: "1000px" }}
            >
              {/* Project Card */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-200 shadow-lg transition-all duration-500 group-hover:shadow-2xl">
                {/* Image Container */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-110">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                      quality={85}
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Category Badge */}
                  <div className="mb-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <span className="inline-block px-3 py-1 text-xs font-light tracking-wider text-white bg-amber-500/80 backdrop-blur-sm rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-light text-white mb-2 tracking-wide transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/80 font-light transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                    {project.description}
                  </p>

                  {/* View More Button */}
                  <div className="mt-4 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    <div className="inline-flex items-center text-white text-sm font-light tracking-wider">
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
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-lg transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16 lg:mt-24">
          <button className="group relative inline-flex items-center px-8 py-4 bg-stone-900 text-white font-light tracking-wider text-sm overflow-hidden transition-all duration-500 hover:bg-amber-500 hover:shadow-xl">
            <span className="relative z-10">VIEW ALL PROJECTS</span>
            <svg
              className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10"
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

