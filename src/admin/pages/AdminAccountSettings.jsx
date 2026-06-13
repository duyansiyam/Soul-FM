import { useState } from 'react'
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth'
import { auth } from '../../firebase'

const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

export default function AdminAccountSettings() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match')
      return
    }

    const user = auth.currentUser
    if (!user || !user.email) {
      setError('No signed-in user found')
      return
    }

    setLoading(true)
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPassword)
      await reauthenticateWithCredential(user, cred)
      await updatePassword(user, newPassword)
      setSuccess('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      console.error(err)
      setError('Failed to update password. Check your current password and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-xl bg-[#0b1220] border border-white/6 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-1">Account Settings</h2>
        <p className="text-sm text-white/60 mb-6">Manage your account and change your password.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-white/60 mb-2">Current password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-white/3 text-white placeholder-white/40 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-2">New password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 rounded bg-white/3 text-white placeholder-white/40 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-2">Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 rounded bg-white/3 text-white placeholder-white/40 focus:outline-none"
            />
          </div>

          {error && (
            <div className="text-sm text-red-400">{error}</div>
          )}

          {success && (
            <div className="text-sm text-green-400">{success}</div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white px-4 py-2 rounded"
            >
              {loading ? 'Updating...' : 'Change password'}
            </button>

            <a href={BASE} className="text-sm text-white/50 hover:text-white">Back to dashboard</a>
          </div>
        </form>
      </div>
    </div>
  )
}
