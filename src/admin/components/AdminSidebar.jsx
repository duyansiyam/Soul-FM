import {
  CalendarDays,
  Edit3,
  Grid2X2,
  LayoutDashboard,
  LogOut,
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
    <aside className="w-56 min-h-screen bg-[#0c111d] flex flex-col fixed top-0 left-0 bottom-0 z-50 border-r border-white/[0.06]">

      {/* Brand */}
      <div className="px-5 pt-6 pb-5 border-b border-white/6">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center shrink-0">
            <Ticket size={13} strokeWidth={2.5} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">TicketMgr</span>
        </div>

        {!hasSelectedEvent && !isCreatingEvent && !isLooseTicketTypes ? (
          <p className="text-[11px] text-white/30 leading-relaxed">
            Select an event to view its orders and ticket settings.
          </p>
        ) : null}
      </div>

      {/* Nav */}
      <ul className="flex-1 py-3 px-2 list-none space-y-0.5 overflow-y-auto">
        {navItems
          .filter((item) => !item.hidden)
          .map((item, index) => {
            if (item.divider) {
              return (
                <li key={`divider-${index}`} className="py-1">
                  <div className="border-t border-white/6 mx-1" />
                  {item.id === 'event-section' && hasSelectedEvent && selectedEvent?.name && (
                    <div className="mt-3 mb-1 px-3 flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-sky-400 shrink-0" />
                      <span className="text-[10px] font-semibold text-sky-400/80 uppercase tracking-widest truncate">
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
                    `flex items-center gap-3 rounded-md px-3 py-2 text-[13px] no-underline transition-all duration-150 ${
                      isActive
                        ? 'bg-sky-500/10 text-sky-400 font-semibold'
                        : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={14}
                        strokeWidth={isActive ? 2.5 : 2}
                        className="shrink-0"
                      />
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1 h-1 rounded-full bg-sky-400 shrink-0" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
      </ul>

      {/* User / Logout */}
      <div className="px-3 py-3 border-t border-white/6">
        <div className="flex items-center gap-2.5 px-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <span className="text-[9px] font-bold text-white/60 uppercase">
              {(admin?.displayName || admin?.email || 'A')[0]}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-medium text-white/70 truncate">
              {admin?.displayName || admin?.email || 'Admin'}
            </div>
            <div className="text-[10px] text-white/25 truncate">Super Admin</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-[12px] font-medium text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <LogOut size={13} strokeWidth={2} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  )
}