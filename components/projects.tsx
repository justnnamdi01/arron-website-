export function Projects() {
  const projects = [
    { title: "RESIDENTIAL COMPLEX", location: "NEW YORK" },
    { title: "CULTURAL CENTER", location: "LONDON" },
    { title: "OFFICE BUILDING", location: "TOKYO" },
    { title: "PRIVATE RESIDENCE", location: "PARIS" },
  ]

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider text-stone-900 mb-8">PROJECTS</h2>
            <div className="w-16 h-px bg-stone-900 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-stone-100 aspect-[4/3] mb-6 group-hover:bg-stone-200 transition-colors"></div>
                <h3 className="text-xl font-light tracking-wide text-stone-900 mb-2">{project.title}</h3>
                <p className="text-stone-600 font-light">{project.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
