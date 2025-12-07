"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Project {
  id: string
  title: string
  folder: string
  images: string[]
}

interface ImageItem {
  src: string
  alt: string
  aspectRatio: number
}

export function ProjectGallery() {
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
  const [lastVisibleImageIndex, setLastVisibleImageIndex] = useState(-1)
  const [showAutoScrollIndicator, setShowAutoScrollIndicator] = useState(false)

  // Real project data based on actual project folders
  const mockProjects: Project[] = [
    {
      id: "la-casa",
      title: "LA CASA",
      folder: "LA CASA",
      images: [
        "/project pages/LA CASA/S_1 - Photo.png",
        "/project pages/LA CASA/S_12 - Photo.png",
        "/project pages/LA CASA/S_13 - Photo.jpg",
        "/project pages/LA CASA/S_14 - Photo.png",
        "/project pages/LA CASA/S_15 - Photo.jpg",
        "/project pages/LA CASA/S_18 - Photo.jpg",
        "/project pages/LA CASA/S_19 - Photo.jpg",
        "/project pages/LA CASA/S_2 - Photo.jpg",
        "/project pages/LA CASA/S_20 - Photo.jpg",
      ]
    },
    {
      id: "dotu-villa",
      title: "DÔTÛ VILLA",
      folder: "DÔTÛ VILLA",
      images: [
        "/project pages/DÔTÛ VILLA/8.jpg",
        "/project pages/DÔTÛ VILLA/9.jpg",
        "/project pages/DÔTÛ VILLA/Image.webp",
        "/project pages/DÔTÛ VILLA/IN10.2.jpg",
        "/project pages/DÔTÛ VILLA/IN10.jpg",
        "/project pages/DÔTÛ VILLA/IN11.jpg",
        "/project pages/DÔTÛ VILLA/IN7.1.jpg",
        "/project pages/DÔTÛ VILLA/IN7.2.jpg",
        "/project pages/DÔTÛ VILLA/IN8.jpg",
      ]
    },
    {
      id: "green-cross-apartments",
      title: "GREEN CROSS APARTMENTS",
      folder: "GREEN CROSS APARTMENTS",
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
      id: "jordan-villa",
      title: "JORDAN VILLA",
      folder: "JORDAN VILLA",
      images: [
        "/project pages/JORDAN VILLA/03.jpg",
        "/project pages/JORDAN VILLA/04.jpg",
        "/project pages/JORDAN VILLA/05.jpg",
        "/project pages/JORDAN VILLA/08.jpg",
        "/project pages/JORDAN VILLA/1.1.jpg",
        "/project pages/JORDAN VILLA/10_32 - Photo.jpg",
        "/project pages/JORDAN VILLA/10_34 - Photo.jpg",
        "/project pages/JORDAN VILLA/11_36 - Photo.jpg",
        "/project pages/JORDAN VILLA/11_38 - Photo.jpg",
        "/project pages/JORDAN VILLA/2.jpg",
        "/project pages/JORDAN VILLA/3.1.jpg",
        "/project pages/JORDAN VILLA/5.1.jpg",
        "/project pages/JORDAN VILLA/8.jpg",
        "/project pages/JORDAN VILLA/8_14 - Photo.jpg",
        "/project pages/JORDAN VILLA/8_17 - Photo.jpg",
        "/project pages/JORDAN VILLA/8_20 - Photo.jpg",
      ]
    },
    {
      id: "koto",
      title: "KOTO",
      folder: "KOTO",
      images: [
        "/project pages/KOTO/1.jpg",
        "/project pages/KOTO/12.jpg",
        "/project pages/KOTO/13.jpg",
        "/project pages/KOTO/2.jpg",
        "/project pages/KOTO/27.jpg",
        "/project pages/KOTO/28.jpg",
        "/project pages/KOTO/3.jpg",
        "/project pages/KOTO/30.jpg",
        "/project pages/KOTO/31.jpg",
        "/project pages/KOTO/33.jpg",
        "/project pages/KOTO/36.jpg",
        "/project pages/KOTO/37.jpg",
        "/project pages/KOTO/39.jpg",
        "/project pages/KOTO/4.jpg",
        "/project pages/KOTO/40.jpg",
        "/project pages/KOTO/43.jpg",
        "/project pages/KOTO/44.jpg",
        "/project pages/KOTO/46.jpg",
        "/project pages/KOTO/5.jpg",
        "/project pages/KOTO/52.jpg",
        "/project pages/KOTO/55.jpg",
        "/project pages/KOTO/6.jpg",
        "/project pages/KOTO/65.jpg",
        "/project pages/KOTO/8.jpg",
        "/project pages/KOTO/9.jpg",
        "/project pages/KOTO/Vue d_oiseau.png",
      ]
    },
    {
      id: "mini-casa",
      title: "MINI CASA",
      folder: "MINI CASA",
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
      images: [
        "/project pages/MINI LUX/1.jpg",
        "/project pages/MINI LUX/10.jpg",
        "/project pages/MINI LUX/11.jpg",
        "/project pages/MINI LUX/12.jpg",
        "/project pages/MINI LUX/13.jpg",
        "/project pages/MINI LUX/20.jpg",
        "/project pages/MINI LUX/21.jpg",
        "/project pages/MINI LUX/22.jpg",
        "/project pages/MINI LUX/3.png",
        "/project pages/MINI LUX/8.jpg",
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

  // Generate random aspect ratios for Pinterest-style layout
  const generateImageData = useCallback((imagePaths: string[]): ImageItem[] => {
    return imagePaths.map((path, index) => ({
      src: path,
      alt: `${selectedProject?.title || 'Project'} Image ${index + 1}`,
      aspectRatio: 0.6 + Math.random() * 0.8 // Random aspect ratio between 0.6 and 1.4
    }))
  }, [selectedProject])

  // Distribute images into three columns for Pinterest layout
  const distributeImagesIntoColumns = useCallback((imageList: ImageItem[]) => {
    const columns: ImageItem[][] = [[], [], []]
    const columnHeights = [0, 0, 0]

    imageList.forEach((image) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      columns[shortestColumnIndex].push(image)
      columnHeights[shortestColumnIndex] += 1 / image.aspectRatio
    })

    setImageColumns(columns)
  }, [])

  // Initialize projects and set first project as default
  useEffect(() => {
    setProjects(mockProjects)
    if (mockProjects.length > 0) {
      setSelectedProject(mockProjects[0])
    }
    setLoading(false)
  }, [])

  // Update images when selected project changes
  useEffect(() => {
    if (selectedProject) {
      const imageData = generateImageData(selectedProject.images)
      setImages(imageData)
      distributeImagesIntoColumns(imageData)
      setVisibleImages([])
      imageRefs.current = []
    }
  }, [selectedProject, generateImageData, distributeImagesIntoColumns])

  // Set up intersection observer for scroll animations and auto-scroll
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleImages(prev => [...new Set([...prev, index])])
            setLastVisibleImageIndex(index)
            
            // Check if we're at the last few images and should auto-scroll to next project
            const totalImages = images.length
            const isNearEnd = index >= totalImages - 3 // Last 3 images
            const currentProjectIndex = projects.findIndex(p => p.id === selectedProject?.id)
            const hasNextProject = currentProjectIndex < projects.length - 1
            
            if (isNearEnd && hasNextProject && index === totalImages - 1) {
              // Show indicator that auto-scroll is coming
              setShowAutoScrollIndicator(true)
              
              // Delay the auto-scroll slightly to let user see the last image
              setTimeout(() => {
                const nextProject = projects[currentProjectIndex + 1]
                setSelectedProject(nextProject)
                setShowAutoScrollIndicator(false)
                // Scroll to project header smoothly
                if (projectHeaderRef.current) {
                  projectHeaderRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                  })
                }
              }, 2000) // 2 second delay to let user appreciate the last images
            }
          }
        })
      },
      {
        threshold: 0.3, // Increased threshold for better detection
        rootMargin: '0px 0px -100px 0px' // Trigger when image is more visible
      }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [images, selectedProject, projects])

  // Observe image elements
  useEffect(() => {
    if (observerRef.current) {
      imageRefs.current.forEach((ref) => {
        if (ref) {
          observerRef.current!.observe(ref)
        }
      })
    }

    return () => {
      if (observerRef.current) {
        imageRefs.current.forEach((ref) => {
          if (ref) {
            observerRef.current!.unobserve(ref)
          }
        })
      }
    }
  }, [images])

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setIsMobileMenuOpen(false)
    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openLightbox = (image: ImageItem, index: number) => {
    setLightboxImage(image)
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden' // Prevent background scroll
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

  // Handle keyboard navigation for lightbox
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
          <div className="w-12 h-12 border-4 border-gray-600 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-amber-200/20 rotate-12 animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-gray-600/20 rotate-45 animate-float-reverse"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 border border-amber-300/20 -rotate-12 animate-float-slow"></div>
        <div className="absolute bottom-20 right-40 w-16 h-16 border border-gray-500/30 rotate-30 animate-float"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full animate-grid-slide">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="border border-gray-700/30 animate-pulse" style={{
                animationDelay: `${(i * 0.1) % 5}s`,
                animationDuration: '3s'
              }}></div>
            ))}
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/20 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <Header />
      
      <div className="pt-20 flex h-screen overflow-hidden relative z-10">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden fixed top-24 left-4 z-50 bg-gray-900 text-white p-3 rounded-lg shadow-lg border border-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Left Sidebar - Project Navigation */}
        <div className={`fixed lg:relative lg:translate-x-0 z-40 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:w-80 w-72 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700 h-full overflow-y-auto scrollbar-hide shadow-xl lg:shadow-none`}>
          
          <div className="p-4 sm:p-6 border-b border-gray-700 relative">
            {/* Animated background for header */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900/30 animate-gradient-shift"></div>
            <div className="relative z-10">
              <h1 className="text-xl sm:text-2xl font-light text-white tracking-wide animate-slide-in-left">OUR PROJECTS</h1>
              <div className="w-12 sm:w-16 h-px bg-amber-600 mt-3 animate-expand-width"></div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <nav className="p-4 sm:p-6">
            <ul className="space-y-2">
              {projects.map((project, index) => (
                <li key={project.id} className="animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                  <button
                    onClick={() => handleProjectSelect(project)}
                    className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-500 group relative overflow-hidden ${
                      selectedProject?.id === project.id
                        ? 'bg-gray-800 text-white scale-105 shadow-lg border border-gray-600'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:scale-102 border border-transparent hover:border-gray-600'
                    }`}
                  >
                    {/* Animated background bar for selected item */}
                    {selectedProject?.id === project.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 animate-slide-in-right"></div>
                    )}
                    
                    {/* Hover effect background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        selectedProject?.id === project.id
                          ? 'bg-amber-500 scale-125 animate-pulse'
                          : 'bg-gray-500 group-hover:bg-amber-500 group-hover:scale-110'
                      }`}></div>
                      <span className="font-medium tracking-wide text-sm sm:text-base transition-transform duration-300 group-hover:translate-x-1">{project.title}</span>
                      
                      {/* Active indicator animation */}
                      {selectedProject?.id === project.id && (
                        <div className="flex space-x-1 ml-auto">
                          <div className="w-1 h-1 bg-amber-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      )}
                    </div>
                    <div className={`relative z-10 text-xs mt-1 ml-5 transition-all duration-500 ${
                      selectedProject?.id === project.id
                        ? 'text-gray-300'
                        : 'text-gray-500 group-hover:text-gray-400'
                    }`}>
                      {project.images.length} images
                      {selectedProject?.id === project.id && (
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse"></span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Project Stats */}
          <div className="p-4 sm:p-6 border-t border-gray-700 mt-auto relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900/30 rounded-lg p-4 relative overflow-hidden border border-gray-700">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-300/20 to-transparent animate-pulse"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-sm font-medium text-white mb-3 animate-fade-in">Portfolio Stats</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between items-center group">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Total Projects:</span>
                    <span className="font-medium text-amber-600 animate-counter">{projects.length}</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Total Images:</span>
                    <span className="font-medium text-amber-600 animate-counter">
                      {projects.reduce((sum, project) => sum + project.images.length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Current Project:</span>
                    <span className="font-medium text-amber-600 animate-counter">{selectedProject?.images.length || 0} images</span>
                  </div>
                </div>
                
                {/* Animated progress bar */}
                <div className="mt-3 w-full bg-gray-700 rounded-full h-1">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1 rounded-full animate-progress-fill" 
                       style={{ width: `${((selectedProject?.images.length || 0) / 20) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area - Image Grid */}
        <div className="flex-1 overflow-y-auto relative">
          {/* Animated scrolling indicator */}
          <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 lg:block hidden">
            <div className="w-1 h-20 bg-gray-700 rounded-full overflow-hidden">
              <div className="w-full bg-gradient-to-b from-amber-500 to-orange-500 rounded-full animate-scroll-indicator" style={{ height: '30%' }}></div>
            </div>
          </div>
          
          {selectedProject && (
            <div className="p-4 sm:p-6 lg:p-8 relative">
              
              {/* Project Header */}
              <div ref={projectHeaderRef} className="mb-8 text-center lg:text-left relative">
                {/* Floating decoration */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-amber-300/30 rotate-45 animate-spin-slow hidden lg:block"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400/20 rounded-full animate-pulse hidden lg:block"></div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-wide animate-fade-in-up">
                  {selectedProject.title}
                </h2>
                <div className="w-24 h-px bg-gradient-to-r from-amber-600 to-orange-500 mx-auto lg:mx-0 mb-4 animate-expand-width"></div>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Explore our architectural journey through this curated collection of 
                  <span className="text-amber-600 font-medium animate-number-count">{selectedProject.images.length}</span> images 
                  showcasing innovative design, craftsmanship, and attention to detail.
                </p>
              </div>

              {/* Pinterest-style Image Grid with top and bottom fade overlays */}
              <div className="relative">
                {/* Top enhanced black fade overlay */}
                <div className="pointer-events-none absolute top-0 left-0 w-full h-28 z-30 bg-gradient-to-b from-black via-black/95 to-transparent shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] backdrop-blur-sm"></div>
                {/* Bottom enhanced black fade overlay */}
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-28 z-30 bg-gradient-to-t from-black via-black/95 to-transparent shadow-[0_-8px_32px_0_rgba(0,0,0,0.8)] backdrop-blur-sm"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2">
                  {imageColumns.map((column, columnIndex) => (
                    <div key={columnIndex} className="space-y-1 sm:space-y-2">
                      {column.map((image, imageIndex) => {
                        const globalIndex = columnIndex * Math.ceil(images.length / 3) + imageIndex
                        const isVisible = visibleImages.includes(globalIndex)
                        return (
                          <div
                            key={globalIndex}
                            ref={(el) => { imageRefs.current[globalIndex] = el }}
                            data-index={globalIndex}
                            className={`group relative overflow-hidden border border-gray-600/50 hover:border-amber-400/60 transition-all duration-700 ease-out cursor-pointer transform scale-100 hover:scale-[1.02] hover:-rotate-1 hover:shadow-xl ${
                              globalIndex % 3 === 0 ? 'animate-subtle-zoom' : 
                              globalIndex % 3 === 1 ? 'animate-gentle-breathe' : 'animate-slow-pulse-zoom'
                            } ${
                              isVisible 
                                ? 'opacity-100 transform translate-y-0' 
                                : 'opacity-0 transform translate-y-8'
                            }`}
                            style={{
                              transitionDelay: `${(globalIndex % 6) * 100}ms`,
                              animationDelay: `${(globalIndex * 0.3) % 4}s`
                            }}
                            onClick={() => openLightbox(image, globalIndex)}
                          >
                            {/* Shimmer loading effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                            <div 
                              className="relative w-full bg-gray-800"
                              style={{ aspectRatio: image.aspectRatio }}
                            >
                              <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-all duration-1000 ease-out scale-105 group-hover:scale-110 group-hover:brightness-110"
                                loading="lazy"
                              />
                              {/* Dynamic overlay with gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-black/0 group-hover:from-black/20 group-hover:to-amber-500/10 transition-all duration-500"></div>
                              {/* Animated corner elements */}
                              <div className="absolute top-0 left-0 w-0 h-0 border-l-4 border-t-4 border-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
                              <div className="absolute bottom-0 right-0 w-0 h-0 border-r-4 border-b-4 border-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
                              {/* Image Number Overlay */}
                              <div className="absolute top-2 left-2 bg-black/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                                {globalIndex + 1}
                              </div>
                              {/* Hover zoom icon */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="bg-black/90 backdrop-blur-sm p-3 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
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

              {/* Load More Button (for future expansion) */}
              <div className="text-center mt-12">
                <div className="inline-flex items-center space-x-2 text-gray-500">
                  <span className="text-sm">End of gallery</span>
                  <div className="w-12 h-px bg-gray-600"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auto-scroll Indicator */}
      {showAutoScrollIndicator && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-amber-500/30 animate-fade-in-up">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Loading next project...</span>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && lightboxImage && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative max-w-5xl max-h-[80vh] w-full h-full">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg inline-block border border-gray-700">
                <p className="text-sm font-medium">{lightboxImage.alt}</p>
                <p className="text-xs opacity-75">
                  {lightboxIndex + 1} of {images.length}
                </p>
              </div>
            </div>

            {/* Click to close overlay */}
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
