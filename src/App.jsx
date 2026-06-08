import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'

// Public Pages
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
import MeetOurDJsPage from './pages/MeetOurDJs'
import Events from './pages/Events'

// Admin
import { AdminAuthProvider } from './admin/context/AdminAuthContext'
import AdminProtectedRoute from './admin/components/AdminProtectedRoute'
import AdminLayout from './admin/components/AdminLayout'

import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminEvents from './admin/pages/AdminEvents'
import AdminEventDetails from './admin/pages/AdminEventDetails'
import AdminTicketType from './admin/pages/AdminTicketType'
import AdminOrders from './admin/pages/AdminOrders'
import AdminUsers from './admin/pages/AdminUsers'
import AdminSettings from './admin/pages/AdminSettings'

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
        <Route path="/community-connections" element={<CommunityConnections />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/events" element={<Events />} />
      </Routes>

      <Footer />
      <CookieBanner />
    </>
  )
}

function AdminPage({ children }) {
  return (
    <AdminProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </AdminProtectedRoute>
  )
}

function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith(ADMIN_BASE)

  useEffect(() => {
    document.body.classList.toggle('admin-section', isAdmin)

    return () => {
      document.body.classList.remove('admin-section')
    }
  }, [isAdmin])

  return (
    <div style={{ overflowX: isAdmin ? 'unset' : 'clip' }}>
      <ScrollToTop />

      <AdminAuthProvider>
        <Routes>
          {/* Admin Login */}
          <Route path={`${ADMIN_BASE}/login`} element={<AdminLogin />} />

          {/* Admin Redirect */}
          <Route
            path={ADMIN_BASE}
            element={<Navigate to={`${ADMIN_BASE}/dashboard`} replace />}
          />

          {/* Admin Pages */}
          <Route
            path={`${ADMIN_BASE}/dashboard`}
            element={
              <AdminPage>
                <AdminDashboard />
              </AdminPage>
            }
          />

          <Route
            path={`${ADMIN_BASE}/dashboard/:eventId`}
            element={
              <AdminPage>
                <AdminDashboard />
              </AdminPage>
            }
          />

          <Route
            path={`${ADMIN_BASE}/events`}
            element={
              <AdminPage>
                <AdminEvents />
              </AdminPage>
            }
          />
          <Route
  path={`${ADMIN_BASE}/event-details`}
  element={
    <AdminPage>
      <AdminEventDetails />
    </AdminPage>
  }
/>

          <Route
  path={`${ADMIN_BASE}/event-details/:eventId`}
  element={
    <AdminPage>
      <AdminEventDetails />
    </AdminPage>
  }
/>

<Route
  path={`${ADMIN_BASE}/ticket-types/:eventId`}
  element={
    <AdminPage>
      <AdminTicketType />
    </AdminPage>
  }
/>

<Route
  path={`${ADMIN_BASE}/ticket-types`}
  element={
    <AdminPage>
      <AdminTicketType />
    </AdminPage>
  }
/>

<Route
  path={`${ADMIN_BASE}/orders/:eventId`}
  element={
    <AdminPage>
      <AdminOrders />
    </AdminPage>
  }
/>

          <Route
            path={`${ADMIN_BASE}/users`}
            element={
              <AdminPage>
                <AdminUsers />
              </AdminPage>
            }
          />

          <Route
            path={`${ADMIN_BASE}/settings`}
            element={
              <AdminPage>
                <AdminSettings />
              </AdminPage>
            }
          />

          {/* Public Website */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </AdminAuthProvider>
    </div>
  )
}

export default App
