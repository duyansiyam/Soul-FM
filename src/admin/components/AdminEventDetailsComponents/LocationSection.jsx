import SectionHeader from './SectionHeader'
import Field from './Field'

export default function LocationSection({ form, updateForm, locationType, setLocationType }) {
  const mapQuery = encodeURIComponent(
    `${form.location_name} ${form.location_address}`.trim() || 'Manila Philippines'
  )

  return (
    <section id="location" className="card">
      <SectionHeader
        title="Location"
        subtitle="Inform attendees where your event is being held."
      />

      <div className="space-y-5">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setLocationType('venue')}
            className={`px-6 py-3 rounded-xl border font-semibold ${
              locationType === 'venue'
                ? 'border-sky-400 text-sky-600 bg-sky-50'
                : 'border-slate-200 text-slate-600 bg-white'
            }`}
          >
            Venue
          </button>

          <button
            type="button"
            onClick={() => setLocationType('tba')}
            className={`px-6 py-3 rounded-xl border font-semibold ${
              locationType === 'tba'
                ? 'border-sky-400 text-sky-600 bg-sky-50'
                : 'border-slate-200 text-slate-600 bg-white'
            }`}
          >
            TBA
          </button>
        </div>

        {locationType === 'venue' && (
          <>
            <Field label="Location Name *">
              <input
                value={form.location_name}
                onChange={(e) => updateForm('location_name', e.target.value)}
                required
                placeholder="Matrix Creation Events Venue"
                className="input"
              />
            </Field>

            <Field label="Location Detail">
              <textarea
                value={form.location_address}
                onChange={(e) => updateForm('location_address', e.target.value)}
                placeholder="Malakas street, Diliman, Quezon City, Metro Manila"
                rows="3"
                className="input resize-none"
              />
            </Field>

            <div className="rounded-xl overflow-hidden border border-slate-200 h-72 bg-white">
              <iframe
                title="Event location map"
                width="100%"
                height="100%"
                loading="lazy"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              />
            </div>

            <p className="text-sm text-slate-500">
              Type the exact location name/address above. The map will update and pin the searched location.
            </p>
          </>
        )}
      </div>
    </section>
  )
}
