import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import logo from '../assets/LOGO-HDNOBG.png'

function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#0a0a0a] text-white">

      {/* ── Layered ambient glows ── */}
      <div className="pointer-events-none absolute -left-40 -top-20 h-125 w-125 rounded-full bg-[#c0392b]/10 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 top-10 h-100 w-100 rounded-full bg-[#8b1a12]/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-175 rounded-full bg-[#c0392b]/8 blur-[120px]" />

      {/* ── Animated shimmer top border ── */}
      <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, transparent 20%, #c0392b 50%, transparent 80%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmerLine 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* ── Noise texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── Diagonal grid lines ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.5) 40px,
            rgba(255,255,255,0.5) 41px
          )`,
        }}
      />

      <style>{`
        @keyframes shimmerLine {
          0% { background-position: -100% 0; }
          50% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGold {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .footer-col { animation: fadeSlideUp 0.7s ease both; }
        .footer-col:nth-child(1) { animation-delay: 0.05s; }
        .footer-col:nth-child(2) { animation-delay: 0.15s; }
        .footer-col:nth-child(3) { animation-delay: 0.25s; }

        .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: rgb(255, 255, 255);
          font-size: 13.5px;
          letter-spacing: 0.04em;
          transition: color 0.25s ease;
          text-decoration: none;
        }
        .nav-link::before {
          content: '';
          display: block;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #c0392b, #c0392b);
          transition: width 0.3s ease;
          flex-shrink: 0;
        }
        .nav-link:hover { color: rgba(255,255,255,0.95); }
        .nav-link:hover::before { width: 18px; }

        .social-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: rgb(255, 255, 255);
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }
        .social-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #c0392b33, #c0392b22);
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: 50%;
        }
        .social-btn:hover {
          transform: translateY(-3px) scale(1.08);
          border-color: #c0392b88;
          color: #c0392b;
          box-shadow: 0 8px 24px rgba(192,57,43,0.25), 0 0 0 1px rgba(192,57,43,0.15);
        }
        .social-btn:hover::before { opacity: 1; }

        .contact-row {
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.055);
          transition: border-color 0.3s;
        }
        .contact-row:last-child { border-bottom: none; padding-bottom: 0; }
        .contact-row:hover { border-color: rgba(184,134,11,0.25); }

        .gold-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #c0392b;
          animation: pulseGold 2.5s ease-in-out infinite;
          flex-shrink: 0;
        }

        .footer-logo {
          filter: drop-shadow(0 0 18px rgba(192,57,43,0.2));
          transition: filter 0.4s ease, transform 0.4s ease;
        }
        .footer-logo:hover {
          filter: drop-shadow(0 0 28px rgba(192,57,43,0.4));
          transform: scale(1.02);
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(192,57,43,0.3) 30%, rgba(192,57,43,0.2) 50%, rgba(192,57,43,0.3) 70%, transparent);
        }

        .section-label {
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #c0392b, #c0392b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-label::after {
          content: '';
          display: block;
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(192,57,43,0.3), transparent);
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr]">

          {/* Brand */}
          <div className="footer-col">
            <img
              src={logo}
              alt="Soul FM"
              className="footer-logo mb-8 h-16 w-auto object-contain"
            />

            <p
              className="max-w-xs text-[13.5px] leading-[1.9] tracking-wide"
              style={{ color: 'rgb(255, 255, 255)' }}
            >
              Soul FM connects listeners to timeless music, meaningful stories,
              and a vibrant community. Tune in for soulful sound, smooth energy,
              and a station that brings people together.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://www.facebook.com/people/Just-Doin-It-Entertainment/61560795483236"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="social-btn"
              >
                <FaFacebookF size={13} />
              </a>
              <a
                href="https://instagram.com/listensoulfm"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="social-btn"
              >
                <FaInstagram size={14} />
              </a>

              {/* Live indicator */}
              <div
                className="ml-3 flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{
                  background: 'rgba(192,57,43,0.08)',
                  border: '1px solid rgba(192,57,43,0.2)',
                }}
              >
                <span className="gold-dot" />
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.16em]"
                  style={{ color: '#e2301c' }}
                >
                  On Air
                </span>
              </div>
            </div>
          </div>

                  {/* Quick Links */}
<div className="footer-col">
  <div className="section-label">Quick Links</div>

  <nav className="flex flex-col gap-3.5">
    <Link to="/" className="nav-link">Home</Link>

    <Link to="/about" className="nav-link">About</Link>

    <a href="/about#djs" className="nav-link">
      Meet The DJ's
    </a>

    <Link to="/now-playing" className="nav-link">Now Playing</Link>
    <Link to="/show-schedule" className="nav-link">Show Schedule</Link>

    <Link to="/contact-us" className="nav-link">Contact Us</Link>
    <Link to="/privacy-policy" className="nav-link">Privacy Policy</Link>
  </nav>
</div>

          {/* Contact */}
          <div className="footer-col">
            <div className="section-label">Get In Touch</div>

            <div className="flex flex-col gap-4">
              <div className="contact-row">
                <p className="mb-1.5 text-[9.5px] font-medium uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Call Us
                </p>
                <a
                  href="tel:+19097479521"
                  className="text-[14px] font-light tracking-wide transition-colors duration-200"
                  style={{ color: 'rgb(255, 255, 255)' }}
                  onMouseEnter={e => (e.target.style.color = '#e8c060')}
                  onMouseLeave={e => (e.target.style.color = 'rgb(255, 255, 255)')}
                >
                  (909) 747-9521
                </a>
              </div>

              <div className="contact-row">
                <p className="mb-1.5 text-[9.5px] font-medium uppercase tracking-[0.18em]" style={{ color: 'rgb(255, 255, 255)' }}>
                  Our Location
                </p>
                <p className="text-[14px] font-light leading-6 tracking-wide" style={{ color: 'rgb(255, 255, 255)' }}>
                  San Bernardino, CA<br />92411
                </p>
              </div>

              <div className="contact-row">
                <p className="mb-1.5 text-[9.5px] font-medium uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Hours
                </p>
                <p className="text-[14px] font-light leading-6 tracking-wide" style={{ color: 'rgb(255, 255, 255)' }}>
                  Mon – Sun<br />7:00 am – 10:00 pm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-line my-12" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 text-[11.5px] tracking-widest md:flex-row md:items-center md:justify-between">
          <p style={{ color: 'rgb(255, 255, 255)' }}>
            Copyright © 2026 Soul FM&nbsp;&nbsp;|&nbsp;&nbsp;All Rights Reserved
          </p>
          <p
            className="italic"
            style={{
              color: 'rgb(255, 255, 255)',
              letterSpacing: '0.1em',
            }}
          >
            Feel the rhythm. Live the soul.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer