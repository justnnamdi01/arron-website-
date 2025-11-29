"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Project {
  id: string
  title: string
  folder: string
  images: string[]
  description: string
  category: string
}

interface ImageItem {
  src: string
  alt: string
  aspectRatio: number
}

export function ProjectGalleryGSAP() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [images, setImages] = useState<ImageItem[]>([])
  const [visibleImages, setVisibleImages] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [imageColumns, setImageColumns] = useState<ImageItem[][]>([[], [], []])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<ImageItem | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)
  const projectHeaderRef = useRef<HTMLDivElement | null>(null)
  const sidebarItemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const headerRef = useRef<HTMLDivElement | null>(null)

  // Real project data
  const mockProjects: Project[] = [
    {
      id: "koto",
      title: "KOTO",
      folder: "KOTO",
      category: "Residential Villa",
      description: "Modern luxury villa with contemporary design elements and stunning architecture",
      images: [
        "/project pages/KOTO/1.jpg",
        "/project pages/KOTO/2.jpg",
        "/project pages/KOTO/3.jpg",
        "/project pages/KOTO/4.jpg",
        "/project pages/KOTO/5.jpg",
        "/project pages/KOTO/6.jpg",
        "/project pages/KOTO/8.jpg",
        "/project pages/KOTO/9.jpg",
        "/project pages/KOTO/12.jpg",
        "/project pages/KOTO/13.jpg",
      ]
    },
    {
      id: "la-casa",
      title: "LA CASA",
      folder: "LA CASA",
      category: "Contemporary Design",
      description: "Stunning architectural masterpiece with elegant interiors and modern amenities",
      images: [
        "/project pages/LA CASA/S_1 - Photo.png",
        "/project pages/LA CASA/S_2 - Photo.jpg",
        "/project pages/LA CASA/S_12 - Photo.png",
        "/project pages/LA CASA/S_13 - Photo.jpg",
        "/project pages/LA CASA/S_14 - Photo.png",
        "/project pages/LA CASA/S_15 - Photo.jpg",
        "/project pages/LA CASA/S_18 - Photo.jpg",
        "/project pages/LA CASA/S_19 - Photo.jpg",
        "/project pages/LA CASA/S_20 - Photo.jpg",
      ]
    },
    {
      id: "dotu-villa",
      title: "DÔTÛ VILLA",
      folder: "DÔTÛ VILLA",
      category: "Modern Living",
      description: "Sophisticated residential design with elegant interiors and contemporary features",
      images: [
        "/project pages/DÔTÛ VILLA/Image.png",
        "/project pages/DÔTÛ VILLA/8.jpg",
        "/project pages/DÔTÛ VILLA/9.jpg",
        "/project pages/DÔTÛ VILLA/IN7.1.jpg",
        "/project pages/DÔTÛ VILLA/IN7.2.jpg",
        "/project pages/DÔTÛ VILLA/IN8.jpg",
        "/project pages/DÔTÛ VILLA/IN10.jpg",
        "/project pages/DÔTÛ VILLA/IN10.2.jpg",
        "/project pages/DÔTÛ VILLA/IN11.jpg",
      ]
    },
    {
      id: "jordan-villa",
      title: "JORDAN VILLA",
      folder: "JORDAN VILLA",
      category: "Luxury Residence",
      description: "Premium villa with exceptional detailing and high-end finishes",
      images: [
        "/project pages/JORDAN VILLA/1.1.jpg",
        "/project pages/JORDAN VILLA/2.jpg",
        "/project pages/JORDAN VILLA/3.1.jpg",
        "/project pages/JORDAN VILLA/03.jpg",
        "/project pages/JORDAN VILLA/04.jpg",
        "/project pages/JORDAN VILLA/05.jpg",
        "/project pages/JORDAN VILLA/08.jpg",
        "/project pages/JORDAN VILLA/5.1.jpg",
        "/project pages/JORDAN VILLA/8.jpg",
      ]
    },
    {
      id: "mini-lux",
      title: "MINI LUX",
      folder: "MINI LUX",
      category: "Compact Luxury",
      description: "Efficient luxury in compact spaces with smart design solutions",
      images: [
        "/project pages/MINI LUX/1.jpg",
        "/project pages/MINI LUX/3.png",
        "/project pages/MINI LUX/8.jpg",
        "/project pages/MINI LUX/10.jpg",
        "/project pages/MINI LUX/11.jpg",
        "/project pages/MINI LUX/12.jpg",
        "/project pages/MINI LUX/13.jpg",
        "/project pages/MINI LUX/20.jpg",
      ]
    },
    {
      id: "the-groove",
      title: "THE GROOVE",
      folder: "THE GROOVE",
      category: "Modern Architecture",
      description: "Innovative design with rhythm and flow throughout the space",
      images: [
        "/project pages/THE GROOVE/1.2.jpg",
        "/project pages/THE GROOVE/1.3.jpg",
        "/project pages/THE GROOVE/2.jpg",
        "/project pages/THE GROOVE/3.1.jpg",
        "/project pages/THE GROOVE/5.1.jpg",
        "/project pages/THE GROOVE/N2.jpg",
      ]
    },
  ]

  // GSAP Animations
  useEffect(() => {
    if (!headerRef.current) return

    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Animate sidebar items
      sidebarItemRefs.current.forEach((item, index) => {
        if (!item) return

        gsap.from(item, {
          x: -100,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out",
        })
      })

      // Animate project header
      if (projectHeaderRef.current) {
        gsap.from(projectHeaderRef.current, {
          scrollTrigger: {
            trigger: projectHeaderRef.current,
            start: "top 80%",
          },
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power3.out",
        })
      }
    }, headerRef)

    return () => ctx.revert()
  }, [selectedProject])

  // Animate images with GSAP
  useEffect(() => {
    imageRefs.current.forEach((imageRef, index) => {
      if (!imageRef) return

      gsap.from(imageRef, {
        scrollTrigger: {
          trigger: imageRef,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 80,
        opacity: 0,
        scale: 0.8,
        rotation: (index % 2 === 0 ? -5 : 5),
        duration: 0.8,
        delay: (index % 3) * 0.1,
        ease: "power3.out",
      })

      // Parallax on scroll
      gsap.to(imageRef, {
        scrollTrigger: {
          trigger: imageRef,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -40,
        ease: "none",
      })
    })
  }, [images])

  const generateImageData = useCallback((imagePaths: string[]): ImageItem[] => {
    return imagePaths.map((path, index) => ({
      src: path,
      alt: `${selectedProject?.title || 'Project'} Image ${index + 1}`,
      aspectRatio: 0.65 + Math.random() * 0.7
    }))
  }, [selectedProject])

  const distributeImagesIntoColumns = useCallback((imageList: ImageItem[]) => {
    const columns: ImageItem[][] = [[], [], []]
    const columnHeights = [0, 0, 0]

    imageList.forEach((image) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      columns[shortestColumnIndex].push(image)
      columnHeights[shortestColumnIndex] += 1 / image.aspectRatio
    })

    setImageColumns(columns)
  }, [])

  useEffect(() => {
    setProjects(mockProjects)
    if (mockProjects.length > 0) {
      setSelectedProject(mockProjects[0])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (selectedProject) {
      const imageData = generateImageData(selectedProject.images)
      setImages(imageData)
      distributeImagesIntoColumns(imageData)
      setVisibleImages([])
      imageRefs.current = []
    }
  }, [selectedProject, generateImageData, distributeImagesIntoColumns])

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setIsMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openLightbox = (image: ImageItem, index: number) => {
    setLightboxImage(image)
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxImage(null)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % images.length
    setLightboxIndex(nextIndex)
    setLightboxImage(images[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = (lightboxIndex - 1 + images.length) % images.length
    setLightboxIndex(prevIndex)
    setLightboxImage(images[prevIndex])
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      
      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowRight':
          nextImage()
          break
        case 'ArrowLeft':
          prevImage()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [lightboxOpen, lightboxIndex, images.length])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-stone-600 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-300">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-stone-950 via-black to-stone-950 pointer-events-none"></div>

      <Header />
      
      <div className="pt-20 flex h-screen overflow-hidden relative z-10">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden fixed top-24 left-4 z-50 bg-stone-900 text-white p-3 rounded-lg shadow-2xl border border-stone-700 hover:bg-stone-800 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <div className={`fixed lg:relative lg:translate-x-0 z-40 transition-all duration-500 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:w-80 w-72 bg-stone-900/95 backdrop-blur-xl border-r border-stone-800 h-full overflow-y-auto`}>
          
          <div ref={headerRef} className="p-6 border-b border-stone-800">
            <h1 className="text-2xl font-light text-white tracking-wider">OUR PROJECTS</h1>
            <div className="w-16 h-px bg-amber-500 mt-3"></div>
          </div>

          <nav className="p-6">
            <ul className="space-y-3">
              {projects.map((project, index) => (
                <li key={project.id}>
                  <button
                    ref={(el) => {
                      sidebarItemRefs.current[index] = el
                    }}
                    onClick={() => handleProjectSelect(project)}
                    className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                      selectedProject?.id === project.id
                        ? 'bg-amber-500/20 text-white border border-amber-500/50'
                        : 'text-stone-300 hover:bg-stone-800 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="relative z-10">
                      <span className="font-medium tracking-wide text-sm block mb-1">{project.title}</span>
                      <span className="text-xs text-stone-400">{project.category}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto relative">
          {selectedProject && (
            <div className="p-6 lg:p-8">
              {/* Project Header */}
              <div ref={projectHeaderRef} className="mb-12 text-center lg:text-left">
                <h2 className="text-4xl lg:text-6xl font-light text-white mb-4 tracking-wider">
                  {selectedProject.title}
                </h2>
                <div className="w-24 h-px bg-gradient-to-r from-amber-500 to-orange-500 mx-auto lg:mx-0 mb-4"></div>
                <p className="text-stone-300 text-lg mb-2">{selectedProject.category}</p>
                <p className="text-stone-400 max-w-2xl mx-auto lg:mx-0">{selectedProject.description}</p>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {imageColumns.map((column, columnIndex) => (
                  <div key={columnIndex} className="space-y-4">
                    {column.map((image, imageIndex) => {
                      const globalIndex = columnIndex * Math.ceil(images.length / 3) + imageIndex
                      return (
                        <div
                          key={globalIndex}
                          ref={(el) => { imageRefs.current[globalIndex] = el }}
                          className="group relative overflow-hidden rounded-xl border border-stone-800 hover:border-amber-500/50 transition-all duration-500 cursor-pointer"
                          style={{ perspective: "1000px" }}
                          onClick={() => openLightbox(image, globalIndex)}
                        >
                          <div 
                            className="relative w-full bg-stone-900"
                            style={{ aspectRatio: image.aspectRatio }}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-all duration-700 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                            
                            {/* Hover icon */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && lightboxImage && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center backdrop-blur-sm">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="relative max-w-6xl max-h-[85vh] w-full h-full">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-lg inline-block border border-stone-800">
                <p className="text-sm font-medium">{lightboxImage.alt}</p>
                <p className="text-xs opacity-75">
                  {lightboxIndex + 1} of {images.length}
                </p>
              </div>
            </div>

            <div 
              className="absolute inset-0 -z-10"
              onClick={closeLightbox}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

