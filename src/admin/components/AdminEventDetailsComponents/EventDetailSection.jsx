import SectionHeader from './SectionHeader'
import Field from './Field'

export default function EventDetailSection({ form, updateForm, posterPreview, onPosterUpload }) {
  return (
    <section id="event-detail" className="card">
      <SectionHeader
        title="Event Details"
        subtitle="Add all of your event details."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                placeholder="music, EDM, outdoor"
                className="input"
              />
            </Field>
          </div>

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

        <div className="space-y-4">
          <Field label="Event Poster *">
            <div className="w-full">
              <div className="w-full h-64 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                {posterPreview ? (
                  <img
                    src={posterPreview}
                    alt="Poster Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center px-4">
                    <p className="text-base text-slate-900 font-semibold">Upload Poster</p>
                    <p className="text-sm text-slate-500 mt-2">Recommended: 425 × 601 px</p>
                  </div>
                )}
              </div>

              <label className="mt-4 w-full inline-flex items-center justify-center py-2 rounded-full bg-sky-600 text-white cursor-pointer hover:bg-sky-700 font-semibold">
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
        </div>
      </div>
    </section>
  )
}
