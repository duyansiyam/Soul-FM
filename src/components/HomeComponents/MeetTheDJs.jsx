import { Link } from 'react-router-dom'
import cardImg4 from '../../assets/card-djs.jpg'

export default function MeetTheDJs() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
      <div
        className="grid grid-cols-2 rounded-2xl overflow-hidden border border-white/6 bg-[#141414]"
        style={{ height: '340px' }}
      >
        <div className="p-10 flex flex-col justify-between">
          <div>
            <p className="text-[9px] tracking-[0.22em] uppercase text-white/20 mb-3">The Team</p>
            <h2
              className="text-white/85 mb-4 leading-tight"
              style={{
                fontFamily:    'var(--font-heading)',
                fontSize:      'clamp(1.8rem, 4vw, 3rem)',
                fontWeight:    400,
                letterSpacing: '-0.02em',
              }}
            >
              Meet the DJs
            </h2>
          </div>
          <Link
            to="/meet-our-djs"
            className="self-start text-[11px] tracking-[0.14em] uppercase text-white/20 hover:text-white/60 transition-colors duration-200 border-b border-white/10 hover:border-white/25 pb-0.5"
          >
            Explore →
          </Link>
        </div>

        <div className="relative overflow-hidden">
          <img
            src={cardImg4}
            alt="Meet the DJs"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#141414]/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}