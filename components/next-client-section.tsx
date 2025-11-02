"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PayPalPayment } from "@/components/paypal-payment"

export function NextClientSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [fogClearing, setFogClearing] = useState(false)
  const [textAnimations, setTextAnimations] = useState({
    header: false,
    description: false,
    features: [false, false, false]
  })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Only trigger if we haven't started the effect yet
          if (!isVisible) {
            setIsVisible(true)
            // Start fog clearing effect with delay
            setTimeout(() => {
              setFogClearing(true)
            }, 300)
            
            // Stagger text animations
            setTimeout(() => {
              setTextAnimations(prev => ({ ...prev, header: true }))
            }, 800)
            
            setTimeout(() => {
              setTextAnimations(prev => ({ ...prev, description: true }))
            }, 1200)
            
            // Stagger feature cards
            setTimeout(() => {
              setTextAnimations(prev => ({ 
                ...prev, 
                features: [true, false, false] 
              }))
            }, 1600)
            
            setTimeout(() => {
              setTextAnimations(prev => ({ 
                ...prev, 
                features: [true, true, false] 
              }))
            }, 2000)
            
            setTimeout(() => {
              setTextAnimations(prev => ({ 
                ...prev, 
                features: [true, true, true] 
              }))
            }, 2400)
          }
        } else {
          // Reset the effect when leaving the viewport
          // This ensures it can trigger again if user scrolls away and back
          if (entry.boundingClientRect.top > window.innerHeight) {
            setIsVisible(false)
            setFogClearing(false)
            setTextAnimations({
              header: false,
              description: false,
              features: [false, false, false]
            })
          }
        }
      },
      { 
        threshold: 0.15,
        rootMargin: '-50px 0px -50px 0px' // Only trigger when section is well into view
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
      alert('Please fill in all required fields.')
      return
    }
    
    // Show payment section
    setShowPayment(true)
  }

  const handlePaymentSuccess = async (details: any) => {
    setPaymentCompleted(true)
    setPaymentDetails(details)
    setIsSubmitting(true)
    
    // Create submission object with payment details
    const submission = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectType: formData.projectType,
      budget: formData.budget,
      timeline: formData.timeline,
      description: formData.message,
      paymentDetails: {
        transactionId: details.id,
        payerEmail: details.payer?.email_address,
        amount: details.purchase_units[0]?.amount?.value,
        status: details.status
      },
      submittedAt: new Date().toISOString()
    }

    // Save to localStorage
    try {
      const existingSubmissions = localStorage.getItem('contactSubmissions')
      const submissions = existingSubmissions ? JSON.parse(existingSubmissions) : []
      submissions.push(submission)
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions))
    } catch (error) {
      console.error('Error saving contact submission:', error)
    }
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setPaymentCompleted(false)
      setPaymentDetails(null)
      setShowPayment(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      })
    }, 5000)
  }

  const handlePaymentError = (error: any) => {
    console.error('PayPal payment error:', error)
    alert('Payment failed. Please try again or contact us directly.')
  }

  const getConsultationFee = () => {
    switch (formData.budget) {
      case '50k-100k': return '250'
      case '100k-250k': return '500'
      case '250k-500k': return '750'
      case '500k-1m': return '1000'
      case '1m+': return '1500'
      default: return '250'
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 relative overflow-hidden"
    >
      {/* Fog Overlay Layers */}
      <div className={`absolute inset-0 transition-all duration-3000 ease-out ${
        fogClearing ? 'opacity-0' : 'opacity-100'
      }`}>
        {/* Dense fog layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-100/90 to-stone-200/80 backdrop-blur-sm"></div>
        
        {/* Animated fog wisps */}
        <div className={`absolute inset-0 transition-all duration-4000 ease-out ${
          fogClearing ? 'opacity-0 transform translate-y-[-100px]' : 'opacity-70 transform translate-y-0'
        }`}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-stone-100/50 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/30 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        {/* Moving fog particles */}
        <div className={`absolute inset-0 transition-all duration-5000 ease-out ${
          fogClearing ? 'opacity-0 transform translate-x-[200px] translate-y-[-50px]' : 'opacity-50 transform translate-x-0 translate-y-0'
        }`}>
          {[...Array(12)].map((_, i) => {
            // Use deterministic values based on index to avoid hydration mismatch
            const width = 20 + (i * 7) % 40; // Values between 20-60
            const height = 20 + (i * 11) % 40; // Values between 20-60
            const top = (i * 13) % 100; // Values between 0-100
            const left = (i * 17) % 100; // Values between 0-100
            const delay = (i * 0.3) % 3; // Values between 0-3
            const duration = 3 + (i * 0.5) % 4; // Values between 3-7
            
            return (
              <div
                key={i}
                className="absolute bg-white/20 rounded-full blur-xl animate-float"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-stone-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 transition-all duration-2000 ease-out delay-1000 ${
        fogClearing ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        
        {/* Header Section with Enhanced Animations */}
        <div className="text-center mb-12 sm:mb-16">
          <div className={`w-20 sm:w-24 h-px bg-stone-400 mx-auto mb-6 sm:mb-8 transition-all duration-1200 ease-out ${
            textAnimations.header ? 'opacity-100 transform scale-x-100' : 'opacity-0 transform scale-x-0'
          }`}></div>
          <h2 className={`text-4xl sm:text-5xl md:text-7xl font-light tracking-wide text-stone-900 mb-6 sm:mb-8 leading-tight transition-all duration-1500 ease-out ${
            textAnimations.header ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-16 scale-95'
          }`}>
            <span className={`block transition-all duration-1000 delay-200 ${
              textAnimations.header ? 'transform translate-x-0' : 'transform translate-x-[-30px]'
            }`}>Ready to Build Your</span>
            <br />
            <span className={`text-amber-600 block transition-all duration-1000 delay-400 ${
              textAnimations.header ? 'transform translate-x-0' : 'transform translate-x-[30px]'
            }`}>Dream Home?</span>
          </h2>
          <p className={`text-lg sm:text-xl md:text-2xl text-stone-600 font-light max-w-4xl mx-auto leading-relaxed px-4 transition-all duration-1500 ease-out delay-600 ${
            textAnimations.description ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
          }`}>
            We specialize in creating extraordinary architectural experiences that transform spaces 
            and elevate lifestyles. If you're ready to bring your vision to life, we'd love to hear from you.
          </p>
        </div>

        {/* Why Choose Us Section with Enhanced Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          <div className={`text-center group transition-all duration-1200 ease-out ${
            textAnimations.features[0] ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-16 scale-95'
          }`}>
            <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-amber-600 transition-all duration-500 ${
              textAnimations.features[0] ? 'transform scale-100 rotate-0' : 'transform scale-0 rotate-180'
            }`}>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className={`text-lg sm:text-xl font-light text-stone-900 mb-3 sm:mb-4 tracking-wide transition-all duration-800 delay-200 ${
              textAnimations.features[0] ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>INNOVATIVE DESIGN</h3>
            <p className={`text-sm sm:text-base text-stone-600 leading-relaxed px-2 sm:px-0 transition-all duration-800 delay-400 ${
              textAnimations.features[0] ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              We push boundaries to create unique, functional spaces that reflect your personality and needs.
            </p>
          </div>

          <div className={`text-center group transition-all duration-1200 ease-out delay-200 ${
            textAnimations.features[1] ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-16 scale-95'
          }`}>
            <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-amber-600 transition-all duration-500 ${
              textAnimations.features[1] ? 'transform scale-100 rotate-0' : 'transform scale-0 rotate-180'
            }`}>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={`text-lg sm:text-xl font-light text-stone-900 mb-3 sm:mb-4 tracking-wide transition-all duration-800 delay-200 ${
              textAnimations.features[1] ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>ON-TIME DELIVERY</h3>
            <p className={`text-sm sm:text-base text-stone-600 leading-relaxed px-2 sm:px-0 transition-all duration-800 delay-400 ${
              textAnimations.features[1] ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              We respect your timeline and ensure every project is completed on schedule without compromising quality.
            </p>
          </div>

          <div className={`text-center group transition-all duration-1200 ease-out delay-400 sm:col-span-2 lg:col-span-1 ${
            textAnimations.features[2] ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-16 scale-95'
          }`}>
            <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-amber-600 transition-all duration-500 ${
              textAnimations.features[2] ? 'transform scale-100 rotate-0' : 'transform scale-0 rotate-180'
            }`}>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className={`text-lg sm:text-xl font-light text-stone-900 mb-3 sm:mb-4 tracking-wide transition-all duration-800 delay-200 ${
              textAnimations.features[2] ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>QUALITY ASSURANCE</h3>
            <p className={`text-sm sm:text-base text-stone-600 leading-relaxed px-2 sm:px-0 transition-all duration-800 delay-400 ${
              textAnimations.features[2] ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              Every detail is meticulously crafted with premium materials and exceptional attention to finish.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-1500 ease-out delay-3500 ${
          fogClearing ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-16 scale-95'
        }`}>
          <div className="grid lg:grid-cols-2">
            
            {/* Left Side - Form */}
            <div className="p-6 sm:p-8 lg:p-12">
              <h3 className="text-2xl sm:text-3xl font-light text-stone-900 mb-2 tracking-wide">Let's Start Your Journey</h3>
              <p className="text-stone-600 mb-6 sm:mb-8 text-sm sm:text-base">Tell us about your project and we'll get back to you within 24 hours.</p>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-light text-stone-900 mb-4">Payment Successful!</h4>
                  <p className="text-stone-600 mb-4">
                    Thank you for your payment. We've received your consultation fee and project inquiry.
                  </p>
                  {paymentDetails && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                      <p className="text-sm text-green-700">
                        Transaction ID: {paymentDetails.id}
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        We'll contact you within 24 hours to schedule your consultation.
                      </p>
                    </div>
                  )}
                </div>
              ) : showPayment ? (
                <div className="space-y-6">
                  <div className="text-center py-6 border-b border-stone-200">
                    <h4 className="text-xl font-light text-stone-900 mb-2">Secure Your Consultation</h4>
                    <p className="text-stone-600">
                      Complete your payment to schedule your architectural consultation
                    </p>
                  </div>
                  
                  <PayPalPayment
                    amount={getConsultationFee()}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    disabled={isSubmitting}
                  />
                  
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={() => setShowPayment(false)}
                      variant="outline"
                      className="flex-1 border-stone-300 text-stone-700 hover:bg-stone-50"
                    >
                      Back to Form
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-stone-500">
                    <p>Consultation fee varies by project budget:</p>
                    <div className="mt-2 space-y-1">
                      <p>$50k-$100k: $250 • $100k-$250k: $500</p>
                      <p>$250k-$500k: $750 • $500k+: $1000+</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Full Name *</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full border-stone-300 focus:border-amber-500 focus:ring-amber-500 text-base"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full border-stone-300 focus:border-amber-500 focus:ring-amber-500 text-base"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border-stone-300 focus:border-amber-500 focus:ring-amber-500 text-base"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Project Type *</label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:ring-amber-500 bg-white text-base"
                      >
                        <option value="">Select project type</option>
                        <option value="residential">Residential Design</option>
                        <option value="commercial">Commercial Space</option>
                        <option value="renovation">Renovation</option>
                        <option value="interior">Interior Design</option>
                        <option value="landscape">Landscape Architecture</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:ring-amber-500 bg-white text-base"
                      >
                        <option value="">Select budget range</option>
                        <option value="50k-100k">$50k - $100k</option>
                        <option value="100k-250k">$100k - $250k</option>
                        <option value="250k-500k">$250k - $500k</option>
                        <option value="500k-1m">$500k - $1M</option>
                        <option value="1m+">$1M+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Timeline</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:ring-amber-500 bg-white text-base"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="3-6months">3-6 months</option>
                        <option value="6-12months">6-12 months</option>
                        <option value="1year+">1+ year</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Project Description *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full border-stone-300 focus:border-amber-500 focus:ring-amber-500 text-base"
                      placeholder="Tell us about your vision, requirements, and any specific ideas you have in mind..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-stone-900 hover:bg-amber-600 text-white font-light tracking-wide py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'Continue to Payment'
                    )}
                  </Button>
                  
                  <p className="text-center text-xs sm:text-sm text-stone-500 mt-3 sm:mt-4">
                    You'll be able to review and pay the consultation fee on the next step
                  </p>
                </form>
              )}
            </div>

            {/* Right Side - Image/Content */}
            <div className="bg-gradient-to-br from-stone-900 to-stone-800 p-6 sm:p-8 lg:p-12 flex items-center">
              <div className="text-white">
                <h4 className="text-xl sm:text-2xl font-light mb-4 sm:mb-6 tracking-wide">Why Work With Us?</h4>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 sm:mt-3 mr-3 sm:mr-4 flex-shrink-0"></div>
                    <div>
                      <h5 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Personalized Approach</h5>
                      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                        Every project is unique. We take time to understand your lifestyle, preferences, and dreams.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 sm:mt-3 mr-3 sm:mr-4 flex-shrink-0"></div>
                    <div>
                      <h5 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Award-Winning Team</h5>
                      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                        Our architects and designers have won multiple industry awards for excellence and innovation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 sm:mt-3 mr-3 sm:mr-4 flex-shrink-0"></div>
                    <div>
                      <h5 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Full-Service Solution</h5>
                      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                        From initial concept to final construction, we handle every aspect of your project.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 sm:mt-3 mr-3 sm:mr-4 flex-shrink-0"></div>
                    <div>
                      <h5 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Sustainable Design</h5>
                      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                        We prioritize eco-friendly materials and energy-efficient solutions in all our designs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-stone-700">
                  <p className="text-stone-300 text-xs sm:text-sm mb-3 sm:mb-4">Ready to get started?</p>
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">Call us directly</p>
                      <p className="text-stone-300 text-xs sm:text-sm">+1 (555) 123-ARCH</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 sm:mt-16 transition-all duration-1000 ease-out delay-4000 ${
          fogClearing ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <p className="text-stone-600 text-base sm:text-lg mb-3 sm:mb-4 px-4">
            Have questions? We're here to help every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-light text-stone-900">24hrs</div>
              <div className="text-xs sm:text-sm text-stone-600">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-light text-stone-900">150+</div>
              <div className="text-xs sm:text-sm text-stone-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-light text-stone-900">98%</div>
              <div className="text-xs sm:text-sm text-stone-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-10px) translateX(5px);
          }
          66% {
            transform: translateY(5px) translateX(-5px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
