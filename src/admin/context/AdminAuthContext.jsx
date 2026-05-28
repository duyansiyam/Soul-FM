import { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const profile = localStorage.getItem('admin_profile');
    if (token && profile) {
      setAdmin(JSON.parse(profile));
    }
    setLoading(false);
  }, []);

  const login = async (uid) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid }),
    });
    if (!res.ok) throw new Error('Login failed');
    const { token } = await res.json();

    // Fetch profile to verify role
    const profileRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!profileRes.ok) throw new Error('Could not fetch profile');
    const profile = await profileRes.json();

    if (profile.role !== 'admin') throw new Error('Access denied: not an admin');

    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_profile', JSON.stringify(profile));
    setAdmin(profile);
    return profile;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_profile');
    setAdmin(null);
  };

  const getToken = () => localStorage.getItem('admin_token');

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout, getToken }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
