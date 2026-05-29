import { NavLink, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

const NAV_ITEMS = [
  {
    label: 'All Events',
    icon: '⌂',
    path: `${BASE}/events`,
  },

  {
    label: 'Event Dashboard',
    icon: '▣',
    path: `${BASE}/dashboard`,
  },

  {
    label: 'Orders',
    icon: '▤',
    path: `${BASE}/orders`,
  },

  {
    label: 'Users',
    icon: '◉',
    path: `${BASE}/users`,
  },

  {
    divider: true,
  },

  {
    label: 'Event Details',
    icon: '✎',
    path: `${BASE}/event-details`,
  },

  {
    label: 'Ticket Types',
    icon: '▦',
    path: `${BASE}/ticket-types`,
  },

  {
    divider: true,
  },

  {
    label: 'Settings',
    icon: '⚙',
    path: `${BASE}/settings`,
  },
]

export default function AdminSidebar() {
  const { admin, logout } = useAdminAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate(`${BASE}/login`)
  }

  return (
    <aside className="w-[240px] min-h-screen bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 bottom-0 z-50">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-gray-200">
        <div className="text-xs font-semibold text-sky-500 uppercase tracking-widest mb-1">
          Admin Panel
        </div>

        <div className="text-base font-bold text-gray-900">
          TicketMgr
        </div>
      </div>

      {/* Navigation */}
      <ul className="flex-1 py-4 list-none">
        {NAV_ITEMS.map((item, index) => {
          if (item.divider) {
            return (
              <li
                key={`divider-${index}`}
                className="mx-4 my-3 border-t border-gray-200"
              />
            )
          }

          return (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `mx-3 mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm no-underline transition-all ${
                    isActive
                      ? 'bg-sky-400 text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <span className="w-5 text-center text-base">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>

      {/* User */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
          Logged In As
        </div>

        <div className="text-sm font-medium text-gray-900 truncate">
          {admin?.displayName || admin?.email || 'Admin'}
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-lg text-xs font-semibold uppercase tracking-widest text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}