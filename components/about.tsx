export function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-wider text-stone-900 mb-8">ABOUT ENOU</h2>
              <div className="w-16 h-px bg-stone-900 mb-8"></div>
              <p className="text-stone-600 font-light leading-relaxed mb-6">
                ENOU is a studio devoted to architecture as an experience—spaces shaped by light, proportion, and material.
                Our portfolio spans intimate residences to ambitious developments, unified by clarity, craft, and restraint.
              </p>
              <p className="text-stone-600 font-light leading-relaxed">
                This website is our living showcase: built work, design research, and visual narratives.
                Explore the projects to see process, detail, and the ideas that guide our practice.
              </p>
            </div>
            <div className="bg-stone-100 aspect-square"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
