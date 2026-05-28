import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const BASE = import.meta.env.VITE_ADMIN_BASE || '/admin';

const NAV_ITEMS = [
  { label: 'Dashboard',   icon: '▣', path: `${BASE}/dashboard` },
  { label: 'Tickets',     icon: '◈', path: `${BASE}/tickets`   },
  { label: 'Users',       icon: '◉', path: `${BASE}/users`     },
  { label: 'Events',      icon: '◆', path: `${BASE}/events`    },
  { label: 'DJs',         icon: '◎', path: `${BASE}/djs`       },
  { label: 'Settings',    icon: '⚙', path: `${BASE}/settings`  },
];

export default function AdminSidebar() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(`${BASE}/login`);
  };

  return (
    <aside className="w-[220px] min-h-screen bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 bottom-0 z-50">
      {/* Logo Section */}
      <div className="px-6 py-7 border-b border-gray-200">
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          Admin Panel
        </div>
        <div className="text-base font-bold text-gray-900 -tracking-tight">
          TicketMgr
        </div>
      </div>

      {/* Navigation */}
      <ul className="flex-1 py-4 list-none">
        {NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <NavLink 
              to={item.path} 
              end={item.path.endsWith('dashboard')}
              className={({ isActive }) => `
                flex items-center gap-3 px-6 py-2.5 text-xs uppercase tracking-widest no-underline transition-all border-l-2 border-transparent
                ${isActive 
                  ? 'text-blue-600 bg-blue-50 border-l-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <span className="w-4.5 text-center text-sm">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Profile Section */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="text-xs text-gray-700 truncate mb-1 font-medium">
          {admin?.displayName || admin?.email || 'Admin'}
        </div>
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
          {admin?.role}
        </div>
        <button 
          onClick={handleLogout}
          className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs font-semibold text-gray-600 uppercase tracking-widest cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
