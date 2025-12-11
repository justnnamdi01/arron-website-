"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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
  const [loading, setLoading] = useState(true)
  const [imageColumns, setImageColumns] = useState<ImageItem[][]>([[], [], []])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<ImageItem | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

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
        "/project pages/KOTO/27.jpg",
        "/project pages/KOTO/28.jpg",
        "/project pages/KOTO/30.jpg",
        "/project pages/KOTO/31.jpg",
        "/project pages/KOTO/33.jpg",
        "/project pages/KOTO/36.jpg",
        "/project pages/KOTO/37.jpg",
        "/project pages/KOTO/39.jpg",
        "/project pages/KOTO/40.jpg",
        "/project pages/KOTO/43.jpg",
        "/project pages/KOTO/44.jpg",
        "/project pages/KOTO/46.jpg",
        "/project pages/KOTO/52.jpg",
        "/project pages/KOTO/55.jpg",
        "/project pages/KOTO/65.jpg",
        "/project pages/KOTO/Vue d_oiseau.png",
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
        "/project pages/DÔTÛ VILLA/Image.webp",
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
      id: "green-cross-apartments",
      title: "GREEN CROSS APARTMENTS",
      folder: "GREEN CROSS APARTMENTS",
      category: "Residential Complex",
      description: "Modern apartment complex with sustainable design and contemporary living spaces",
      images: [
        "/project pages/GREEN CROSS APARTMENTS/1.jpg",
        "/project pages/GREEN CROSS APARTMENTS/1_31 - Photo.jpg",
        "/project pages/GREEN CROSS APARTMENTS/1_32 - Photo.jpg",
        "/project pages/GREEN CROSS APARTMENTS/1_34 - Photo.jpg",
        "/project pages/GREEN CROSS APARTMENTS/1_8 - Photo.jpg",
        "/project pages/GREEN CROSS APARTMENTS/2_3 - Photo.jpg",
        "/project pages/GREEN CROSS APARTMENTS/2_7 - Photo.jpg",
        "/project pages/GREEN CROSS APARTMENTS/2_8 - Photo.jpg",
        "/project pages/GREEN CROSS APARTMENTS/2_9 - Photo.jpg",
        "/project pages/GREEN CROSS APARTMENTS/5.png",
        "/project pages/GREEN CROSS APARTMENTS/F_4 - Photo.jpg",
      ]
    },
    {
      id: "interior-design",
      title: "INTERIOR DESIGN",
      folder: "Interior design",
      category: "Luxury Interiors",
      description: "Bespoke interior design solutions with a focus on luxury finishes and spatial harmony",
      images: [
        "/project pages/Interior design/1.jpg",
        "/project pages/Interior design/2.jpg",
        "/project pages/Interior design/3.jpg",
        "/project pages/Interior design/4.jpg",
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
        "/project pages/JORDAN VILLA/10_32 - Photo.jpg",
        "/project pages/JORDAN VILLA/10_34 - Photo.jpg",
        "/project pages/JORDAN VILLA/11_36 - Photo.jpg",
        "/project pages/JORDAN VILLA/11_38 - Photo.jpg",
        "/project pages/JORDAN VILLA/8_14 - Photo.jpg",
        "/project pages/JORDAN VILLA/8_17 - Photo.jpg",
        "/project pages/JORDAN VILLA/8_20 - Photo.jpg",
      ]
    },
    {
      id: "mini-casa",
      title: "MINI CASA",
      folder: "MINI CASA",
      category: "Compact Living",
      description: "Thoughtfully designed compact residence maximizing space and functionality",
      images: [
        "/project pages/MINI CASA/1_1 - Photo.jpg",
        "/project pages/MINI CASA/1_10 - Photo.jpg",
        "/project pages/MINI CASA/1_2 - Photo.jpg",
        "/project pages/MINI CASA/1_21 - Photo.jpg",
        "/project pages/MINI CASA/1_22 - Photo.jpg",
        "/project pages/MINI CASA/1_24 - Photo.jpg",
        "/project pages/MINI CASA/1_25 - Photo.jpg",
        "/project pages/MINI CASA/1_26 - Photo.jpg",
        "/project pages/MINI CASA/1_27 - Photo.jpg",
        "/project pages/MINI CASA/1_28 - Photo.jpg",
        "/project pages/MINI CASA/1_29 - Photo.jpg",
        "/project pages/MINI CASA/1_3 - Photo.jpg",
        "/project pages/MINI CASA/1_4 - Photo.jpg",
        "/project pages/MINI CASA/1_5 - Photo.jpg",
        "/project pages/MINI CASA/1_6 - Photo.jpg",
        "/project pages/MINI CASA/1_7 - Photo.jpg",
        "/project pages/MINI CASA/1_8 - Photo.jpg",
        "/project pages/MINI CASA/1_9 - Photo.jpg",
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
        "/project pages/MINI LUX/21.jpg",
        "/project pages/MINI LUX/22.jpg",
        "/project pages/MINI LUX/View 10.jpg",
        "/project pages/MINI LUX/View 4.jpg",
        "/project pages/MINI LUX/View 5.jpg",
        "/project pages/MINI LUX/View 6.jpg",
        "/project pages/MINI LUX/View 9.jpg",
      ]
    },
    {
      id: "rodrigue-project",
      title: "RODRIGUE PROJECT",
      folder: "RODRIGUE PROJECT",
      category: "Residential Design",
      description: "Elegant residential project with sophisticated design and refined aesthetics",
      images: [
        "/project pages/RODRIGUE PROJECT/Set_12 - Photo.jpg",
        "/project pages/RODRIGUE PROJECT/Set_13 - Photo.jpg",
        "/project pages/RODRIGUE PROJECT/Set_14 - Photo.jpg",
        "/project pages/RODRIGUE PROJECT/Set_15 - Photo.jpg",
        "/project pages/RODRIGUE PROJECT/Set_16 - Photo.jpg",
        "/project pages/RODRIGUE PROJECT/Set_17 - Photo.jpg",
      ]
    },
    {
      id: "sica-1",
      title: "SICA 1",
      folder: "SICA 1",
      category: "Residential Project",
      description: "Contemporary residential design with modern amenities and elegant spaces",
      images: [
        "/project pages/SICA 1/0_1 - Photo.jpg",
        "/project pages/SICA 1/0_2 1- Photo.jpg",
        "/project pages/SICA 1/0_5 - Photo.jpg",
        "/project pages/SICA 1/0_6 - Photo.jpg",
        "/project pages/SICA 1/0_8 - Photo.jpg",
        "/project pages/SICA 1/0_9 - Photo.jpg",
        "/project pages/SICA 1/1_11 - Photo.jpg",
        "/project pages/SICA 1/1_13 - Photo.jpg",
        "/project pages/SICA 1/1_14 - Photo.jpg",
        "/project pages/SICA 1/1_15 - Photo.jpg",
        "/project pages/SICA 1/1_16 - Photo.jpg",
        "/project pages/SICA 1/1_20 - Photo.jpg",
      ]
    },
    {
      id: "sica-2",
      title: "SICA 2",
      folder: "SICA 2",
      category: "Residential Project",
      description: "Modern residential design featuring clean lines and sophisticated interiors",
      images: [
        "/project pages/SICA 2/ST_11 - Photo.jpg",
        "/project pages/SICA 2/ST_14 - Photo.jpg",
        "/project pages/SICA 2/ST_16 - Photo.jpg",
        "/project pages/SICA 2/ST_18 - Photo.jpg",
      ]
    },
    {
      id: "studio",
      title: "STUDIO",
      folder: "STUDIO",
      category: "Studio Space",
      description: "Creative studio space designed for inspiration and productivity",
      images: [
        "/project pages/STUDIO/1.1.jpg",
        "/project pages/STUDIO/10.jpg",
        "/project pages/STUDIO/12.jpg",
        "/project pages/STUDIO/2.jpg",
        "/project pages/STUDIO/5.jpg",
        "/project pages/STUDIO/9.jpg",
        "/project pages/STUDIO/Rough 6.jpg",
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
        "/project pages/THE GROOVE/2 (1).jpg",
        "/project pages/THE GROOVE/2.jpg",
        "/project pages/THE GROOVE/3.1.jpg",
        "/project pages/THE GROOVE/5.1.jpg",
        "/project pages/THE GROOVE/N2.jpg",
        "/project pages/THE GROOVE/P_3 - Photo.jpg",
        "/project pages/THE GROOVE/P_5 - Photo.jpg",
        "/project pages/THE GROOVE/P_9 - Photo.jpg",
        "/project pages/THE GROOVE/SET_14 - Photo.jpg",
        "/project pages/THE GROOVE/SET_15 - Photo.jpg",
        "/project pages/THE GROOVE/SET_16 - Photo.jpg",
        "/project pages/THE GROOVE/SET_17 - Photo.jpg",
        "/project pages/THE GROOVE/SET_18 - Photo.jpg",
      ]
    },
  ]

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
    }
  }, [selectedProject, generateImageData, distributeImagesIntoColumns])

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setIsMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToNextProject = () => {
    const currentIndex = projects.findIndex(p => p.id === selectedProject?.id)
    const nextIndex = (currentIndex + 1) % projects.length
    handleProjectSelect(projects[nextIndex])
  }

  const goToPrevProject = () => {
    const currentIndex = projects.findIndex(p => p.id === selectedProject?.id)
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length
    handleProjectSelect(projects[prevIndex])
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
      
      <div className="pt-16 md:pt-20 flex min-h-screen relative z-10">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden fixed top-16 md:top-20 left-4 z-50 bg-stone-900 text-white p-2 md:p-3 rounded-lg shadow-2xl border border-stone-700 hover:bg-stone-800 transition-all duration-300"
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

        {/* Left Sidebar - simple static list, no scroll animations */}
        <div className={`fixed top-16 md:top-20 bottom-0 lg:relative lg:top-auto lg:bottom-auto lg:translate-x-0 z-40 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:w-80 w-72 bg-stone-900/95 backdrop-blur-xl border-r border-stone-800 overflow-y-auto`}>
          
          <div className="p-6 border-b border-stone-800">
            <h1 className="text-2xl font-light text-white tracking-wider">OUR PROJECTS</h1>
            <div className="w-16 h-px bg-amber-500 mt-3"></div>
          </div>

          <nav className="p-4 md:p-6">
            <ul className="space-y-2 md:space-y-3">
              {projects.map((project) => (
                <li key={project.id}>
                  <button
                    onClick={() => handleProjectSelect(project)}
                    className={`w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl group relative overflow-hidden ${
                      selectedProject?.id === project.id
                        ? 'bg-amber-500/20 text-white border-2 border-amber-500/50 shadow-lg shadow-amber-500/20'
                        : 'text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-700 hover:border-stone-600'
                    }`}
                  >
                    {/* Active indicator bar */}
                    {selectedProject?.id === project.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                    )}
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <span className="font-medium tracking-wide text-xs md:text-sm block mb-1 truncate">{project.title}</span>
                        <span className="text-xs text-stone-400 truncate block">{project.category}</span>
                      </div>
                      
                      {/* Arrow indicator */}
                      <svg 
                        className={`w-4 h-4 ml-2 flex-shrink-0 transition-all duration-300 ${
                          selectedProject?.id === project.id 
                            ? 'text-amber-500 translate-x-0' 
                            : 'text-stone-600 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Sidebar scroll hint for long project lists */}
          <div className="sticky bottom-0 bg-gradient-to-t from-stone-900/95 to-transparent p-3 text-center text-[11px] text-stone-400">
            Scroll to see more projects
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto relative">
          {selectedProject && (
            <div className="p-6 lg:p-8">
              {/* Project Header with Navigation */}
              <div className="mb-12">
                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mb-4 md:mb-8 gap-3">
                  <button
                    onClick={goToPrevProject}
                    className="flex items-center justify-center space-x-2 px-3 py-2 md:px-4 md:py-2 bg-stone-900/80 hover:bg-stone-800 border border-stone-700 hover:border-amber-500/50 text-stone-300 hover:text-white rounded-lg transition-all duration-300 group flex-shrink-0"
                  >
                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-xs md:text-sm font-light">Previous</span>
                  </button>

                  {/* Desktop dot navigation */}
                  <div className="hidden md:flex items-center space-x-2">
                    {projects.map((project, index) => (
                      <button
                        key={project.id}
                        onClick={() => handleProjectSelect(project)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          selectedProject?.id === project.id
                            ? 'bg-amber-500 scale-125'
                            : 'bg-stone-600 hover:bg-stone-500 hover:scale-110'
                        }`}
                        title={project.title}
                      />
                    ))}
                  </div>

                  <button
                    onClick={goToNextProject}
                    className="flex items-center justify-center space-x-2 px-3 py-2 md:px-4 md:py-2 bg-stone-900/80 hover:bg-stone-800 border border-stone-700 hover:border-amber-500/50 text-stone-300 hover:text-white rounded-lg transition-all duration-300 group flex-shrink-0"
                  >
                    <span className="text-xs md:text-sm font-light">Next</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Mobile-friendly project selector */}
                <div className="mt-3 mb-2 flex md:hidden gap-2 overflow-x-auto pb-1 -mx-2 px-2">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => handleProjectSelect(project)}
                      className={`whitespace-nowrap text-xs px-3 py-1 rounded-full border ${
                        selectedProject?.id === project.id
                          ? 'bg-amber-500 text-black border-amber-500'
                          : 'bg-stone-900 text-stone-200 border-stone-700'
                      }`}
                    >
                      {project.title}
                    </button>
                  ))}
                </div>

                {/* Project Title and Info */}
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl lg:text-6xl font-light text-white mb-4 tracking-wider">
                    {selectedProject.title}
                  </h2>
                  <div className="w-24 h-px bg-gradient-to-r from-amber-500 to-orange-500 mx-auto lg:mx-0 mb-4"></div>
                  <p className="text-stone-300 text-base md:text-lg mb-2">{selectedProject.category}</p>
                  <p className="text-stone-400 text-sm md:text-base max-w-2xl mx-auto lg:mx-0">{selectedProject.description}</p>
                </div>
              </div>

              {/* Image Grid - simple, no scroll reveal animations */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                {imageColumns.map((column, columnIndex) => (
                  <div key={columnIndex} className="space-y-2 md:space-y-4">
                    {column.map((image, imageIndex) => {
                      const globalIndex = columnIndex * Math.ceil(images.length / 3) + imageIndex
                      return (
                        <div
                          key={globalIndex}
                          className="group relative overflow-hidden rounded-lg md:rounded-xl border border-stone-800 hover:border-amber-500/50 transition-all duration-500 cursor-pointer"
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

