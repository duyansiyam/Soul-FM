import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/AboutUs'
import NowPlaying from './pages/NowPlaying'
import ShowSchedule from './pages/ShowSchedule'
import CommunityConnections from './pages/CommunityConnections'
import ContactUs from './pages/ContactUs'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <div style={{ overflowX: 'clip' }}>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/now-playing" element={<NowPlaying />} />
        <Route path="/show-schedule" element={<ShowSchedule />} />
        <Route path="/community-connections" element={<CommunityConnections />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App