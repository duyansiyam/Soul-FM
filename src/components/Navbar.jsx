import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LEFT LOGO */}
        <div className="navbar-logo">
          <img src={logo} alt="SOULFM Logo" className="logo" />
          <h2>SOULFM</h2>
        </div>

        {/* CENTER MENU */}
        <div className="nav-center">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/now-playing">Now Playing</Link></li>
            <li><Link to="/show-schedule">Show Schedule</Link></li>
            <li><Link to="/community-connections">Community Connections</Link></li>
          </ul>
        </div>

        {/* RIGHT BUTTON */}
        <Link to="/contact-us" className="nav-button">
          Contact Us →
        </Link>

      </div>
    </nav>
  )
}

export default Navbar