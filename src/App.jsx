import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Public app
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/AboutUs'
import NowPlaying from './pages/NowPlaying'
import ShowSchedule from './pages/ShowSchedule'
import CommunityConnections from './pages/CommunityConnections'
import ContactUs from './pages/ContactUs'
import CookieBanner from './components/CookieBanner'
import PrivacyPolicy from './pages/PrivacyPolicy'
import MeetOurDJsPage from './pages/MeetOurDJs'
import Events from './pages/Events.jsx'

// Admin panel
import { AdminAuthProvider } from './admin/context/AdminAuthContext'
import AdminProtectedRoute from './admin/components/AdminProtectedRoute'
import AdminLayout from './admin/components/AdminLayout'
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminEvents from './admin/pages/AdminEvents'

const ADMIN_BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function PublicLayout() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/meet-our-djs" element={<MeetOurDJsPage />} />
        <Route path="/now-playing" element={<NowPlaying />} />
        <Route path="/show-schedule" element={<ShowSchedule />} />
        <Route
          path="/community-connections"
          element={<CommunityConnections />}
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/events" element={<Events />} />
      </Routes>

      <Footer />
      <CookieBanner />
    </>
  )
}

function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith(ADMIN_BASE)

  return (
    <div style={{ overflowX: isAdmin ? 'unset' : 'clip' }}>
      <ScrollToTop />

      <AdminAuthProvider>
        <Routes>
          <Route path={`${ADMIN_BASE}/login`} element={<AdminLogin />} />

          <Route
            path={`${ADMIN_BASE}/*`}
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="dashboard/:eventId" element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
          </Route>

          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </AdminAuthProvider>
    </div>
  )
}

export default App