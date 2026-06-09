import SectionHeader from './SectionHeader'
import Field from './Field'

export default function EventDetailSection({ form, updateForm, posterPreview, onPosterUpload }) {
  return (
    <section id="event-detail" className="card">
      <SectionHeader
        title="Event Details"
        subtitle="Add all of your event details."
      />

      <div className="space-y-5">
        <Field label="Event Name *">
          <input
            value={form.title}
            onChange={(e) => updateForm('title', e.target.value)}
            required
            placeholder="Music Festival The Takeover"
            className="input"
          />
        </Field>

        <Field label="Category *">
          <input
            value={form.category}
            onChange={(e) => updateForm('category', e.target.value)}
            required
            placeholder="Music Festival"
            className="input"
          />
        </Field>

        <Field label="Tags">
          <input
            value={form.tag}
            onChange={(e) => updateForm('tag', e.target.value)}
            placeholder="Add keywords attendees might search for. E.g., music, EDM"
            className="input"
          />
        </Field>

        <Field label="Event Poster *">
          <div className="w-fit">
            <div className="w-63.75 h-90.25 rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
              {posterPreview ? (
                <img
                  src={posterPreview}
                  alt="Poster Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center px-4">
                  <p className="text-base text-gray-700 font-semibold">Upload Poster</p>
                  <p className="text-sm text-gray-500 mt-2">Recommended: 425 × 601 px</p>
                </div>
              )}
            </div>

            <label className="mt-4 w-63.75 flex items-center justify-center py-4 bg-sky-500 text-white rounded-xl cursor-pointer hover:bg-sky-600 font-bold">
              Choose Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPosterUpload}
              />
            </label>
          </div>
        </Field>

        <Field label="Age Restriction">
          <select
            value={form.ageRestriction}
            onChange={(e) => updateForm('ageRestriction', e.target.value)}
            className="input"
          >
            <option>No age restriction</option>
            <option>Must be</option>
            <option>Custom</option>
          </select>
        </Field>

        {form.ageRestriction === 'Must be' && (
          <input
            value={form.ageRequirement}
            onChange={(e) => updateForm('ageRequirement', e.target.value)}
            placeholder="e.g. 18+"
            className="input"
          />
        )}

        {form.ageRestriction === 'Custom' && (
          <input
            value={form.ageCustomNote}
            onChange={(e) => updateForm('ageCustomNote', e.target.value)}
            placeholder="e.g. Children must be accompanied by a guardian."
            className="input"
          />
        )}
      </div>
    </section>
  )
}
