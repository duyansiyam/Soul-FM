import Badge from './Badge';

const fmt = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

export default function EventTableRow({ event, onView, onEdit, onDelete }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="text-sm font-medium text-gray-900">{event.event_name}</div>
        <div className="text-xs text-gray-400 mt-0.5">{event.start_time}</div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{fmt(event.event_date)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{event.location_name}</td>
      <td className="px-4 py-3 text-xs text-gray-400 uppercase tracking-wide">
        {event.category || '—'}
      </td>
      <td className="px-4 py-3"><Badge status={event.status} /></td>
      <td className="px-4 py-3 text-sm text-gray-500">{event.max_capacity ?? '—'}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        <button
          onClick={() => onView(event)}
          className="text-xs text-blue-600 hover:underline mr-3 font-medium"
        >
          View
        </button>
        <button
          onClick={() => onEdit(event)}
          className="text-xs text-yellow-600 hover:underline mr-3 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(event)}
          className="text-xs text-red-500 hover:underline font-medium"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
