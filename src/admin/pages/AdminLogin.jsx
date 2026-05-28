import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const BASE = import.meta.env.VITE_ADMIN_BASE || '/admin';

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || `${BASE}/dashboard`;

  const [uid, setUid] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(uid.trim());
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
          {/* Badge */}
          <div className="inline-block text-xs font-semibold text-gray-600 border border-gray-200 rounded px-3 py-1 mb-6 uppercase tracking-wider">
            Admin Access
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Console
          </h1>

          {/* Divider */}
          <div className="w-12 h-1 bg-blue-600 rounded mb-6" />

          {/* Subtitle */}
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-8">
            Authorized personnel only
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Label */}
            <div>
              <label htmlFor="uid" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                User ID
              </label>
              
              {/* Input */}
              <input
                id="uid"
                type="text"
                placeholder="Enter your UID"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                required
                autoComplete="off"
                spellCheck={false}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center gap-2">
                <span>⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105 active:scale-100 uppercase tracking-wide text-sm"
            >
              {loading ? 'Verifying...' : 'Authenticate →'}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-xs text-gray-400 text-center uppercase tracking-wider">
            Ticket Management System · Internal Use Only
          </p>
        </div>
      </div>
    </div>
  );
}
