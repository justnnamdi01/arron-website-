"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
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
    images: [
      "/project pages/KOTO/1.jpg",
      "/project pages/KOTO/2.jpg",
      "/project pages/KOTO/3.jpg",
      "/project pages/KOTO/4.jpg",
    ],
    description: "Modern luxury villa with contemporary design elements",
  },
  {
    id: 2,
    title: "DÔTÛ Villa",
    category: "Modern Living",
    images: [
      "/project pages/DÔTÛ VILLA/Image.webp",
      "/project pages/DÔTÛ VILLA/8.jpg",
      "/project pages/DÔTÛ VILLA/9.jpg",
      "/project pages/DÔTÛ VILLA/IN8.jpg",
    ],
    description: "Sophisticated residential design with elegant interiors",
  },
  {
    id: 3,
    title: "LA CASA",
    category: "Contemporary Design",
    images: [
      "/project pages/LA CASA/S_1 - Photo.png",
      "/project pages/LA CASA/S_12 - Photo.png",
      "/project pages/LA CASA/S_13 - Photo.jpg",
      "/project pages/LA CASA/S_15 - Photo.jpg",
    ],
    description: "Stunning architectural masterpiece",
  },
  {
    id: 4,
    title: "JORDAN Villa",
    category: "Luxury Residence",
    images: [
      "/project pages/JORDAN VILLA/1.1.jpg",
      "/project pages/JORDAN VILLA/03.jpg",
      "/project pages/JORDAN VILLA/04.jpg",
      "/project pages/JORDAN VILLA/05.jpg",
    ],
    description: "Premium villa with exceptional detailing",
  },
  {
    id: 5,
    title: "MINI LUX",
    category: "Compact Luxury",
    images: [
      "/project pages/MINI LUX/1.jpg",
      "/project pages/MINI LUX/10.jpg",
      "/project pages/MINI LUX/12.jpg",
      "/project pages/MINI LUX/13.jpg",
    ],
    description: "Efficient luxury in compact spaces",
  },
  {
    id: 6,
    title: "THE GROOVE",
    category: "Modern Architecture",
    images: [
      "/project pages/THE GROOVE/1.2.jpg",
      "/project pages/THE GROOVE/1.3.jpg",
      "/project pages/THE GROOVE/2.jpg",
      "/project pages/THE GROOVE/3.1.jpg",
    ],
    description: "Innovative design with rhythm and flow",
  },
  {
    id: 7,
    title: "Green Cross Apartments",
    category: "Multi-Unit Residential",
    images: [
      "/project pages/GREEN CROSS APARTMENTS/1.jpg",
      "/project pages/GREEN CROSS APARTMENTS/1_31 - Photo.jpg",
      "/project pages/GREEN CROSS APARTMENTS/1_32 - Photo.jpg",
      "/project pages/GREEN CROSS APARTMENTS/1_34 - Photo.jpg",
    ],
    description: "Sustainable apartment complex",
  },
  {
    id: 8,
    title: "Interior Design",
    category: "Luxury Interiors",
    images: [
      "/project pages/Interior design/1.jpg",
      "/project pages/Interior design/2.jpg",
      "/project pages/Interior design/3.jpg",
      "/project pages/Interior design/4.jpg",
    ],
    description: "Bespoke interior design solutions",
  },
  {
    id: 9,
    title: "MINI CASA",
    category: "Compact Living",
    images: [
      "/project pages/MINI CASA/1_1 - Photo.jpg",
      "/project pages/MINI CASA/1_2 - Photo.jpg",
      "/project pages/MINI CASA/1_3 - Photo.jpg",
      "/project pages/MINI CASA/1_4 - Photo.jpg",
    ],
    description: "Thoughtfully designed compact residence",
  },
  {
    id: 10,
    title: "RODRIGUE PROJECT",
    category: "Residential Design",
    images: [
      "/project pages/RODRIGUE PROJECT/Set_12 - Photo.jpg",
      "/project pages/RODRIGUE PROJECT/Set_13 - Photo.jpg",
      "/project pages/RODRIGUE PROJECT/Set_14 - Photo.jpg",
      "/project pages/RODRIGUE PROJECT/Set_15 - Photo.jpg",
    ],
    description: "Elegant residential project with sophisticated design",
  },
  {
    id: 11,
    title: "SICA 1",
    category: "Residential Project",
    images: [
      "/project pages/SICA 1/0_1 - Photo.jpg",
      "/project pages/SICA 1/0_5 - Photo.jpg",
      "/project pages/SICA 1/1_11 - Photo.jpg",
      "/project pages/SICA 1/1_13 - Photo.jpg",
    ],
    description: "Contemporary residential design with modern amenities",
  },
  {
    id: 12,
    title: "SICA 2",
    category: "Residential Project",
    images: [
      "/project pages/SICA 2/ST_11 - Photo.jpg",
      "/project pages/SICA 2/ST_14 - Photo.jpg",
      "/project pages/SICA 2/ST_16 - Photo.jpg",
      "/project pages/SICA 2/ST_18 - Photo.jpg",
    ],
    description: "Modern residential design featuring clean lines",
  },
  {
    id: 13,
    title: "STUDIO",
    category: "Studio Space",
    images: [
      "/project pages/STUDIO/1.1.jpg",
      "/project pages/STUDIO/10.jpg",
      "/project pages/STUDIO/12.jpg",
      "/project pages/STUDIO/2.jpg",
    ],
    description: "Creative studio space designed for inspiration",
  },
  {
    id: 14,
    title: "GALLERY",
    category: "Project Gallery",
    images: [
      "/project pages/GALLERY/1_1.1 - Photo.png",
      "/project pages/GALLERY/1_3 - Photo.jpg",
      "/project pages/GALLERY/1_3 - Photo.png",
      "/project pages/GALLERY/1_6 - Photo.jpg",
    ],
    description: "Curated collection showcasing our diverse portfolio",
  },
  {
    id: 15,
    title: "OUTDOOR",
    category: "Outdoor Spaces",
    images: [
      "/project pages/OUTDOOR/08.jpg",
      "/project pages/OUTDOOR/2_1 - Photo.jpg",
      "/project pages/OUTDOOR/2_5 - Photo.jpg",
      "/project pages/OUTDOOR/A_23 - Photo.jpg",
    ],
    description: "Beautifully designed outdoor living spaces",
  },
]

