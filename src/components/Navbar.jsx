import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import logo from '../assets/LOGO-HDNOBG.png'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/now-playing', label: 'Now Playing' },
  { to: '/show-schedule', label: 'Schedule' },
  { to: '/community-connections', label: 'Community' },
]

function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      const prev = lastScrollY.current

      if (currentY <= 80) {
        setVisible(true)
      } else if (currentY < prev - 5) {
        setVisible(true)
      } else if (currentY > prev + 5) {
        setVisible(false)
        setMenuOpen(false)
      }

      setScrolled(currentY > 20)
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{ fontFamily: 'var(--font-body)' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${visible ? 'translate-y-0' : '-translate-y-full'}
        ${scrolled || menuOpen
          ? 'border-b border-white/[0.05] bg-[var(--color-soul-black)]/98 backdrop-blur-2xl'
          : 'border-b border-transparent bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

        <Link to="/" className="group">
          <img
            src={logo}
            alt="SoulFM"
            className="h-9 w-auto object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-300"
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-1 list-none">
          {navLinks.map(({ to, label }) => {
            const active = location.pathname === to
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`relative block px-4 py-2 text-[12px] tracking-[0.08em] uppercase rounded-md
                    transition-all duration-200 ease-out
                    hover:scale-105 hover:brightness-125
                    ${active ? 'text-white' : 'text-white/60 hover:text-white'}`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-4 h-px bg-[var(--color-soul-accent)] rounded-full" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            to="/contact-us"
            className="hidden sm:block relative text-[11px] tracking-[0.12em] uppercase
              px-4 py-2 rounded-md font-semibold
              bg-white text-black
              hover:bg-black hover:text-white hover:scale-105
              border border-white
              transition-all duration-200 ease-out"
          >
            Get In Touch
           <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-red-600 border border-white/40" />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-white/50 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-white/50 transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : ''}`} />
            <span className={`block w-5 h-px bg-white/50 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${menuOpen ? 'max-h-80 border-t border-white/[0.04]' : 'max-h-0'}`}>
        <ul className="px-6 py-4 flex flex-col gap-0.5 list-none">
          {navLinks.map(({ to, label }) => {
            const active = location.pathname === to
            return (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2.5 text-[12px] tracking-[0.08em] uppercase rounded-md
                    transition-all duration-150
                    ${active ? 'text-white' : 'text-white/55 hover:text-white'}`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
          <li className="mt-2 pt-3 border-t border-white/[0.04]">
            <Link
              to="/contact-us"
              onClick={() => setMenuOpen(false)}
              className="inline-block relative px-4 py-2 text-[11px] tracking-[0.12em] uppercase font-semibold
                bg-white text-black rounded-md border border-white
                hover:bg-black hover:text-white
                transition-all duration-150"
            >
              Get In Touch
              <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-red-600 border border-white/40" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar