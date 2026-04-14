export default function ValuesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 border-t border-white/4">
      <div className="grid lg:grid-cols-3 gap-12">
        <div>
          <p className="text-[9px] tracking-[0.22em] uppercase text-white/20 mb-4">Values</p>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.5rem',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
            className="text-white/75"
          >
            What drives<br /><em>Soul FM</em>
          </h2>
        </div>
        <div className="lg:col-span-2 space-y-6 text-white/30 text-sm leading-relaxed font-light">
          <p>
            Soul FM is more than just a radio station — it's a community of music lovers in San Bernardino.
            We cherish the city's vibrant culture and strive to reflect its energy in every broadcast.
          </p>
          <p>
            Our commitment to quality sound and engaging content ensures that every listener feels connected
            to the music they love. With a nod to the past and an eye on the future, we blend nostalgia
            with innovation to create an unforgettable listening experience.
          </p>
          <div className="pt-4">
            <a
              href="tel:9098930169"
              className="text-[11px] tracking-[0.12em] uppercase text-white/20 hover:text-white/50 transition-colors duration-200 border-b border-white/8 pb-1"
            >
              Call us — (909) 893-0169
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
