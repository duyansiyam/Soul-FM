import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()

  const from =
    location.state?.from?.pathname || `${BASE}/dashboard`

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      )

      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">

          <div className="inline-block text-xs font-semibold text-gray-600 border border-gray-200 rounded px-3 py-1 mb-6 uppercase tracking-wider">
            Admin Access
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Console
          </h1>

          <div className="w-12 h-1 bg-red-600 rounded mb-6" />

          <p className="text-sm text-gray-500 uppercase tracking-wide mb-8">
            Authorized personnel only
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="admin@soulfm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center gap-2">
                <span>⚠</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 uppercase tracking-wide text-sm"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p className="mt-8 text-xs text-gray-400 text-center uppercase tracking-wider">
            Ticket Management System · Internal Use Only
          </p>
        </div>
      </div>
    </div>
  )
}