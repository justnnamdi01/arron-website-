"use client"

import { useEffect, useState } from "react"

interface HouseBuildingAnimationProps {
  onAnimationComplete: () => void
}

export function HouseBuildingAnimation({ onAnimationComplete }: HouseBuildingAnimationProps) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const stages = [
      500,  // Foundation (0.5s)
      1000, // Walls (1s)
      1500, // Roof frame (1.5s)
      2000, // Roof (2s)
      2500, // Windows (2.5s)
      3000, // Door (3s)
      3500, // Details (3.5s)
      4000  // Complete (4s)
    ]

    stages.forEach((delay, index) => {
      setTimeout(() => {
        setStage(index + 1)
      }, delay)
    })

    // Animation complete
    setTimeout(() => {
      onAnimationComplete()
    }, 4500)
  }, [onAnimationComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center z-50">
      {/* Building Animation Container */}
      <div className="relative w-80 h-80">
        
        {/* Foundation */}
        <div 
          className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-stone-800 transition-all duration-500 ease-out ${
            stage >= 1 ? 'w-48 h-4 opacity-100' : 'w-0 h-4 opacity-0'
          }`}
        />
        
        {/* Ground Line */}
        <div 
          className={`absolute bottom-16 left-0 bg-stone-600 h-0.5 transition-all duration-300 ease-out ${
            stage >= 1 ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}
        />

        {/* Left Wall */}
        <div 
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-x-[-96px] bg-stone-300 w-4 transition-all duration-700 ease-out ${
            stage >= 2 ? 'h-24 opacity-100' : 'h-0 opacity-0'
          }`}
        />

        {/* Right Wall */}
        <div 
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-x-[92px] bg-stone-300 w-4 transition-all duration-700 ease-out delay-100 ${
            stage >= 2 ? 'h-24 opacity-100' : 'h-0 opacity-0'
          }`}
        />

        {/* Back Wall */}
        <div 
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-stone-400 transition-all duration-700 ease-out delay-200 ${
            stage >= 2 ? 'w-48 h-24 opacity-100' : 'w-48 h-0 opacity-0'
          }`}
        />

        {/* Roof Frame - Left */}
        <div 
          className={`absolute bottom-44 left-1/2 transform -translate-x-1/2 translate-x-[-48px] bg-amber-800 w-2 origin-bottom transition-all duration-500 ease-out ${
            stage >= 3 ? 'h-16 opacity-100 rotate-45' : 'h-0 opacity-0 rotate-0'
          }`}
        />

        {/* Roof Frame - Right */}
        <div 
          className={`absolute bottom-44 left-1/2 transform -translate-x-1/2 translate-x-[46px] bg-amber-800 w-2 origin-bottom transition-all duration-500 ease-out delay-100 ${
            stage >= 3 ? 'h-16 opacity-100 -rotate-45' : 'h-0 opacity-0 rotate-0'
          }`}
        />

        {/* Roof - Left Side */}
        <div 
          className={`absolute bottom-44 left-1/2 transform -translate-x-1/2 translate-x-[-24px] bg-red-700 origin-bottom-right transition-all duration-600 ease-out ${
            stage >= 4 ? 'w-28 h-16 opacity-100 rotate-45' : 'w-0 h-16 opacity-0 rotate-45'
          }`}
        />

        {/* Roof - Right Side */}
        <div 
          className={`absolute bottom-44 left-1/2 transform -translate-x-1/2 translate-x-[24px] bg-red-800 origin-bottom-left transition-all duration-600 ease-out delay-100 ${
            stage >= 4 ? 'w-28 h-16 opacity-100 -rotate-45' : 'w-0 h-16 opacity-0 -rotate-45'
          }`}
        />

        {/* Window 1 */}
        <div 
          className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 translate-x-[-36px] bg-sky-200 border-2 border-amber-800 transition-all duration-400 ease-out ${
            stage >= 5 ? 'w-12 h-12 opacity-100 scale-100' : 'w-12 h-12 opacity-0 scale-0'
          }`}
        />

        {/* Window 2 */}
        <div 
          className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 translate-x-[24px] bg-sky-200 border-2 border-amber-800 transition-all duration-400 ease-out delay-100 ${
            stage >= 5 ? 'w-12 h-12 opacity-100 scale-100' : 'w-12 h-12 opacity-0 scale-0'
          }`}
        />

        {/* Window Cross - Window 1 */}
        <div 
          className={`absolute bottom-38 left-1/2 transform -translate-x-1/2 translate-x-[-36px] transition-all duration-200 ease-out delay-300 ${
            stage >= 5 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute w-12 h-0.5 bg-amber-800 top-6"></div>
          <div className="absolute w-0.5 h-12 bg-amber-800 left-6"></div>
        </div>

        {/* Window Cross - Window 2 */}
        <div 
          className={`absolute bottom-38 left-1/2 transform -translate-x-1/2 translate-x-[24px] transition-all duration-200 ease-out delay-400 ${
            stage >= 5 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute w-12 h-0.5 bg-amber-800 top-6"></div>
          <div className="absolute w-0.5 h-12 bg-amber-800 left-6"></div>
        </div>

        {/* Door */}
        <div 
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-x-[8px] bg-amber-900 transition-all duration-500 ease-out ${
            stage >= 6 ? 'w-16 h-24 opacity-100 scale-y-100' : 'w-16 h-24 opacity-0 scale-y-0'
          }`}
          style={{ transformOrigin: 'bottom' }}
        />

        {/* Door Handle */}
        <div 
          className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 translate-x-[16px] bg-yellow-400 rounded-full transition-all duration-200 ease-out delay-200 ${
            stage >= 6 ? 'w-2 h-2 opacity-100 scale-100' : 'w-2 h-2 opacity-0 scale-0'
          }`}
        />

        {/* Chimney */}
        <div 
          className={`absolute bottom-52 left-1/2 transform -translate-x-1/2 translate-x-[36px] bg-red-900 transition-all duration-400 ease-out ${
            stage >= 7 ? 'w-6 h-12 opacity-100 scale-y-100' : 'w-6 h-12 opacity-0 scale-y-0'
          }`}
          style={{ transformOrigin: 'bottom' }}
        />

        {/* Smoke */}
        <div className={`absolute bottom-64 left-1/2 transform -translate-x-1/2 translate-x-[39px] transition-all duration-500 ease-out delay-500 ${
          stage >= 7 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce delay-75 mt-1"></div>
          <div className="w-1 h-1 bg-gray-200 rounded-full animate-bounce delay-150 mt-1"></div>
        </div>

        {/* Garden/Landscaping */}
        <div 
          className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-600 ease-out delay-300 ${
            stage >= 7 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        >
          {/* Grass */}
          <div className="flex space-x-1">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="w-0.5 h-2 bg-green-500 rounded-t"
                style={{ 
                  animationDelay: `${i * 50}ms`,
                  animation: stage >= 7 ? 'grow 0.3s ease-out forwards' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Tree */}
        <div 
          className={`absolute bottom-16 left-8 transition-all duration-500 ease-out delay-400 ${
            stage >= 7 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        >
          {/* Tree Trunk */}
          <div className="w-2 h-8 bg-amber-800 mx-auto"></div>
          {/* Tree Leaves */}
          <div className="w-8 h-8 bg-green-600 rounded-full -mt-4"></div>
        </div>

        {/* Sun */}
        <div 
          className={`absolute top-8 right-8 w-12 h-12 bg-yellow-400 rounded-full transition-all duration-500 ease-out delay-600 ${
            stage >= 7 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        >
          {/* Sun Rays */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-0.5 h-4 bg-yellow-400 rounded"
                style={{
                  top: '-8px',
                  left: '50%',
                  transformOrigin: '50% 32px',
                  transform: `translateX(-50%) rotate(${i * 45}deg)`
                }}
              />
            ))}
          </div>
        </div>

        {/* Construction Tools Animation */}
        {stage < 8 && (
          <div className="absolute bottom-8 right-8">
            <div className={`transition-all duration-300 ${stage >= 1 && stage < 3 ? 'opacity-100' : 'opacity-0'}`}>
              {/* Hammer */}
              <div className="w-8 h-2 bg-amber-800 rounded animate-bounce"></div>
              <div className="w-1 h-6 bg-amber-700 mx-auto"></div>
            </div>
            
            <div className={`transition-all duration-300 ${stage >= 3 && stage < 5 ? 'opacity-100' : 'opacity-0'}`}>
              {/* Saw */}
              <div className="w-6 h-1 bg-gray-400 zigzag"></div>
              <div className="w-1 h-4 bg-amber-700 mx-auto"></div>
            </div>
            
            <div className={`transition-all duration-300 ${stage >= 5 && stage < 7 ? 'opacity-100' : 'opacity-0'}`}>
              {/* Paint Brush */}
              <div className="w-1 h-8 bg-amber-700"></div>
              <div className="w-3 h-2 bg-gray-400 -mt-1"></div>
            </div>
          </div>
        )}
      </div>

      {/* Loading Text */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-stone-700 font-light text-lg mb-2">
          {stage < 2 && "Laying Foundation..."}
          {stage >= 2 && stage < 4 && "Building Walls..."}
          {stage >= 4 && stage < 6 && "Adding Roof..."}
          {stage >= 6 && stage < 7 && "Installing Features..."}
          {stage >= 7 && "Finishing Touches..."}
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-stone-300 rounded-full overflow-hidden">
          <div 
            className="h-full bg-stone-700 transition-all duration-300 ease-out"
            style={{ width: `${(stage / 8) * 100}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes grow {
          from { height: 0; }
          to { height: 0.5rem; }
        }
        
        .zigzag {
          background-image: linear-gradient(45deg, transparent 40%, #9ca3af 40%, #9ca3af 60%, transparent 60%);
          background-size: 4px 4px;
        }
      `}</style>
    </div>
  )
}
