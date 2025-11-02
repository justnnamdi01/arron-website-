export function Services() {
  const services = [
    {
      title: "ARCHITECTURAL DESIGN",
      description: "Comprehensive design solutions from concept to completion",
    },
    {
      title: "INTERIOR DESIGN",
      description: "Thoughtful interior spaces that reflect your vision",
    },
    {
      title: "URBAN PLANNING",
      description: "Strategic planning for sustainable urban development",
    },
    {
      title: "CONSULTATION",
      description: "Expert guidance throughout your project journey",
    },
  ]

  return (
    <section id="services" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider text-stone-900 mb-8">SERVICES</h2>
            <div className="w-16 h-px bg-stone-900 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-light tracking-wide text-stone-900 mb-4">{service.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
