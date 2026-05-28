import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const BASE = import.meta.env.VITE_ADMIN_BASE || '/admin';

export default function AdminProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-900 font-mono text-sm tracking-widest">
        AUTHENTICATING...
      </div>
    );
  }

  if (!admin) {
    return <Navigate to={`${BASE}/login`} state={{ from: location }} replace />;
  }

  return children;
}
