import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import logo from '../assets/SOULFM_logo.png'

function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-[#080808] text-soul-white">
      {/* background glow */}
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-(--color-soul-accent)/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-(--color-soul-accent-dim)/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          
          {/* Brand */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-18 w-18 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                <img
                  src={logo}
                  alt="SOULFM Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>

              <div>
                <h2 className="font-(--font-heading) text-3xl tracking-[0.08em] text-white">
                  SOULFM
                </h2>
                <p className="mt-1 text-sm tracking-[0.08em] text-white/55">
                  Feel the rhythm. Live the soul.
                </p>
              </div>
            </div>

            <p className="max-w-md text-[15px] leading-7 text-white/70">
              SoulFM connects listeners to timeless music, meaningful stories,
              and a vibrant community. Tune in for soulful sound, smooth energy,
              and a station that brings people together.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/639000000000"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-300 hover:-translate-y-1 hover:border-(--color-soul-accent) hover:bg-(--color-soul-accent)"
              >
                <FaWhatsapp size={17} />
              </a>

              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-300 hover:-translate-y-1 hover:border-(--color-soul-accent) hover:bg-(--color-soul-accent)"
              >
                <FaFacebookF size={15} />
              </a>

              <a
                href="https://tiktok.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-300 hover:-translate-y-1 hover:border-(--color-soul-accent) hover:bg-(--color-soul-accent)"
              >
                <FaTiktok size={15} />
              </a>

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-300 hover:-translate-y-1 hover:border-(--color-soul-accent) hover:bg-(--color-soul-accent)"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-white">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3 text-[15px] text-white/70">
              <Link to="/" className="transition hover:translate-x-1 hover:text-white">
                Home
              </Link>
              <Link to="/about" className="transition hover:translate-x-1 hover:text-white">
                About
              </Link>
              <Link to="/now-playing" className="transition hover:translate-x-1 hover:text-white">
                Now Playing
              </Link>
              <Link to="/show-schedule" className="transition hover:translate-x-1 hover:text-white">
                Show Schedule
              </Link>
              <Link
                to="/community-connections"
                className="transition hover:translate-x-1 hover:text-white"
              >
                Community Connections
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-white">
              Contact
            </h4>

            <div className="flex flex-col gap-3 text-[15px] text-white/70">
              <a
                href="mailto:contact@soulfm.com"
                className="transition hover:text-white"
              >
                contact@soulfm.com
              </a>

              <a
                href="https://wa.me/639000000000"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                +63 900 000 0000
              </a>

              <p className="leading-7">
                San Bernardino, California, USA
              </p>
            </div>
          </div>
        </div>

        <div className="my-8 h-px w-full bg-linear-to-r from-transparent via-white/15 to-transparent" />

        <div className="flex flex-col gap-3 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 SOULFM. All rights reserved.</p>
          <p>Designed to keep the soul playing.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer