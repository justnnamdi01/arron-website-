"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { WhatsAppConsultation } from "@/components/whatsapp-consultation"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setIsScrolled(currentScrollY > 50)
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or at top - show navbar
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setIsVisible(false)
        setIsMobileMenuOpen(false) // Close mobile menu when hiding
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "#services" },
    { label: "About", href: "/architect" },
    { label: "Contact", href: "#contact" }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5' 
        : 'bg-black/10 backdrop-blur-md border-b border-white/10'
    } ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-3'
        }`}>
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group relative z-10">
            {/* Main Logo */}
            <div className={`relative transition-all duration-300 group-hover:scale-105 ${
              isScrolled ? 'w-12 h-12 md:w-16 md:h-16' : 'w-14 h-14 md:w-18 md:h-18'
            }`} style={{
              filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.4)) drop-shadow(0 0 16px rgba(251, 191, 36, 0.2))',
            }}>
              <Image
                src="/logo/LOGO.png"
                alt="ENOU/HR Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Secondary Logo */}
            <div className={`relative opacity-80 transition-all duration-300 group-hover:opacity-100 ${
              isScrolled ? 'w-10 h-10 md:w-14 md:h-14' : 'w-12 h-12 md:w-16 md:h-16'
            }`} style={{
              filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.3)) drop-shadow(0 0 12px rgba(251, 191, 36, 0.15))',
            }}>
              <Image
                src="/logo/RH LOGO.png"
                alt="RH Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Brand Text */}
            <div className="hidden sm:block">
              <span className={`font-light tracking-wider transition-all duration-300 ${
                isScrolled 
                  ? 'text-sm md:text-base text-stone-900' 
                  : 'text-base md:text-lg text-white'
              }`}>
                ENOU/HR
              </span>
              <div className={`text-xs tracking-widest font-light -mt-0.5 ${
                isScrolled ? 'text-stone-500' : 'text-white/80'
              }`}>
                PREMIUM DESIGN SERVICES
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.label}
                href={item.href} 
                className="relative group py-2 px-1"
              >
                <span className={`transition-colors duration-300 font-light tracking-wide ${
                  isScrolled 
                    ? 'text-stone-700 hover:text-stone-900' 
                    : 'text-white hover:text-white/80'
                }`}>
                  {item.label}
                </span>
                {/* Hover underline effect */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* CTA Button */}
            <div className="hidden md:inline-flex">
              <WhatsAppConsultation 
                triggerText="GET CONSULTATION"
                triggerClassName="px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-xs md:text-sm tracking-wide rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center space-y-1.5 group"
              aria-label="Toggle mobile menu"
            >
              <span className={`w-6 h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-stone-800' : 'bg-white'
              } ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-stone-800' : 'bg-white'
              } ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-stone-800' : 'bg-white'
              } ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-6 border-t border-white/30 bg-white/20 backdrop-blur-xl rounded-b-xl shadow-xl shadow-black/10">
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <Link 
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg mx-2 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="font-light tracking-wide">{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile CTA Button */}
              <div className="px-4 pt-4 border-t border-white/30 mt-4">
                <WhatsAppConsultation 
                  triggerText="GET CONSULTATION"
                  triggerClassName="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-sm tracking-wide rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
