import Modal from './Modal';
import Badge from './Badge';

const fmt = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 text-sm">
      <span className="w-24 shrink-0 text-xs font-semibold text-gray-400 uppercase tracking-wide pt-0.5">
        {label}
      </span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}

export default function FullEventDrawer({ event, onClose }) {
  return (
    <Modal title={event.event_name} onClose={onClose}>
      <div className="space-y-4">
        {/* Status + category */}
        <div className="flex items-center gap-2">
          <Badge status={event.status} />
          {event.category && (
            <span className="text-xs text-gray-400 uppercase tracking-wide">{event.category}</span>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2">
          <DetailRow label="Date"     value={fmt(event.event_date)} />
          <DetailRow label="Time"     value={`${event.start_time ?? ''}${event.end_time ? ` → ${event.end_time}` : ''}`} />
          <DetailRow label="Venue"    value={event.location_name} />
          <DetailRow label="Address"  value={event.location_address} />
          <DetailRow label="Capacity" value={event.max_capacity?.toString()} />
        </div>

        {/* Description */}
        {event.description && (
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm text-gray-600 leading-relaxed">
            {event.description}
          </div>
        )}

        {/* Ticket Types */}
        {event.ticket_types?.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Ticket Types ({event.ticket_types.length})
            </p>
            <div className="space-y-2">
              {event.ticket_types.map((tt) => (
                <div
                  key={tt.id ?? tt.ticket_type_id}
                  className="flex justify-between items-center bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm"
                >
                  <span className="text-gray-800 font-medium">{tt.name ?? tt.type_name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600 font-semibold">
                      {tt.price != null ? `₱${Number(tt.price).toLocaleString()}` : 'Free'}
                    </span>
                    {tt.quantity != null && (
                      <span className="text-xs text-gray-400">× {tt.quantity}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
