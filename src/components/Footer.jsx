import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-overlay">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-row">
              <img src={logo} alt="SOULFM Logo" className="footer-logo" />
              <h2>SOULFM</h2>
            </div>

            <div className="footer-message">
              <h3>Stay connected with SoulFM.</h3>
              <p>contact@soulfm.com</p>
            </div>
          </div>

          <div className="footer-links-column">
            <h4>Discover</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/now-playing">Now Playing</Link>
              <Link to="/show-schedule">Show Schedule</Link>
              <Link to="/community-connections">Community Connections</Link>
            </div>
          </div>
        </div>

        <div className="footer-line"></div>

        <div className="footer-bottom">
          <p>© 2026 SOULFM. All rights reserved.</p>
          <p>contact@soulfm.com</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer