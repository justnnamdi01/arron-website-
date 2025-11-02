import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function ArchitectPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 relative">
            <div className="absolute inset-0 bg-[url('/placeholder.jpg')] bg-cover bg-center opacity-20"></div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <div className="w-20 h-px bg-white/60 mx-auto mb-8"></div>
            <h1 className="text-6xl md:text-8xl font-light tracking-wider leading-tight mb-6">
              ABOUT
              <br />
              <span className="text-amber-400">OUR ARCHITECT</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/90 tracking-wide max-w-2xl mx-auto leading-relaxed">
              Visionary design meets extraordinary craftsmanship through decades of architectural excellence
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/30"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/30"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30"></div>
      </section>

      {/* About Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left - Image */}
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Lead Architect"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-light text-stone-900">25+</div>
                    <div className="text-sm text-stone-600">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-light text-stone-900">150+</div>
                    <div className="text-sm text-stone-600">Projects Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-8">
              <div>
                <div className="w-16 h-px bg-stone-900 mb-6"></div>
                <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6 tracking-wide">
                  Meet Our
                  <br />
                  <span className="text-amber-600">Lead Architect</span>
                </h2>
                <h3 className="text-2xl font-light text-stone-600 mb-6">
                  Sarah Mitchell, AIA, LEED AP
                </h3>
              </div>

              <div className="space-y-6 text-lg text-stone-700 leading-relaxed">
                <p>
                  With over 25 years of experience in architectural design, Sarah Mitchell has established herself 
                  as one of the most innovative and respected architects in the industry. Her passion for creating 
                  spaces that seamlessly blend functionality with aesthetic beauty has earned her numerous awards 
                  and recognition worldwide.
                </p>
                
                <p>
                  Sarah's design philosophy centers around the belief that architecture should enhance human 
                  experience while respecting the natural environment. She specializes in sustainable design 
                  practices and has been instrumental in pioneering eco-friendly building techniques that 
                  reduce environmental impact without compromising on luxury or comfort.
                </p>
                
                <p>
                  Her portfolio spans from intimate residential projects to large-scale commercial developments, 
                  each bearing her signature attention to detail and commitment to excellence. Sarah holds a 
                  Master's degree in Architecture from MIT and is a registered architect in multiple states.
                </p>
              </div>

              {/* Credentials */}
              <div className="grid md:grid-cols-2 gap-6 pt-8 border-t border-stone-200">
                <div>
                  <h4 className="font-medium text-stone-900 mb-3">Education</h4>
                  <ul className="space-y-2 text-stone-700">
                    <li>• M.Arch, MIT School of Architecture</li>
                    <li>• B.A. Architecture, Yale University</li>
                    <li>• LEED Accredited Professional</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-stone-900 mb-3">Certifications</h4>
                  <ul className="space-y-2 text-stone-700">
                    <li>• American Institute of Architects (AIA)</li>
                    <li>• NCARB Certified</li>
                    <li>• Sustainable Design Specialist</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-20 h-px bg-stone-900 mx-auto mb-8"></div>
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6 tracking-wide">
              Awards & <span className="text-amber-600">Recognition</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Excellence recognized by leading architectural institutions and design communities worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Award 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-4 text-center">AIA Gold Medal</h3>
              <p className="text-stone-600 text-center leading-relaxed">
                Highest honor from the American Institute of Architects for outstanding contribution to architecture
              </p>
              <div className="text-center mt-4">
                <span className="text-sm text-amber-600 font-medium">2023</span>
              </div>
            </div>

            {/* Award 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-4 text-center">Green Building Award</h3>
              <p className="text-stone-600 text-center leading-relaxed">
                Recognition for pioneering sustainable architecture and environmental design innovation
              </p>
              <div className="text-center mt-4">
                <span className="text-sm text-green-600 font-medium">2022</span>
              </div>
            </div>

            {/* Award 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-4 text-center">Design Excellence</h3>
              <p className="text-stone-600 text-center leading-relaxed">
                International recognition for outstanding residential design and client satisfaction
              </p>
              <div className="text-center mt-4">
                <span className="text-sm text-blue-600 font-medium">2021</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-px bg-stone-900 mx-auto mb-8"></div>
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-8 tracking-wide">
            Design <span className="text-amber-600">Philosophy</span>
          </h2>
          
          <blockquote className="text-2xl md:text-3xl font-light text-stone-700 leading-relaxed mb-8 italic">
            "Architecture is not just about creating beautiful spaces—it's about understanding how people live, 
            work, and dream, then crafting environments that enhance every moment of their lives."
          </blockquote>
          
          <div className="flex items-center justify-center">
            <div className="w-16 h-px bg-amber-600"></div>
            <span className="px-4 text-stone-600 font-medium">Sarah Mitchell</span>
            <div className="w-16 h-px bg-amber-600"></div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-stone-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-wide">
            Ready to Work <span className="text-amber-400">Together?</span>
          </h2>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Let's discuss your vision and create something extraordinary together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-medium tracking-wide transition-all duration-300 hover:scale-105">
              Schedule Consultation
            </button>
            <button className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium tracking-wide transition-all duration-300 hover:scale-105">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
