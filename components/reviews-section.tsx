"use client"

import { useEffect, useRef, useState } from "react"

interface Review {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  review: string
  project: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "Tech Innovations Inc.",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    review: "Absolutely stunning work! The team transformed our vision into a breathtaking reality. Every detail was meticulously planned and executed to perfection.",
    project: "Corporate Headquarters"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    company: "Private Residence",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    review: "Our dream home exceeded all expectations. The architectural design perfectly balances modern aesthetics with functional living spaces.",
    project: "Luxury Family Home"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Project Manager",
    company: "Urban Development Corp.",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    review: "Professional, innovative, and incredibly talented. They delivered a complex commercial project on time and within budget.",
    project: "Mixed-Use Complex"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Restaurant Owner",
    company: "Thompson's Bistro",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    review: "The interior design created the perfect ambiance for our restaurant. Customer satisfaction and revenue both increased significantly.",
    project: "Restaurant Renovation"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Director",
    company: "Creative Studios",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    review: "Innovative design solutions that perfectly captured our brand identity. The workspace now inspires creativity and collaboration.",
    project: "Creative Office Space"
  },
  {
    id: 6,
    name: "Robert Martinez",
    role: "Property Developer",
    company: "Martinez Holdings",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    review: "Exceptional attention to detail and creative problem-solving. Every project with them has been a tremendous success.",
    project: "Residential Complex"
  }
]

