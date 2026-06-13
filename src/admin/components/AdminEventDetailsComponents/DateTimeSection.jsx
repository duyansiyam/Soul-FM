import SectionHeader from './SectionHeader'
import Field from './Field'
import { TODAY } from './constants'
import { formatDisplayDate, formatDisplayTime } from './utils'

export default function DateTimeSection({
  form,
  updateForm,
  onSaveDateTime,
  onEditDateTime,
  onDeleteDateTime,
}) {
  return (
    <section id="date-time" className="card">
      <SectionHeader
        title="Date and Time"
        subtitle="Let attendees know your event's start and end time for a smooth experience."
      />

      <div className="space-y-5">
        <Field label="Event Timezone *">
          <select
            value={form.timezone}
            onChange={(e) => updateForm('timezone', e.target.value)}
            className="input"
            required
          >
            <option value="">Select Timezone</option>
            <option value="Asia/Manila">(GMT+8) Manila, Philippines</option>
            <option value="Asia/Singapore">(GMT+8) Singapore</option>
            <option value="Asia/Tokyo">(GMT+9) Tokyo, Japan</option>
            <option value="Australia/Sydney">(GMT+10) Sydney, Australia</option>
            <option value="Europe/London">(GMT+0) London, United Kingdom</option>
            <option value="America/New_York">(GMT-5) New York, USA</option>
          </select>
        </Field>

        {form.dateTimes.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-sky-500" />
              <div>
                <p className="font-semibold text-slate-800">
                  {formatDisplayDate(item.start_date)} – {formatDisplayDate(item.end_date)}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {formatDisplayTime(item.start_time)} – {formatDisplayTime(item.end_time)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onDeleteDateTime(index)}
                className="font-semibold text-slate-500 hover:text-red-500"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => onEditDateTime(item, index)}
                className="font-semibold text-sky-600 hover:text-sky-700"
              >
                Edit
              </button>
            </div>
          </div>
        ))}

        {form.showDateEditor && (
          <div className="rounded-xl border border-gray-200 p-5">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-5">
              <div className="space-y-5">
                <Field label="Start Date *">
                  <input
                    type="date"
                    min={TODAY}
                    value={form.dateDraft.start_date}
                    onChange={(e) =>
                      updateForm('dateDraft', {
                        ...form.dateDraft,
                        start_date: e.target.value,
                        end_date:
                          form.dateDraft.end_date && form.dateDraft.end_date < e.target.value
                            ? ''
                            : form.dateDraft.end_date,
                      })
                    }
                    className="input"
                  />
                </Field>

                <Field label="End Date *">
                  <input
                    type="date"
                    min={form.dateDraft.start_date || TODAY}
                    value={form.dateDraft.end_date}
                    onChange={(e) =>
                      updateForm('dateDraft', { ...form.dateDraft, end_date: e.target.value })
                    }
                    className="input"
                  />
                </Field>
              </div>

              <div className="space-y-5">
                <Field label="Start Time *">
                  <input
                    type="time"
                    value={form.dateDraft.start_time}
                    onChange={(e) =>
                      updateForm('dateDraft', { ...form.dateDraft, start_time: e.target.value })
                    }
                    className="input"
                  />
                </Field>

                <Field label="End Time *">
                  <input
                    type="time"
                    value={form.dateDraft.end_time}
                    onChange={(e) =>
                      updateForm('dateDraft', { ...form.dateDraft, end_time: e.target.value })
                    }
                    className="input"
                  />
                </Field>
              </div>

              <div className="flex md:flex-col justify-center gap-3 border-l border-gray-200 pl-5">
                <button
                  type="button"
                  onClick={onSaveDateTime}
                  className="px-5 py-2.5 rounded-lg bg-sky-500 text-white font-semibold hover:bg-sky-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateForm('dateDraft', { start_date: '', end_date: '', start_time: '', end_time: '' })
                    updateForm('editingDateIndex', null)
                  }}
                  className="px-5 py-2.5 rounded-lg border border-red-300 text-red-500 font-semibold hover:bg-red-50"
                >
                  Clear
                </button>
              </div>
            </div>

            <label className="mt-5 flex items-center gap-3 text-gray-600">
              <input
                type="checkbox"
                checked={form.hideDateTime}
                onChange={(e) => updateForm('hideDateTime', e.target.checked)}
                className="w-5 h-5"
              />
              Hide the date and time of your event page.
            </label>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            updateForm('dateDraft', { start_date: '', end_date: '', start_time: '', end_time: '' })
            updateForm('editingDateIndex', null)
            updateForm('showDateEditor', true)
          }}
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-600 hover:border-sky-400 hover:text-sky-500"
        >
          + Add Date and Time
        </button>
      </div>
    </section>
  )
}
