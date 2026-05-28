import { useState } from 'react';
import Field from './Field';

export const EMPTY_FORM = {
  event_name: '', event_date: '', start_time: '', end_time: '',
  location_name: '', location_address: '', description: '',
  category: '', status: 'draft', banner_url: '', max_capacity: '',
};

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';

export default function EventForm({ initial = EMPTY_FORM, onSubmit, loading, error }) {
  const [form, setForm] = useState(initial);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Full-width */}
        <div className="col-span-2">
          <Field label="Event Name *">
            <input className={inputClass} value={form.event_name} onChange={set('event_name')} required />
          </Field>
        </div>

        <Field label="Date *">
          <input className={inputClass} type="date" value={form.event_date} onChange={set('event_date')} required />
        </Field>

        <Field label="Start Time *">
          <input className={inputClass} type="time" value={form.start_time} onChange={set('start_time')} required />
        </Field>

        <Field label="End Time">
          <input className={inputClass} type="time" value={form.end_time} onChange={set('end_time')} />
        </Field>

        <Field label="Status">
          <select className={`${inputClass} cursor-pointer bg-white`} value={form.status} onChange={set('status')}>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </Field>

        <div className="col-span-2">
          <Field label="Venue Name *">
            <input className={inputClass} value={form.location_name} onChange={set('location_name')} required />
          </Field>
        </div>

        <div className="col-span-2">
          <Field label="Venue Address">
            <input className={inputClass} value={form.location_address} onChange={set('location_address')} />
          </Field>
        </div>

        <Field label="Category">
          <input className={inputClass} placeholder="e.g. concert, workshop" value={form.category} onChange={set('category')} />
        </Field>

        <Field label="Max Capacity">
          <input className={inputClass} type="number" min="1" value={form.max_capacity} onChange={set('max_capacity')} />
        </Field>

        <div className="col-span-2">
          <Field label="Banner URL">
            <input className={inputClass} placeholder="https://..." value={form.banner_url} onChange={set('banner_url')} />
          </Field>
        </div>

        <div className="col-span-2">
          <Field label="Description">
            <textarea
              className={`${inputClass} min-h-[80px] resize-y`}
              value={form.description}
              onChange={set('description')}
            />
          </Field>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center gap-2">
          <span>⚠</span><span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 uppercase tracking-wide text-sm"
      >
        {loading ? 'Saving...' : 'Save Event'}
      </button>
    </form>
  );
}