export function ReviewsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentReviewSet, setCurrentReviewSet] = useState(0)
  const [animationStates, setAnimationStates] = useState({
    header: false,
    reviews: false,
    stats: false,
    decorative: false
  })
  const sectionRef = useRef<HTMLDivElement>(null)
  const reviewsPerPage = 4

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          console.log('Reviews section is now visible!')
          
          // Staggered animation sequence
          setTimeout(() => {
            setAnimationStates(prev => ({ ...prev, header: true }))
          }, 200)
          
          setTimeout(() => {
            setAnimationStates(prev => ({ ...prev, reviews: true }))
          }, 600)
          
          setTimeout(() => {
            setAnimationStates(prev => ({ ...prev, stats: true }))
          }, 1400)
          
          setTimeout(() => {
            setAnimationStates(prev => ({ ...prev, decorative: true }))
          }, 1800)
        } else {
          // Reset animations when leaving viewport
          if (entry.boundingClientRect.top > window.innerHeight) {
            setIsVisible(false)
            setAnimationStates({
              header: false,
              reviews: false,
              stats: false,
              decorative: false
            })
          }
        }
      },
      { 
        threshold: 0.15,
        rootMargin: '-50px 0px -50px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-rotate reviews every 8 seconds (reduced frequency)
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentReviewSet((prev) => 
        (prev + 1) % Math.ceil(reviews.length / reviewsPerPage)
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [isVisible])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ))
  }

  const renderStarsForAnimation = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => i < rating ? '★' : '★')
  }

  const currentReviews = reviews.slice(
    currentReviewSet * reviewsPerPage,
    (currentReviewSet + 1) * reviewsPerPage
  )

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-black relative overflow-hidden py-20"
    >
      {/* Background Pattern - Simplified for performance */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      </div>

      {/* Section Header with Enhanced Scroll Reveal */}
      <div className={`text-center mb-12 sm:mb-16 transition-all duration-1500 ease-out ${
        animationStates.header ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-16 scale-95'
      }`}>
        <div className={`w-16 sm:w-20 h-px bg-yellow-400 mx-auto mb-6 sm:mb-8 transition-all duration-1200 ease-out ${
          animationStates.header ? 'opacity-100 transform scale-x-100' : 'opacity-0 transform scale-x-0'
        }`}></div>
        <h2 className={`text-3xl sm:text-5xl md:text-6xl font-light text-white mb-4 sm:mb-6 tracking-wider transition-all duration-1500 ease-out delay-300 ${
          animationStates.header ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
        }`}>
          <span className={`inline-block transition-all duration-1000 delay-400 ${
            animationStates.header ? 'transform translate-x-0' : 'transform translate-x-[-20px]'
          }`}>CLIENT</span>{' '}
          <span className={`inline-block transition-all duration-1000 delay-600 ${
            animationStates.header ? 'transform translate-x-0' : 'transform translate-x-[20px]'
          }`}>TESTIMONIALS</span>
        </h2>
        <p className={`text-lg sm:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed px-4 transition-all duration-1200 ease-out delay-800 ${
          animationStates.header ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          Discover what our clients say about their transformative architectural experiences
        </p>
      </div>

      {/* Reviews Grid with Enhanced Animations */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentReviews.map((review, index) => (
            <div
              key={`${review.id}-${currentReviewSet}`}
              className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 transition-all duration-1000 ease-out hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-102 hover:shadow-lg group ${
                animationStates.reviews 
                  ? 'opacity-100 transform translate-y-0 scale-100' 
                  : 'opacity-0 transform translate-y-20 scale-95'
              }`}
              style={{ 
                transitionDelay: `${index * 200 + 200}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Modern stars layout */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-1">
                  {renderStarsForAnimation(review.rating).map((star, starIndex) => (
                    <span
                      key={starIndex}
                      className={`text-sm transition-all duration-600 ease-out ${
                        starIndex < review.rating ? 'text-yellow-400' : 'text-gray-500'
                      } ${
                        animationStates.reviews 
                          ? 'opacity-100 transform scale-100' 
                          : 'opacity-0 transform scale-0'
                      }`}
                      style={{ 
                        transitionDelay: `${index * 200 + 400 + starIndex * 50}ms`
                      }}
                    >
                      {star}
                    </span>
                  ))}
                </div>
                
                {/* Project badge */}
                <div className={`text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full transition-all duration-600 ease-out ${
                  animationStates.reviews 
                    ? 'opacity-100 transform scale-100' 
                    : 'opacity-0 transform scale-75'
                }`}
                style={{ 
                  transitionDelay: `${index * 200 + 500}ms`
                }}>
                  {review.project}
                </div>
              </div>

              {/* Review Text - more compact */}
              <blockquote className={`text-white/90 text-sm leading-relaxed mb-4 transition-all duration-800 ease-out ${
                animationStates.reviews 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4'
              }`}
              style={{ 
                transitionDelay: `${index * 200 + 600}ms`
              }}>
                "{review.review}"
              </blockquote>

              {/* Client Info - no avatar, clean typography */}
              <div className={`border-t border-white/10 pt-4 transition-all duration-600 ease-out ${
                animationStates.reviews 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4'
              }`}
              style={{ 
                transitionDelay: `${index * 200 + 800}ms`
              }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium text-sm">
                      {review.name}
                    </h4>
                    <p className="text-stone-400 text-xs">
                      {review.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-stone-300 text-xs font-light">
                      {review.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modern accent border */}
              <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400/20 via-yellow-400/40 to-yellow-400/20 transition-all duration-800 ease-out ${
                animationStates.reviews 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}
              style={{ 
                transitionDelay: `${index * 200 + 300}ms`
              }}></div>
            </div>
          ))}
        </div>

        {/* Navigation Dots with Enhanced Animation */}
        <div className={`flex justify-center mt-12 space-x-3 transition-all duration-1200 ease-out ${
          animationStates.reviews ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}
        style={{ transitionDelay: '1200ms' }}>
          {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentReviewSet(i)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ease-out ${
                i === currentReviewSet 
                  ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50' 
                  : 'bg-white/30 hover:bg-white/50 hover:scale-110'
              } ${
                animationStates.reviews 
                  ? 'transform scale-100' 
                  : 'transform scale-0'
              }`}
              style={{ 
                transitionDelay: `${1400 + i * 100}ms`
              }}
            />
          ))}
        </div>

        {/* Statistics with Cascading Animation */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-16 sm:mt-20 transition-all duration-1000 ease-out ${
          animationStates.stats ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
        }`}>
          {[
            { number: "150+", label: "Projects Completed" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "25+", label: "Awards Won" },
            { number: "15", label: "Years Experience" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`text-center transition-all duration-1200 ease-out ${
                animationStates.stats 
                  ? 'opacity-100 transform translate-y-0 scale-100' 
                  : 'opacity-0 transform translate-y-8 scale-95'
              }`}
              style={{ 
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className={`text-3xl sm:text-4xl md:text-5xl font-light text-yellow-400 mb-2 transition-all duration-1000 ease-out ${
                animationStates.stats 
                  ? 'transform scale-100 opacity-100' 
                  : 'transform scale-150 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 200 + 200}ms`
              }}>
                {stat.number}
              </div>
              <div className={`text-stone-300 text-xs sm:text-sm uppercase tracking-wide transition-all duration-800 ease-out ${
                animationStates.stats 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4'
              }`}
              style={{ 
                transitionDelay: `${index * 200 + 400}ms`
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements with Enhanced Animations */}
      <div className={`absolute top-8 sm:top-20 left-4 sm:left-10 w-8 sm:w-12 h-8 sm:h-12 border-l-2 border-t-2 border-yellow-400/30 transition-all duration-1500 ease-out ${
        animationStates.decorative ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-75 rotate-45'
      }`}></div>
      
      <div className={`absolute top-8 sm:top-20 right-4 sm:right-10 w-8 sm:w-12 h-8 sm:h-12 border-r-2 border-t-2 border-yellow-400/30 transition-all duration-1500 ease-out ${
        animationStates.decorative ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-75 rotate-45'
      }`}
      style={{ transitionDelay: '200ms' }}></div>
      
      <div className={`absolute bottom-8 sm:bottom-20 left-4 sm:left-10 w-8 sm:w-12 h-8 sm:h-12 border-l-2 border-b-2 border-yellow-400/30 transition-all duration-1500 ease-out ${
        animationStates.decorative ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-75 rotate-45'
      }`}
      style={{ transitionDelay: '400ms' }}></div>
      
      <div className={`absolute bottom-8 sm:bottom-20 right-4 sm:right-10 w-8 sm:w-12 h-8 sm:h-12 border-r-2 border-b-2 border-yellow-400/30 transition-all duration-1500 ease-out ${
        animationStates.decorative ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-75 rotate-45'
      }`}
      style={{ transitionDelay: '600ms' }}></div>

      {/* Floating Particles with Enhanced Animation */}
      {animationStates.decorative && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-pulse transition-all duration-1000 ease-out ${
                animationStates.decorative ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-0'
              }`}
              style={{
                left: `${20 + (i * 10) % 60}%`,
                top: `${20 + (i * 15) % 60}%`,
                animationDelay: `${i * 0.5 + 1}s`,
                animationDuration: `${4 + (i % 2)}s`,
                transitionDelay: `${i * 100 + 800}ms`
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
