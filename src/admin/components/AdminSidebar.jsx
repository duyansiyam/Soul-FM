import {
  CalendarDays,
  Edit3,
  Grid2X2,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Ticket,
  Users,
} from 'lucide-react'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import { useSelectedEvent } from '../context/AdminSelectedEventContext'

const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

export default function AdminSidebar() {
  const { admin, logout } = useAdminAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { eventId } = useParams()
const { selectedEvent } = useSelectedEvent() ?? {}

  const hasSelectedEvent = Boolean(eventId)
  const isCreatingEvent = pathname === `${BASE}/event-details`
  const isLooseTicketTypes = pathname === `${BASE}/ticket-types`
  const showEventSetup = hasSelectedEvent || isCreatingEvent || isLooseTicketTypes

  const navItems = [
    {
      label: 'Overview',
      icon: LayoutDashboard,
      path: `${BASE}/dashboard`,
    },
    {
      label: 'All Events',
      icon: CalendarDays,
      path: `${BASE}/events`,
    },
    {
      divider: true,
      id: 'event-section',
      hidden: !showEventSetup,
    },
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: `${BASE}/dashboard/${eventId}`,
      hidden: !hasSelectedEvent,
    },
    {
      label: 'Orders',
      icon: ShoppingCart,
      path: `${BASE}/orders/${eventId}`,
      hidden: !hasSelectedEvent,
    },
    {
      label: 'Event Details',
      icon: Edit3,
      path: hasSelectedEvent ? `${BASE}/event-details/${eventId}` : `${BASE}/event-details`,
      hidden: !showEventSetup,
    },
    {
      label: 'Ticket Types',
      icon: Grid2X2,
      path: hasSelectedEvent ? `${BASE}/ticket-types/${eventId}` : `${BASE}/ticket-types`,
      hidden: !showEventSetup,
    },
    {
      divider: true,
    },
    {
      label: 'Users',
      icon: Users,
      path: `${BASE}/users`,
    },
    {
      label: 'Settings',
      icon: Settings,
      path: `${BASE}/settings`,
    },
  ]

  const handleLogout = async () => {
    await logout()
    navigate(`${BASE}/login`)
  }

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 bottom-0 z-50">
      <div className="px-6 py-7 border-b border-gray-200">
        <div className="text-xs font-semibold text-sky-500 uppercase tracking-widest mb-1">
          Admin Panel
        </div>

        <div className="text-base font-bold text-gray-900">
          TicketMgr
        </div>

        {!hasSelectedEvent && !isCreatingEvent && !isLooseTicketTypes && (
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Select an event to open its dashboard, orders, and ticket types.
          </p>
        )}
      </div>

      <ul className="flex-1 py-4 list-none">
        {navItems
          .filter((item) => !item.hidden)
          .map((item, index) => {
            if (item.divider) {
              return (
                <li key={`divider-${index}`}>
                  <div className="mx-4 my-3 border-t border-gray-200" />
                  {item.id === 'event-section' && hasSelectedEvent && selectedEvent?.name && (
                    <div className="mx-4 mb-2 px-1 flex items-center gap-1.5">
                      <Ticket size={11} className="text-sky-400 shrink-0" />
                      <span className="text-xs font-semibold text-sky-500 uppercase tracking-widest truncate">
                        {selectedEvent.name}
                      </span>
                    </div>
                  )}
                </li>
              )
            }

            const Icon = item.icon || Ticket

            return (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `mx-3 mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm no-underline transition-all ${
                      isActive
                        ? 'bg-sky-600 text-white font-bold shadow-sm ring-1 ring-sky-700'
                        : 'text-gray-800 hover:bg-sky-50 hover:text-sky-700'
                    }`
                  }
                >
                  <Icon size={15} strokeWidth={2.4} className="shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            )
          })}
      </ul>

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