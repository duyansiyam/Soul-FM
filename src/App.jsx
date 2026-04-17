import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'

import Home from './pages/Home'
import About from './pages/AboutUs'
import NowPlaying from './pages/NowPlaying'
import ShowSchedule from './pages/ShowSchedule'
import CommunityConnections from './pages/CommunityConnections'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/now-playing" element={<NowPlaying />} />
        <Route path="/show-schedule" element={<ShowSchedule />} />
        <Route path="/community-connections" element={<CommunityConnections />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />
      <CookieBanner />
    </>
  )
}

export default App