import { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

const STAT_CARDS = [
  { label: 'Open Tickets',    key: 'open',     color: 'text-blue-600', bgColor: 'bg-blue-50', icon: '◈' },
  { label: 'Resolved Today',  key: 'resolved', color: 'text-green-600', bgColor: 'bg-green-50', icon: '✓' },
  { label: 'Total Users',     key: 'users',    color: 'text-amber-600', bgColor: 'bg-amber-50', icon: '◉' },
  { label: 'Upcoming Events', key: 'events',   color: 'text-pink-600', bgColor: 'bg-pink-50', icon: '◆' },
];

// Mock data — swap with real API calls
const MOCK_STATS = { open: 24, resolved: 11, users: 348, events: 3 };
const MOCK_TICKETS = [
  { id: 'TK-001', subject: 'Stream audio dropout during Evening Show',   status: 'open',        priority: 'high',   user: 'carlos.m', created: '2h ago' },
  { id: 'TK-002', subject: 'DJ profile photo not updating',              status: 'in_progress', priority: 'medium', user: 'ana.r',    created: '5h ago' },
  { id: 'TK-003', subject: 'Schedule shows wrong timezone',              status: 'open',        priority: 'high',   user: 'ben.t',    created: '1d ago' },
  { id: 'TK-004', subject: 'Community form submission not sending email', status: 'resolved',   priority: 'low',    user: 'lei.w',    created: '2d ago' },
  { id: 'TK-005', subject: 'Events page missing October entries',        status: 'open',        priority: 'medium', user: 'mara.j',   created: '3d ago' },
];

const STATUS_COLORS = {
  open:        { bg: 'bg-blue-50',      text: 'text-blue-700',    label: 'Open'        },
  in_progress: { bg: 'bg-amber-50',     text: 'text-amber-700',   label: 'In Progress' },
  resolved:    { bg: 'bg-green-50',     text: 'text-green-700',   label: 'Resolved'    },
};

const PRIORITY_COLORS = {
  high:   'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low:    'bg-gray-100 text-gray-700',
};

export default function AdminDashboard() {
  const { admin, getToken } = useAdminAuth();
  const [stats]   = useState(MOCK_STATS);
  const [tickets] = useState(MOCK_TICKETS);

  return (
    <div className="px-10 py-9 text-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-9">
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          Overview
        </div>
        <h1 className="text-3xl font-bold text-gray-900 -tracking-tight">
          Dashboard
        </h1>
        <p className="text-xs text-gray-500 mt-1 tracking-wide">
          Welcome back, {admin?.displayName || 'Admin'} ·{' '}
          {new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-9">
        {STAT_CARDS.map((card) => (
          <div key={card.key} className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 transition transform hover:-translate-y-0.5">
            <div className={`text-lg mb-3 ${card.color}`}>{card.icon}</div>
            <div className={`text-2xl font-bold -tracking-tight mb-1 ${card.color}`}>
              {stats[card.key]}
            </div>
            <div className="text-xs uppercase tracking-widest text-gray-500">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-gray-600 tracking-wide uppercase">Recent Tickets</span>
        <a className="text-xs text-blue-600 uppercase tracking-widest cursor-pointer hover:text-blue-700">View all →</a>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase text-gray-600 border-b border-gray-200 font-medium">ID</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-gray-600 border-b border-gray-200 font-medium">Subject</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-gray-600 border-b border-gray-200 font-medium">Status</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-gray-600 border-b border-gray-200 font-medium">Priority</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-gray-600 border-b border-gray-200 font-medium">Submitted By</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-gray-600 border-b border-gray-200 font-medium">Created</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-gray-600 border-b border-gray-200 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => {
              const s = STATUS_COLORS[t.status];
              return (
                <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-xs text-blue-600 tracking-wide font-medium">{t.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 max-w-xs">{t.subject}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium uppercase ${s.bg} ${s.text}`}>
                      {s.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className={`inline-flex items-center gap-1.5 ${PRIORITY_COLORS[t.priority]}`}>
                      <span className="w-1.5 h-1.5 rounded-full" />
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-700">{t.user}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{t.created}</td>
                  <td className="px-4 py-3">
                    <button className="border border-blue-300 text-blue-600 px-2.5 py-1 rounded text-xs uppercase tracking-widest font-medium cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition">
                      Open
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
