"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function ArchitectProfile() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-black relative overflow-hidden py-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      </div>

      {/* Section Header */}
      <div className={`text-center mb-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        <div className="w-20 h-px bg-yellow-400 mx-auto mb-8"></div>
        <h2 className="text-5xl md:text-6xl font-light text-white mb-6 tracking-wider">
          MEET THE ARCHITECT
        </h2>
        <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
          The visionary behind our exceptional architectural designs
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Circular Image Container */}
        <div className={`flex justify-center mb-12 transition-all duration-1200 delay-300 ${
          isVisible ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-12 scale-95'
        }`}>
          <div className="relative group">
            {/* Outer Ring with Animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 animate-pulse opacity-20 scale-110"></div>
            
            {/* Main Image Container */}
            <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-900/10 to-transparent z-10"></div>
              <Image
                src="/portfolio/End cover 2.png"
                alt="Aaron Rourké BAKOSSA - Lead Architect"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              
              {/* Decorative Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-yellow-400/50"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80 animate-bounce"></div>
            <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-white rounded-full opacity-60 animate-pulse"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className={`text-center transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          
          {/* Name and Title */}
          <div className="mb-8">
            <h3 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wide">
              Aaron Rourké BAKOSSA
            </h3>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-px bg-yellow-400"></div>
              <span className="text-lg text-stone-300 font-medium tracking-widest">
                PRINCIPAL ARCHITECT & FOUNDER
              </span>
              <div className="w-16 h-px bg-yellow-400"></div>
            </div>
          </div>

          {/* Professional Story */}
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-stone-300 leading-relaxed">
            <p className="text-xl text-white font-light italic">
              "Creating exceptional architectural experiences through innovative design and meticulous attention to detail."
            </p>
            
            <p>
              Originally from the Central African Republic and now calling Mauritius home for the past six years, 
              I bring a unique global perspective to every architectural project. My journey in design spans across 
              continents, enriching my approach with diverse cultural influences and innovative solutions.
            </p>
            
            <p>
              As a dedicated freelance architect and graphic designer, I specialize in transforming visions into 
              reality through comprehensive master planning and detailed architectural design. My expertise encompasses 
              the complete design spectrum—from initial conceptualization to final execution.
            </p>
          </div>

          {/* Expertise Section */}
          <div className={`mt-12 transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h4 className="text-2xl font-light text-white mb-8 tracking-wide">
              TECHNICAL EXPERTISE
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-stone-300 font-medium">AutoCAD Design</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-stone-300 font-medium">SketchUp Modeling</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-stone-300 font-medium">Lumion Visualization</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-stone-300 font-medium">InDesign Publishing</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-stone-300 font-medium">Photoshop Enhancement</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-stone-300 font-medium">Master Planning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className={`mt-12 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-8 rounded-2xl max-w-2xl mx-auto">
              <h4 className="text-xl font-light mb-4 tracking-wide">
                MY DESIGN PHILOSOPHY
              </h4>
              <p className="text-stone-200 leading-relaxed">
                I believe in the "One Touch Design" approach—where every element serves a purpose, 
                every space tells a story, and every detail contributes to the greater vision. 
                Your dreams and aspirations guide my creative process, ensuring that each project 
                becomes a true reflection of your unique vision and lifestyle.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className={`mt-12 transition-all duration-1000 delay-1200 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <p className="text-lg text-stone-300 mb-6">
              Having collaborated with diverse companies and individual clients across multiple continents, 
              I understand the importance of confidentiality and business objectives in every project.
            </p>
            <p className="text-xl text-white font-medium">
              <span className="italic">"Your vision is my mission."</span>
            </p>
            <p className="text-lg text-stone-300 mt-4">
              Ready to bring your architectural dreams to life? Let's create something extraordinary together.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-20 left-10 w-12 h-12 border-l-2 border-t-2 border-yellow-400/30 transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-75 rotate-45'
      }`}></div>
      
      <div className={`absolute top-20 right-10 w-12 h-12 border-r-2 border-t-2 border-yellow-400/30 transition-all duration-1000 delay-600 ${
        isVisible ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-75 rotate-45'
      }`}></div>
      
      <div className={`absolute bottom-20 left-10 w-12 h-12 border-l-2 border-b-2 border-yellow-400/30 transition-all duration-1000 delay-700 ${
        isVisible ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-75 rotate-45'
      }`}></div>
      
      <div className={`absolute bottom-20 right-10 w-12 h-12 border-r-2 border-b-2 border-yellow-400/30 transition-all duration-1000 delay-800 ${
        isVisible ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-75 rotate-45'
      }`}></div>

      {/* Floating Geometric Elements */}
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/20 rounded-full animate-pulse"
              style={{
                left: `${20 + (i * 15) % 60}%`,
                top: `${20 + (i * 20) % 60}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + (i % 2)}s`
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
