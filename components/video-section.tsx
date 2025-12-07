"use client"

import { useEffect, useRef, useState } from "react"

export function VideoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [videoVisibility, setVideoVisibility] = useState([false, false, false])
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const videoElementRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null])

  useEffect(() => {
    setIsMounted(true)

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          console.log('Video section is now visible!')
          
          // Force play all videos on mobile
          videoElementRefs.current.forEach(video => {
            if (video) {
              video.play().catch(error => {
                console.log("Video autoplay prevented:", error)
              })
            }
          })
        } else {
          // Reset animation when leaving viewport
          setIsVisible(false)
          setVideoVisibility([false, false, false])
        }
      },
      { 
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '-50px 0px' // Add some margin for better timing
      }
    )

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-video-index') || '0')
            setVideoVisibility(prev => {
              const newVisibility = [...prev]
              newVisibility[index] = true
              return newVisibility
            })
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: '-20px 0px'
      }
    )

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current)
    }

    // Observe individual video containers
    videoRefs.current.forEach((ref) => {
      if (ref) {
        videoObserver.observe(ref)
      }
    })

    return () => {
      sectionObserver.disconnect()
      videoObserver.disconnect()
    }
  }, [])

  // Extra safeguard: try playing after first user interaction (for strict mobile autoplay policies)
  useEffect(() => {
    const enableAutoplay = () => {
      videoElementRefs.current.forEach(video => {
        if (video && video.paused) {
          video.muted = true
          video
            .play()
            .catch(err => console.log("Video section autoplay after interaction failed:", err))
        }
      })
      window.removeEventListener('touchstart', enableAutoplay)
      window.removeEventListener('click', enableAutoplay)
    }

    window.addEventListener('touchstart', enableAutoplay, { passive: true })
    window.addEventListener('click', enableAutoplay)

    return () => {
      window.removeEventListener('touchstart', enableAutoplay)
      window.removeEventListener('click', enableAutoplay)
    }
  }, [])

  return (
          <section 
        id="video-showcase"
        ref={sectionRef}
        className="h-screen w-full bg-white relative overflow-hidden"
      >
      {/* Transparent dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-[1]"></div>
      {/* Video Grid Container - Mobile responsive */}
      <div className="h-full w-full grid grid-cols-2 md:grid-rows-2 gap-0 relative z-[2]">
        
        {/* Top Row - Responsive layout */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-0 relative col-span-2">
          
          {/* Video 1 - Top Left */}
          <div 
            ref={(el) => { videoRefs.current[0] = el }}
            data-video-index="0"
            className={`relative overflow-hidden group transition-all duration-1000 ease-out ${
              videoVisibility[0] 
                ? 'opacity-100 transform translate-x-0 translate-y-0 scale-100' 
                : 'opacity-0 transform -translate-x-20 -translate-y-10 scale-95'
            }`}
            onClick={() => setFullscreenVideo('/video/Clip 3.mp4')}
          >
            <video
              ref={(el) => { videoElementRefs.current[0] = el }}
              className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
                (isVisible || isMounted) ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
              } group-hover:scale-105`}
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true"
            >
              <source src="/video/Clip 3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Hover info tab - hidden until hover */}
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-3 sm:mx-4 mb-3 sm:mb-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="bg-black/70 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-t-lg flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm md:text-base font-light tracking-wide text-white">
                    DESIGN PROCESS
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 z-10 transform -translate-x-px"></div>

          {/* Video 2 - Top Right */}
          <div 
            ref={(el) => { videoRefs.current[1] = el }}
            data-video-index="1"
            className={`relative overflow-hidden group transition-all duration-1000 ease-out delay-200 ${
              videoVisibility[1] 
                ? 'opacity-100 transform translate-x-0 translate-y-0 scale-100' 
                : 'opacity-0 transform translate-x-20 -translate-y-10 scale-95'
            }`}
            onClick={() => setFullscreenVideo('/video/Clip 4.mp4')}
          >
            <video
              ref={(el) => { videoElementRefs.current[1] = el }}
              className={`w-full h-full object-cover transition-all duration-1000 ease-out delay-200 ${
                (isVisible || isMounted) ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
              } group-hover:scale-105`}
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true"
            >
              <source src="/video/Clip 4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Hover info tab - hidden until hover */}
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-3 sm:mx-4 mb-3 sm:mb-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="bg-black/70 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-t-lg flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm md:text-base font-light tracking-wide text-white">
                    CONSTRUCTION
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Separator */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20 z-10 transform -translate-y-px"></div>

        {/* Bottom Row - One Rectangular Video - Spans 2 columns */}
        <div 
          ref={(el) => { videoRefs.current[2] = el }}
          data-video-index="2"
          className={`relative overflow-hidden group transition-all duration-1000 ease-out delay-400 col-span-2 ${
            videoVisibility[2] 
              ? 'opacity-100 transform translate-x-0 translate-y-0 scale-100' 
              : 'opacity-0 transform translate-y-20 scale-95'
          }`}
          onClick={() => setFullscreenVideo('/video/Clip 5.mp4')}
        >
          <video
            ref={(el) => { videoElementRefs.current[2] = el }}
            className={`w-full h-full object-cover transition-all duration-1000 ease-out delay-400 ${
              (isVisible || isMounted) ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
            } group-hover:scale-105`}
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
          >
            <source src="/video/Clip 5.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Hover info tab - hidden until hover */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-3 sm:mx-6 mb-4 sm:mb-6 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <div className="bg-black/75 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-t-xl text-center">
                <h2 className="text-base sm:text-lg md:text-2xl font-light tracking-wider mb-1 text-white">
                  ENOU PORTFOLIO FILMS
                </h2>
                <p className="text-xs sm:text-sm md:text-base font-light text-white/80 max-w-2xl mx-auto">
                  Short films capturing built works, design intent, and the spaces that define our practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner Decorative Elements with enhanced animations - responsive */}
      <div className={`absolute top-4 left-4 sm:top-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-white/30 transition-all duration-1200 ease-out delay-200 ${
        isVisible ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-75 rotate-45'
      }`}></div>
      
      <div className={`absolute top-4 right-4 sm:top-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-white/30 transition-all duration-1200 ease-out delay-300 ${
        isVisible ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-75 rotate-45'
      }`}></div>
      
      <div className={`absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-white/30 transition-all duration-1200 ease-out delay-400 ${
        isVisible ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-75 rotate-45'
      }`}></div>
      
      <div className={`absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-white/30 transition-all duration-1200 ease-out delay-500 ${
        isVisible ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-75 rotate-45'
      }`}></div>

      {/* Navigation Dots with staggered animation - responsive */}
      <div className={`absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 transition-all duration-1000 ease-out delay-1400 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 rounded-full transition-all duration-800 delay-1500 ${
          isVisible ? 'transform scale-100' : 'transform scale-0'
        }`}></div>
        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full transition-all duration-800 delay-1600 ${
          isVisible ? 'transform scale-100' : 'transform scale-0'
        }`}></div>
        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 rounded-full transition-all duration-800 delay-1700 ${
          isVisible ? 'transform scale-100' : 'transform scale-0'
        }`}></div>
      </div>

      {/* Fullscreen Video Modal */}
      {fullscreenVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            
            {/* Close Button */}
            <button
              onClick={() => setFullscreenVideo(null)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Fullscreen Video */}
            <video
              className="max-w-full max-h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
              controls
            >
              <source src={fullscreenVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Click outside to close */}
            <div 
              className="absolute inset-0 -z-10"
              onClick={() => setFullscreenVideo(null)}
            />
          </div>
        </div>
      )}
    </section>
  )
}
