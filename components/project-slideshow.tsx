"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  location: string
  year: string
  type: string
  images: string[]
}

const projects: Project[] = [
  {
    id: 3,
    title: "LUXURY RESIDENTIAL COMPLEX",
    description: "A stunning residential development that seamlessly blends modern architecture with natural landscapes. This project features innovative sustainable design elements, panoramic views, and premium amenities that redefine luxury living.",
    location: "Beverly Hills, California",
    year: "2024",
    type: "Residential Development",
    images: [
      "/Project 3/1.2.jpg",
      "/Project 3/1.3.jpg",
      "/Project 3/2 (1).jpg",
      "/Project 3/2.jpg",
      "/Project 3/3.1.jpg",
      "/Project 3/5.1.jpg",
      "/Project 3/N2.jpg",
      "/Project 3/P_3 - Photo.jpg",
      "/Project 3/P_5 - Photo.jpg",
      "/Project 3/P_9 - Photo.jpg",
      "/Project 3/SET_14 - Photo.jpg",
      "/Project 3/SET_15 - Photo.jpg",
      "/Project 3/SET_16 - Photo.jpg",
      "/Project 3/SET_17 - Photo.jpg",
      "/Project 3/SET_18 - Photo.jpg"
    ]
  },
  {
    id: 2,
    title: "CORPORATE HEADQUARTERS",
    description: "An innovative corporate campus designed to foster collaboration and creativity. The building incorporates cutting-edge technology, flexible workspaces, and sustainable practices to create an inspiring work environment for the modern workforce.",
    location: "Downtown Seattle, Washington",
    year: "2023",
    type: "Commercial Architecture",
    images: [
      "/Project 2/ST_11 - Photo.jpg",
      "/Project 2/ST_14 - Photo.jpg",
      "/Project 2/ST_16 - Photo.jpg",
      "/Project 2/ST_18 - Photo.jpg"
    ]
  },
  {
    id: 1,
    title: "SUSTAINABLE URBAN HOUSING",
    description: "A groundbreaking sustainable housing project that demonstrates the future of urban living. Featuring renewable energy systems, green building materials, and innovative space optimization techniques to maximize both comfort and environmental responsibility.",
    location: "Portland, Oregon",
    year: "2022",
    type: "Sustainable Housing",
    images: [
      "/Project 1/p1.png",
      "/Project 1/p2.png.png",
      "/Project 1/p3.png.png"
    ]
  }
]

export function ProjectSlideshow() {
  const [currentProject, setCurrentProject] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-advance through images and projects
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      const currentImages = projects[currentProject].images
      
      if (currentImageIndex >= currentImages.length - 1) {
        // All images shown for current project, flip to next project
        setIsFlipping(true)
        
        setTimeout(() => {
          setCurrentProject((prev) => (prev + 1) % projects.length)
          setCurrentImageIndex(0)
          setAnimationKey(prev => prev + 1) // Force re-render of animation
          setIsFlipping(false)
        }, 800)
      } else {
        // Move to next image in current project
        setCurrentImageIndex(prev => prev + 1)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [currentProject, currentImageIndex, isVisible])

  const currentProjectData = projects[currentProject]
  
  // Create sliding effect - duplicate images for seamless loop
  const getSlidingImages = () => {
    const images = currentProjectData.images
    // Create extended array for seamless scrolling
    const extendedImages = [...images, ...images, ...images]
    
    return extendedImages.map((src, index) => ({
      src,
      key: `${currentProject}-${animationKey}-${index}`,
      realIndex: index % images.length
    }))
  }

  const slidingImages = getSlidingImages()

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-stone-100 to-white relative overflow-hidden"
    >
      {/* Section Header */}
      <div className={`text-center py-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        <div className="w-20 h-px bg-stone-800 mx-auto mb-8"></div>
        <h2 className="text-5xl md:text-6xl font-light text-stone-900 mb-6 tracking-wider">
            Featured Projects
        </h2>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
          Signature commissions and studies from ENOU—crafted to inspire and designed to endure.

        </p>
      </div>

      {/* Main Container with Flip Effect */}
      <div className="max-w-7xl mx-auto px-6">
        <div 
          className={`transition-all duration-1600 transform-gpu ${
            isFlipping ? 'rotateY-180' : 'rotateY-0'
          }`}
          style={{ 
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {/* Image Slideshow Container */}
          <div className={`relative h-96 mb-12 overflow-hidden transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
          }`}>
            {/* Sliding Track */}
            <div 
              key={animationKey}
              className="flex space-x-2 h-full"
              style={{
                width: `${slidingImages.length * 328}px`,
                animation: `slideLeftContinuous ${slidingImages.length * 3}s linear infinite`,
                animationDelay: '0s'
              }}
            >
              {slidingImages.map(({ src, key, realIndex }) => (
                <div
                  key={key}
                  className="flex-shrink-0 w-80 h-96 relative overflow-hidden rounded-lg shadow-lg group"
                  style={{
                    border: '1px solid rgba(120, 113, 108, 0.2)'
                  }}
                >
                  <Image
                    src={src}
                    alt={`${currentProjectData.title} - Image ${realIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="320px"
                    onError={(e) => {
                      console.error(`Failed to load image: ${src}`)
                    }}
                  />
                  
                  {/* Thin separator line */}
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-white/50 z-10"></div>
                  
                  {/* Image overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Gradient Overlays for Smooth Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-stone-100 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-stone-100 to-transparent z-20 pointer-events-none"></div>
          </div>

          {/* Project Information */}
          <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            {/* Project Header */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-12 h-px bg-stone-800"></div>
                <span className="text-sm tracking-widest text-stone-500 font-medium">
                  PROJECT {currentProjectData.id.toString().padStart(2, '0')}
                </span>
                <div className="w-12 h-px bg-stone-800"></div>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-light text-stone-900 mb-6 tracking-wide">
                {currentProjectData.title}
              </h3>
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-light text-stone-800 mb-2">{currentProjectData.year}</div>
                <div className="text-sm text-stone-500 uppercase tracking-wide">Completion Year</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-light text-stone-800 mb-2">{currentProjectData.location}</div>
                <div className="text-sm text-stone-500 uppercase tracking-wide">Location</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-light text-stone-800 mb-2">{currentProjectData.type}</div>
                <div className="text-sm text-stone-500 uppercase tracking-wide">Project Type</div>
              </div>
            </div>

            {/* Project Description */}
            <p className="text-lg text-stone-700 leading-relaxed mb-8 max-w-3xl mx-auto">
              {currentProjectData.description}
            </p>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-3">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index === currentProject 
                      ? 'bg-stone-800 scale-125' 
                      : 'bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>

            {/* Current Project Progress */}
            <div className="mt-6">
              <div className="text-sm text-stone-500 mb-2">
                Image {currentImageIndex + 1} of {currentProjectData.images.length}
              </div>
              <div className="w-64 h-1 bg-stone-200 rounded-full mx-auto overflow-hidden">
                <div 
                  className="h-full bg-stone-800 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((currentImageIndex + 1) / currentProjectData.images.length) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-20 left-10 w-16 h-16 border-l-2 border-t-2 border-stone-300 transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-75'
      }`}></div>
      
      <div className={`absolute top-20 right-10 w-16 h-16 border-r-2 border-t-2 border-stone-300 transition-all duration-1000 delay-600 ${
        isVisible ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-75'
      }`}></div>

      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes slideLeftContinuous {
          0% { 
            transform: translateX(0); 
          }
          100% { 
            transform: translateX(-33.333%); 
          }
        }
        
        .rotateY-0 {
          transform: rotateY(0deg);
        }
        
        .rotateY-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}
