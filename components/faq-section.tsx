"use client"

import { useState } from "react"

interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What services do you offer as an architecture firm?",
    answer: "We provide comprehensive architectural services including conceptual design, detailed floor plans, 3D visualization, construction documentation, building permits assistance, project management, and construction administration. We specialize in residential, commercial, and sustainable design projects.",
    category: "Services"
  },
  {
    id: 2,
    question: "How long does the design process typically take?",
    answer: "The timeline varies depending on project complexity. A typical residential project takes 8-16 weeks from initial consultation to final construction documents. Commercial projects may take 12-24 weeks. We'll provide a detailed timeline during our initial consultation based on your specific requirements.",
    category: "Process"
  },

  {
    id: 5,
    question: "Can you work with my existing contractor or do you have preferred builders?",
    answer: "We're happy to work with your chosen contractor and believe collaboration leads to the best results. We also have a network of trusted contractors and builders we can recommend if needed. Our goal is to ensure seamless communication throughout the construction process.",
    category: "Construction"
  },
  {
    id: 6,
    question: "What makes your approach to sustainable design unique?",
    answer: "We integrate sustainability from the earliest design phases, focusing on passive solar design, energy-efficient systems, sustainable materials, and long-term environmental impact. Our designs typically achieve 40% energy savings and significantly reduce carbon footprint while maintaining aesthetic excellence.",
    category: "Sustainability"
  },
  {
    id: 7,
    question: "Do you provide 3D renderings and virtual walkthroughs?",
    answer: "Absolutely! We use cutting-edge 3D modeling and visualization technology to help you fully understand your project before construction begins. This includes photorealistic renderings, virtual reality walkthroughs, and interactive 3D models that allow you to explore every detail of your future space.",
    category: "Visualization"
  },
  {
    id: 8,
    question: "How involved will I be in the design process?",
    answer: "You're at the center of our collaborative design process. We conduct regular design consultations, provide multiple design options, incorporate your feedback at every stage, and ensure the final design perfectly reflects your vision, lifestyle, and functional requirements.",
    category: "Process"
  },
  {
    id: 9,
    question: "What happens if changes are needed during construction?",
    answer: "We provide ongoing construction administration services to address any changes or issues that arise. Our team is available to clarify design intent, review contractor questions, and manage change orders while keeping you informed of any impacts on timeline or budget.",
    category: "Construction"
  },
  {
    id: 10,
    question: "Do you work on renovation and addition projects?",
    answer: "Yes, we have extensive experience with renovations, additions, and adaptive reuse projects. We specialize in seamlessly integrating new elements with existing structures while respecting the original architecture and enhancing functionality for modern living.",
    category: "Services"
  }
]

const categories = ["All", "Services", "Process", "Construction", "Sustainability", "Visualization"]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [activeCategory, setActiveCategory] = useState("All")

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQs = activeCategory === "All" 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-px bg-stone-900"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6 tracking-wide">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            Get answers to the most common questions about our architectural services, 
            design process, and what to expect when working with our team.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-stone-900 text-white shadow-lg'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item) => (
            <div
              key={item.id}
              className="border border-stone-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between bg-white hover:bg-stone-50 transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-stone-600 bg-stone-100 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-stone-900 leading-relaxed">
                    {item.question}
                  </h3>
                </div>
                <div className="ml-6 flex-shrink-0">
                  {openItems.includes(item.id) ? (
                    <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-8 pb-6 bg-stone-50">
                  <div className="pt-4 border-t border-stone-200">
                    <p className="text-stone-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-stone-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-light text-stone-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
              We're here to help! Contact us for a complimentary consultation 
              where we can discuss your specific project needs and answer any 
              additional questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-stone-900 text-white px-8 py-3 rounded-lg hover:bg-stone-800 transition-colors duration-200 font-medium">
                Schedule Consultation
              </button>
              <button className="border border-stone-300 text-stone-700 px-8 py-3 rounded-lg hover:border-stone-400 hover:bg-stone-50 transition-all duration-200 font-medium">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 pt-12 border-t border-stone-200">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-stone-900 mb-2">Project Portfolio</h4>
              <p className="text-stone-600 text-sm">
                Explore our completed projects and see our design approach in action.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-stone-900 mb-2">Live Chat</h4>
              <p className="text-stone-600 text-sm">
                Get instant answers to quick questions through our chat system.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-stone-900 mb-2">Design Guide</h4>
              <p className="text-stone-600 text-sm">
                Download our comprehensive guide to the architectural design process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
