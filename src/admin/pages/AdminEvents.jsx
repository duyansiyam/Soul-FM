import { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import Badge             from '../components/EventComponents/Badge';
import Modal             from '../components/EventComponents/Modal';
import EventForm, { EMPTY_FORM } from '../components/EventComponents/EventForm';
import EventTableRow     from '../components/EventComponents/EventTableRow';
import FullEventDrawer   from '../components/EventComponents/FullEventDrawer';
import DeleteConfirm     from '../components/EventComponents/DeleteConfirm';

const API = import.meta.env.VITE_API_URL;

export default function AdminEvents() {
  const { getToken } = useAdminAuth();

  const [events,   setEvents]   = useState([]);
  const [total,    setTotal]    = useState(0);
  const [fetching, setFetching] = useState(true);
  const [fetchErr, setFetchErr] = useState('');

  const [filters, setFilters] = useState({ status: '', category: '' });

  const [modal,    setModal]    = useState(null); // 'create' | 'edit' | 'delete' | 'full' | null
  const [selected, setSelected] = useState(null);

  const [formLoading, setFormLoading] = useState(false);
  const [formError,   setFormError]   = useState('');

  // ── Fetch ────────────────────────────────────────────────
  const fetchEvents = useCallback(async () => {
    setFetching(true); setFetchErr('');
    try {
      const params = new URLSearchParams();
      if (filters.status)   params.set('status',   filters.status);
      if (filters.category) params.set('category', filters.category);
      const res  = await fetch(`${API}/events?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEvents(data.events ?? []);
      setTotal(data.count  ?? 0);
    } catch (e) {
      setFetchErr(e.message);
    } finally {
      setFetching(false);
    }
  }, [filters]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  // ── Helpers ──────────────────────────────────────────────
  const closeModal = () => { setModal(null); setSelected(null); setFormError(''); };

  const openCreate = () => { setSelected(null); setFormError(''); setModal('create'); };

  const openEdit = (event) => { setSelected(event); setFormError(''); setModal('edit'); };

  const openDelete = (event) => { setSelected(event); setFormError(''); setModal('delete'); };

  const openFull = async (event) => {
    try {
      const res  = await fetch(`${API}/events/${event.event_id ?? event.id}/full`);
      const data = await res.json();
      setSelected(data);
    } catch {
      setSelected(event);
    }
    setModal('full');
  };

  // ── CRUD ─────────────────────────────────────────────────
  const handleCreate = async (form) => {
    setFormLoading(true); setFormError('');
    try {
      const res  = await fetch(`${API}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to create event');
      closeModal(); fetchEvents();
    } catch (e) { setFormError(e.message); }
    finally      { setFormLoading(false); }
  };

  const handleEdit = async (form) => {
    setFormLoading(true); setFormError('');
    try {
      const id   = selected.event_id ?? selected.id;
      const res  = await fetch(`${API}/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to update event');
      closeModal(); fetchEvents();
    } catch (e) { setFormError(e.message); }
    finally      { setFormLoading(false); }
  };

  const handleDelete = async () => {
    setFormLoading(true); setFormError('');
    try {
      const id  = selected.event_id ?? selected.id;
      const res = await fetch(`${API}/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to delete event');
      closeModal(); fetchEvents();
    } catch (e) { setFormError(e.message); }
    finally      { setFormLoading(false); }
  };

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="p-8 min-h-screen bg-gray-50">

      {/* Top bar */}
      <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Management</p>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          <input
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
            placeholder="Filter by category…"
            value={filters.category}
            onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value }))}
          />

          <button
            onClick={openCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition uppercase tracking-wide"
          >
            + New Event
          </button>
        </div>
      </div>

      {/* Error banner */}
      {fetchErr && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center gap-2 mb-4">
          <span>⚠</span><span>{fetchErr}</span>
        </div>
      )}

      {/* Count */}
      <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">
        {fetching ? 'Loading…' : `${total} event${total !== 1 ? 's' : ''} found`}
      </p>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {fetching ? (
          <p className="text-center py-16 text-sm text-gray-400">Loading events…</p>
        ) : events.length === 0 ? (
          <p className="text-center py-16 text-sm text-gray-400">No events found. Create one!</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Event', 'Date', 'Venue', 'Category', 'Status', 'Capacity', ''].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <EventTableRow
                  key={ev.event_id ?? ev.id}
                  event={ev}
                  onView={openFull}
                  onEdit={openEdit}
                  onDelete={openDelete}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      {modal === 'create' && (
        <Modal title="Create New Event" onClose={closeModal}>
          <EventForm onSubmit={handleCreate} loading={formLoading} error={formError} />
        </Modal>
      )}

      {modal === 'edit' && selected && (
        <Modal title="Edit Event" onClose={closeModal}>
          <EventForm
            initial={{
              event_name:       selected.event_name              ?? '',
              event_date:       selected.event_date?.slice(0,10) ?? '',
              start_time:       selected.start_time              ?? '',
              end_time:         selected.end_time                ?? '',
              location_name:    selected.location_name           ?? '',
              location_address: selected.location_address        ?? '',
              description:      selected.description             ?? '',
              category:         selected.category                ?? '',
              status:           selected.status                  ?? 'draft',
              banner_url:       selected.banner_url              ?? '',
              max_capacity:     selected.max_capacity            ?? '',
            }}
            onSubmit={handleEdit}
            loading={formLoading}
            error={formError}
          />
        </Modal>
      )}

      {modal === 'delete' && selected && (
        <DeleteConfirm
          event={selected}
          onConfirm={handleDelete}
          onClose={closeModal}
          loading={formLoading}
          error={formError}
        />
      )}

      {modal === 'full' && selected && (
        <FullEventDrawer event={selected} onClose={closeModal} />
      )}
    </div>
  );
}
