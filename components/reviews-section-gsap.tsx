"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

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
    review: "Absolutely stunning work! The team transformed our vision into a breathtaking reality.",
    project: "Corporate HQ"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    company: "Private Residence",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    review: "Our dream home exceeded all expectations. Perfect balance of modern aesthetics and function.",
    project: "Luxury Home"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Project Manager",
    company: "Urban Development",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    review: "Professional, innovative, and talented. Delivered complex project on time and within budget.",
    project: "Mixed-Use Complex"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Restaurant Owner",
    company: "Thompson's Bistro",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    review: "The interior design created the perfect ambiance. Revenue increased significantly.",
    project: "Restaurant"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Director",
    company: "Creative Studios",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    review: "Innovative solutions that captured our brand identity perfectly.",
    project: "Office Space"
  },
  {
    id: 6,
    name: "Robert Martinez",
    role: "Developer",
    company: "Martinez Holdings",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    review: "Exceptional attention to detail. Every project has been a tremendous success.",
    project: "Residential Complex"
  }
]

export function ReviewsSectionGSAP() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const avatarRefs = useRef<(HTMLDivElement | null)[]>([])
  const statsRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        scale: 0.8,
        ease: "power3.out",
      })

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "top 40%",
          scrub: 1,
        },
        y: 60,
        opacity: 0,
        ease: "power3.out",
      })

      // Staggered card animations with scale, fade, and tilt
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        // Initial state with random tilt
        const randomTilt = (Math.random() - 0.5) * 15

        gsap.set(card, {
          opacity: 0,
          scale: 0.7,
          rotationX: -20,
          rotationY: randomTilt,
          y: 100,
          z: -100,
        })

        // Pop-in animation
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          y: 0,
          z: 0,
          duration: 1,
          delay: index * 0.15,
          ease: "elastic.out(1, 0.75)",
        })

        // Parallax effect on scroll
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
          y: -30,
          rotationY: (index % 2 === 0 ? 5 : -5),
          ease: "none",
        })

        // Hover animation
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 0,
            z: 50,
            duration: 0.4,
            ease: "power2.out",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 0.4,
            ease: "power2.out",
          })
        })
      })

      // Typewriter effect for review text
      textRefs.current.forEach((textEl, index) => {
        if (!textEl) return

        const reviewText = reviews[index].review
        
        ScrollTrigger.create({
          trigger: textEl,
          start: "top 75%",
          once: true,
          onEnter: () => {
            textEl.textContent = ""
            let charIndex = 0
            
            const typeInterval = setInterval(() => {
              if (charIndex < reviewText.length) {
                textEl.textContent += reviewText[charIndex]
                charIndex++
              } else {
                clearInterval(typeInterval)
              }
            }, 20 + Math.random() * 10) // Variable speed for natural feel
          }
        })
      })

      // Avatar slide-in with glow pulse
      avatarRefs.current.forEach((avatar, index) => {
        if (!avatar) return

        gsap.from(avatar, {
          scrollTrigger: {
            trigger: avatar,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          x: -100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15 + 0.3,
          ease: "power3.out",
        })

        // Glow pulse animation
        gsap.to(avatar.querySelector('.avatar-glow'), {
          scrollTrigger: {
            trigger: avatar,
            start: "top 80%",
          },
          scale: 1.3,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          ease: "power2.out",
        })
      })

      // Stats counter animation
      statsRefs.current.forEach((stat, index) => {
        if (!stat) return

        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          scale: 0,
          opacity: 0,
          rotation: 360,
          duration: 1,
          delay: index * 0.1,
          ease: "back.out(1.7)",
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-yellow-400' : 'text-gray-600'
        }`}
      >
        ★
      </span>
    ))
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black py-20 md:py-32 overflow-hidden"
      style={{ perspective: "2000px" }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 20}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-stone-900/50 via-black to-black"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block mb-4">
            <div className="w-16 h-px bg-yellow-400 mx-auto mb-4"></div>
          </div>
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-white mb-6"
          >
            CLIENT TESTIMONIALS
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-stone-300 font-light max-w-2xl mx-auto"
          >
            Discover what our clients say about their transformative experiences
          </p>
        </div>

        {/* Reviews Grid with 3D perspective */}
        <div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8 mb-20"
          style={{ transformStyle: "preserve-3d" }}
        >
          {reviews.map((review, index) => (
            <div
              key={review.id}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="group relative bg-gradient-to-br from-stone-900/80 to-stone-950/80 backdrop-blur-xl border border-stone-800 rounded-lg md:rounded-2xl p-4 md:p-6 lg:p-8 cursor-pointer overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/10 group-hover:via-yellow-500/5 group-hover:to-transparent transition-all duration-500 rounded-2xl"></div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-yellow-500/30 transition-all duration-500"></div>

              {/* Stars */}
              <div className="flex space-x-0.5 md:space-x-1 mb-3 md:mb-4">
                {renderStars(review.rating)}
              </div>

              {/* Review Text with typewriter */}
              <div className="mb-4 md:mb-6 min-h-[100px] md:min-h-[120px]">
                <p
                  ref={(el) => {
                    textRefs.current[index] = el
                  }}
                  className="text-white/90 text-xs md:text-sm lg:text-base leading-relaxed font-light"
                >
                  "{review.review}"
                </p>
                <span className="inline-block w-1.5 md:w-2 h-3 md:h-4 bg-yellow-400 ml-1 animate-pulse"></span>
              </div>

              {/* Client Info with Avatar */}
              <div className="flex items-center space-x-2 md:space-x-4 border-t border-stone-800 pt-4 md:pt-6">
                <div
                  ref={(el) => {
                    avatarRefs.current[index] = el
                  }}
                  className="relative flex-shrink-0"
                >
                  {/* Glow pulse effect */}
                  <div className="avatar-glow absolute inset-0 bg-yellow-500/50 rounded-full blur-md"></div>
                  
                  {/* Avatar */}
                  <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-yellow-500/50">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-black rounded-full"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-xs md:text-sm lg:text-base truncate">
                    {review.name}
                  </h4>
                  <p className="text-stone-400 text-xs md:text-sm truncate">
                    {review.role}
                  </p>
                  <p className="text-stone-500 text-xs mt-0.5 md:mt-1 truncate hidden md:block">
                    {review.company}
                  </p>
                </div>

                {/* Project badge */}
                <div className="hidden lg:block">
                  <span className="text-xs px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                    {review.project}
                  </span>
                </div>
              </div>

              {/* Decorative corner element */}
              <div className="absolute top-2 right-2 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-yellow-500/20 group-hover:border-yellow-500/50 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Statistics with animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {[
            { number: "150+", label: "Projects Completed" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "25+", label: "Awards Won" },
            { number: "15", label: "Years Experience" }
          ].map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                statsRefs.current[index] = el
              }}
              className="text-center group cursor-pointer"
            >
              <div className="relative inline-block mb-2 md:mb-3">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative text-3xl md:text-5xl lg:text-6xl font-light text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
              </div>
              <div className="text-stone-400 text-xs md:text-sm uppercase tracking-wider px-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(-10px) translateX(-10px);
          }
        }
      `}</style>
    </section>
  )
}