export function ParallaxSectionGSAP() {
  const router = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const viewAllRef = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [activeImageIndexes, setActiveImageIndexes] = useState<number[]>(
    () => portfolioProjects.map(() => 0)
  )
  const [imageFadeStates, setImageFadeStates] = useState<boolean[]>(
    () => portfolioProjects.map(() => true)
  )

  // Map project titles to project IDs used in the projects page
  const projectTitleToIdMap: Record<string, string> = {
    "KOTO Villa": "koto",
    "DÔTÛ Villa": "dotu-villa",
    "LA CASA": "la-casa",
    "JORDAN Villa": "jordan-villa",
    "MINI LUX": "mini-lux",
    "THE GROOVE": "the-groove",
    "Green Cross Apartments": "green-cross-apartments",
    "Interior Design": "interior-design",
    "MINI CASA": "mini-casa",
    "RODRIGUE PROJECT": "rodrigue-project",
    "SICA 1": "sica-1",
    "SICA 2": "sica-2",
    "STUDIO": "studio",
    "GALLERY": "gallery",
    "OUTDOOR": "outdoor",
  }

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

      // Animate each project card - staggered grid reveal
      projectRefs.current.forEach((card, index) => {
        if (!card) return

        // Calculate position in 4x4 grid
        const row = Math.floor(index / 4)
        const col = index % 4
        
        // Stagger delay based on position (diagonal wave effect)
        const staggerDelay = (row + col) * 0.15

        // Set initial state - fade and scale
        gsap.set(card, {
          opacity: 0,
          scale: 0.85,
          y: 40,
        })

        // Animate on scroll into view with stagger
        gsap.to(card, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: staggerDelay,
          ease: "power3.out",
        })
      })

      // Animate "View All Projects" button when it comes into view
      if (viewAllRef.current) {
        gsap.from(viewAllRef.current, {
          scrollTrigger: {
            trigger: viewAllRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  // Cycle project images in a domino pattern with smooth fade
  useEffect(() => {
    let currentCard = 0
    const timeouts: number[] = []

    const intervalId = window.setInterval(() => {
      const index = currentCard
      const images = portfolioProjects[index].images
      if (!images || images.length <= 1) {
        currentCard = (currentCard + 1) % portfolioProjects.length
        return
      }

      // Start fade out for this card
      setImageFadeStates((prev) => {
        const next = [...prev]
        next[index] = false
        return next
      })

      // After fade-out, change image and fade back in
      const timeoutId = window.setTimeout(() => {
        setActiveImageIndexes((prev) => {
          const next = [...prev]
          const currentIndex = next[index] ?? 0
          next[index] = (currentIndex + 1) % images.length
          return next
        })

        setImageFadeStates((prev) => {
          const next = [...prev]
          next[index] = true
          return next
        })
      }, 700) // half of fade duration for smoother crossfeel

      timeouts.push(timeoutId)
      currentCard = (currentCard + 1) % portfolioProjects.length
    }, 3500) // 3.5s between cards for domino effect

    return () => {
      window.clearInterval(intervalId)
      timeouts.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  const handleProjectClick = (projectId: number) => {
    const project = portfolioProjects.find(p => p.id === projectId)
    if (project) {
      const projectPageId = projectTitleToIdMap[project.title]
      if (projectPageId) {
        // Navigate to projects page with the project ID as a query parameter
        router.push(`/projects?project=${projectPageId}`)
      } else {
        // Fallback: just navigate to projects page
        router.push('/projects')
      }
    }
  }

  const handleCardTouch = (index: number) => {
    setActiveCard(index)
    // Reset after animation
    setTimeout(() => setActiveCard(null), 300)
  }

  return (
    <section
      ref={sectionRef}
      id="portfolio-section"
      className="relative min-h-screen bg-gradient-to-b from-stone-50 via-stone-100 to-stone-50 overflow-hidden flex flex-col"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-stone-900/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col w-full">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16 lg:mb-24">
          <div className="inline-block mb-3 md:mb-4">
            <div className="w-12 md:w-16 h-px bg-stone-900 mx-auto mb-3 md:mb-4"></div>
          </div>
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif tracking-wide text-stone-900 mb-4 md:mb-6 px-4"
          >
            Enou&apos;s World
          </h2>
          <p
            ref={subtitleRef}
            className="text-base md:text-lg lg:text-xl text-stone-600 font-light max-w-2xl mx-auto px-4"
          >
            Explore our collection of exceptional architectural projects
          </p>
        </div>

        {/* Portfolio Grid - 4x4 Layout filling the section, flush to edges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 w-full flex-1">
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
              <div className="relative aspect-square overflow-hidden bg-stone-200 transition-all duration-500 group-hover:shadow-2xl active:shadow-xl touch-manipulation">
                {/* Image Container */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 group-active:scale-105">
                    <Image
                      src={
                        project.images[
                          (activeImageIndexes[index] ?? 0) %
                          (project.images.length || 1)
                        ]
                      }
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={`object-cover transition-opacity duration-700 ${
                        imageFadeStates[index] ? "opacity-100" : "opacity-0"
                      }`}
                      quality={85}
                      priority={index < 4}
                    />
                  </div>
                  
                  {/* Gradient Overlay - Always visible on mobile for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/60 to-transparent md:from-stone-900/90 md:via-stone-900/40 md:opacity-70 md:group-hover:opacity-90 transition-opacity duration-500"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-3 md:p-4 lg:p-6 flex flex-col items-center justify-center text-center">
                  {/* Category Badge - Hidden on mobile for cleaner grid */}
                  <div className="mb-1 hidden md:block transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <span className="inline-block px-2 py-1 text-[10px] font-light tracking-wider text-white bg-amber-500/80 backdrop-blur-sm rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Title - centered */}
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-xl font-light text-white mb-1 md:mb-2 tracking-wide">
                    {project.title}
                  </h3>

                  {/* Description - Hidden on mobile, centered on desktop */}
                  <p className="hidden md:block text-xs lg:text-sm text-white/80 font-light mt-1 max-w-xs mx-auto line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 border-2 border-white/0 md:group-hover:border-white/20 rounded-xl md:rounded-lg transition-all duration-500"></div>
                
                {/* Touch ripple effect for mobile */}
                <div className="absolute inset-0 bg-white/0 active:bg-white/10 md:hidden transition-colors duration-200 rounded-xl pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

