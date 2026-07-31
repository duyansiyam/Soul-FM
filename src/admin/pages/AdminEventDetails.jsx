import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'

const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

const emptyDateDraft = {
  start_date: '',
  end_date: '',
  start_time: '',
  end_time: '',
}

const TODAY = new Date().toISOString().split('T')[0]
function formatDisplayDate(dateString) {
  if (!dateString) return ''

   return new Date(dateString).toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
function formatDisplayTime(timeString) {
  if (!timeString) return ''

  const [hours, minutes] = timeString.split(':')

  const date = new Date()
  date.setHours(Number(hours))
  date.setMinutes(Number(minutes))

  return date.toLocaleTimeString('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
  })

}
export default function AdminEventDetails() {

  const navigate = useNavigate()
  const descriptionRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [posterFile, setPosterFile] = useState(null)
  const [posterPreview, setPosterPreview] = useState('')
  const [locationType, setLocationType] = useState('venue')

  const [form, setForm] = useState({
    title: '',
    category: '',
    tag: '',
    ageRestriction: 'No age restriction',
    ageRequirement: '',
    ageCustomNote: '',
    timezone: '(GMT+8) Manila, Philippines',

    dateTimes: [],
    dateDraft: emptyDateDraft,
    editingDateIndex: null,
    showDateEditor: true,
    hideDateTime: false,

    location_name: '',
    location_address: '',

    description: '',
    status: 'published',
  })


  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handlePosterUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPosterFile(file)
    setPosterPreview(URL.createObjectURL(file))
  }

  const mapQuery = encodeURIComponent(
    `${form.location_name} ${form.location_address}`.trim() ||
      'Manila Philippines'
  )

  const validateDateTime = () => {
    const draft = form.dateDraft

    if (!draft.start_date || !draft.end_date || !draft.start_time || !draft.end_time) {
      alert('Please complete the date and time first.')
      return false
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const startDateOnly = new Date(`${draft.start_date}T00:00`)
    const endDateOnly = new Date(`${draft.end_date}T00:00`)
    const startDateTime = new Date(`${draft.start_date}T${draft.start_time}`)
    const endDateTime = new Date(`${draft.end_date}T${draft.end_time}`)
    const now = new Date()

    if (startDateOnly < today) {
      alert('Start date cannot be in the past.')
      return false
    }

    if (endDateOnly < startDateOnly) {
      alert('End date cannot be earlier than start date.')
      return false
    }

    if (startDateTime < now) {
      alert('Start time cannot be in the past.')
      return false
    }

    if (endDateTime <= startDateTime) {
      alert('End date and time must be later than start date and time.')
      return false
    }

    const maxFuture = new Date()
    maxFuture.setFullYear(maxFuture.getFullYear() + 5)

    if (startDateTime > maxFuture) {
      alert('Event date cannot be more than 5 years in the future.')
      return false
    }

    const duplicate = form.dateTimes.some(
      (item, index) =>
        index !== form.editingDateIndex &&
        item.start_date === draft.start_date &&
        item.end_date === draft.end_date &&
        item.start_time === draft.start_time &&
        item.end_time === draft.end_time
    )

    if (duplicate) {
      alert('This date and time already exists.')
      return false
    }

    if (form.dateTimes.length >= 20 && form.editingDateIndex === null) {
      alert('You can only add up to 20 date and time schedules.')
      return false
    }

    return true
  }

  const handleSaveDateTime = () => {
    if (!validateDateTime()) return

    const draft = { ...form.dateDraft }

    if (form.editingDateIndex !== null) {
      const updated = [...form.dateTimes]
      updated[form.editingDateIndex] = draft
      updateForm('dateTimes', updated)
      updateForm('editingDateIndex', null)
    } else {
      updateForm('dateTimes', [...form.dateTimes, draft])
    }

    updateForm('dateDraft', emptyDateDraft)
    updateForm('showDateEditor', false)
  }

  const handleEditDateTime = (item, index) => {
    updateForm('dateDraft', item)
    updateForm('editingDateIndex', index)
    updateForm('showDateEditor', true)
  }

  const handleDeleteDateTime = (index) => {
    const updated = form.dateTimes.filter((_, i) => i !== index)
    updateForm('dateTimes', updated)

    if (form.editingDateIndex === index) {
      updateForm('dateDraft', emptyDateDraft)
      updateForm('editingDateIndex', null)
    }
  }

  const runCommand = (command, value = null) => {
    descriptionRef.current?.focus()
    document.execCommand(command, false, value)
    updateForm('description', descriptionRef.current?.innerHTML || '')
  }

  const validateBeforeSubmit = () => {
    if (!form.title.trim()) {
      alert('Event name is required.')
      return false
    }

    if (!form.category.trim()) {
      alert('Category is required.')
      return false
    }

    //if (!posterFile) {
     // alert('Event poster is required.')
     // return false
   // }

    if (!form.timezone) {
      alert('Timezone is required.')
      return false
    }

    if (form.dateTimes.length === 0) {
      alert('Please add at least one date and time schedule.')
      return false
    }

    if (form.ageRestriction === 'Must be' && !form.ageRequirement.trim()) {
      alert('Please enter the required age, example: 18+.')
      return false
    }

    if (form.ageRestriction === 'Custom' && !form.ageCustomNote.trim()) {
      alert('Please enter your custom age restriction note.')
      return false
    }

    if (locationType === 'venue') {
      if (!form.location_name.trim()) {
        alert('Location name is required.')
        return false
      }

      if (!form.location_address.trim()) {
        alert('Location detail is required.')
        return false
      }
    }

    const descriptionText = descriptionRef.current?.innerText?.trim() || ''

    if (descriptionText.length < 20) {
      alert('Description must be at least 20 characters.')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateBeforeSubmit()) return

  try {
    setLoading(true)

    const firstDate = form.dateTimes[0]

    await addDoc(collection(db, 'events'), {
      title: form.title.trim(),
      category: form.category.trim(),
      tag: form.tag.trim(),

      ageRestriction: form.ageRestriction,
      ageRequirement: form.ageRequirement.trim(),
      ageCustomNote: form.ageCustomNote.trim(),

      timezone: form.timezone,

      dateTimes: form.dateTimes,

      event_date: firstDate.start_date,
      start_date: firstDate.start_date,
      end_date: firstDate.end_date,
      start_time: firstDate.start_time,
      end_time: firstDate.end_time,

      hideDateTime: form.hideDateTime,

      location_type: locationType,

      location_name: form.location_name.trim(),
      location_address: form.location_address.trim(),

      poster_image: '',

      description: form.description,

      status: form.status,
      soldOut: false,
      tickets: [],

      created_at: new Date(),
      updated_at: new Date(),
    })

    alert('Event saved successfully')

    navigate(`${BASE}/events`)
  } catch (error) {
    console.error(error)
    alert(error.message)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 text-gray-700">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
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
                  <div className="w-[255px] h-[361px] rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                    {posterPreview ? (
                      <img
                        src={posterPreview}
                        alt="Poster Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center px-4">
                        <p className="text-base text-gray-700 font-semibold">
                          Upload Poster
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Recommended: 425 × 601 px
                        </p>
                      </div>
                    )}
                  </div>

                  <label className="mt-4 w-[255px] flex items-center justify-center py-4 bg-sky-500 text-white rounded-xl cursor-pointer hover:bg-sky-600 font-bold">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePosterUpload}
                    />
                  </label>
                </div>
              </Field>

              <Field label="Age Restriction">
                <select
                  value={form.ageRestriction}
                  onChange={(e) =>
                    updateForm('ageRestriction', e.target.value)
                  }
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
                  onChange={(e) =>
                    updateForm('ageRequirement', e.target.value)
                  }
                  placeholder="e.g. 18+"
                  className="input"
                />
              )}

              {form.ageRestriction === 'Custom' && (
                <input
                  value={form.ageCustomNote}
                  onChange={(e) =>
                    updateForm('ageCustomNote', e.target.value)
                  }
                  placeholder="e.g. Children must be accompanied by a guardian."
                  className="input"
                />
              )}
            </div>
          </section>

          <section id="date-time" className="card">
            <SectionHeader
              title="Date and Time"
              subtitle="Let attendees know your event’s start and end time for a smooth experience."
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
                  className="flex items-center justify-between rounded-xl border border-sky-400 bg-sky-50/40 px-5 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-sky-500">
                  
                    </div>

                    <div>
                      <p className="font-semibold text-gray-600">
                        {formatDisplayDate(item.start_date)} -{' '}
                        {formatDisplayDate(item.end_date)}
                      </p>
                      <p className="font-semibold text-gray-600 mt-1">
                        {formatDisplayTime(item.start_time)} -{' '}
                        {formatDisplayTime(item.end_time)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleDeleteDateTime(index)}
                      className="font-semibold text-gray-500 hover:text-red-500"
                    >
                      Delete
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEditDateTime(item, index)}
                      className="font-semibold text-sky-500 hover:text-sky-600"
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
                                form.dateDraft.end_date &&
                                form.dateDraft.end_date < e.target.value
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
                            updateForm('dateDraft', {
                              ...form.dateDraft,
                              end_date: e.target.value,
                            })
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
                            updateForm('dateDraft', {
                              ...form.dateDraft,
                              start_time: e.target.value,
                            })
                          }
                          className="input"
                        />
                      </Field>

                      <Field label="End Time *">
                        <input
                          type="time"
                          value={form.dateDraft.end_time}
                          onChange={(e) =>
                            updateForm('dateDraft', {
                              ...form.dateDraft,
                              end_time: e.target.value,
                            })
                          }
                          className="input"
                        />
                      </Field>
                    </div>

                    <div className="flex md:flex-col justify-center gap-3 border-l border-gray-200 pl-5">
                      <button
                        type="button"
                        onClick={handleSaveDateTime}
                        className="px-5 py-2.5 rounded-lg bg-sky-500 text-white font-semibold hover:bg-sky-600"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          updateForm('dateDraft', emptyDateDraft)
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
                      onChange={(e) =>
                        updateForm('hideDateTime', e.target.checked)
                      }
                      className="w-5 h-5"
                    />
                    Hide the date and time of your event page.
                  </label>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  updateForm('dateDraft', emptyDateDraft)
                  updateForm('editingDateIndex', null)
                  updateForm('showDateEditor', true)
                }}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-600 hover:border-sky-400 hover:text-sky-500"
              >
                + Add Date and Time
              </button>
            </div>
          </section>

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
                  className={`px-8 py-4 rounded-xl border font-semibold ${
                    locationType === 'venue'
                      ? 'border-sky-400 text-sky-500 bg-sky-50'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                </button>

                <button
                  type="button"
                  onClick={() => setLocationType('tba')}
                  className={`px-8 py-4 rounded-xl border font-semibold ${
                    locationType === 'tba'
                      ? 'border-sky-400 text-sky-500 bg-sky-50'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                </button>
              </div>

              {locationType === 'venue' && (
                <>
                  <Field label="Location Name *">
                    <input
                      value={form.location_name}
                      onChange={(e) =>
                        updateForm('location_name', e.target.value)
                      }
                      required
                      placeholder="Matrix Creation Events Venue"
                      className="input"
                    />
                  </Field>

                  <Field label="Location Detail">
                    <textarea
                      value={form.location_address}
                      onChange={(e) =>
                        updateForm('location_address', e.target.value)
                      }
                      placeholder="Malakas street, Diliman, Quezon City, Metro Manila"
                      rows="3"
                      className="input resize-none"
                    />
                  </Field>

                  <div className="rounded-xl overflow-hidden border border-gray-200 h-[360px] bg-gray-100">
                    <iframe
                      title="Event location map"
                      width="100%"
                      height="100%"
                      loading="lazy"
                      src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                    />
                  </div>

                  <p className="text-sm text-gray-500">
                    Type the exact location name/address above. The map will update and pin the searched location.
                  </p>
                </>
              )}
            </div>
          </section>

          <section id="description" className="card">
            <SectionHeader
              title="Description"
              subtitle="Share your story and highlights so attendees can learn more."
            />

            <div className="rounded-xl border border-gray-300 overflow-hidden bg-white">
              <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 px-4 py-3 text-gray-600">
                <ToolbarButton onClick={() => runCommand('bold')}>B</ToolbarButton>
                <ToolbarButton onClick={() => runCommand('italic')}>i</ToolbarButton>
                <ToolbarButton onClick={() => runCommand('underline')}>U</ToolbarButton>
                <ToolbarButton onClick={() => runCommand('strikeThrough')}>S</ToolbarButton>
                <ToolbarButton onClick={() => runCommand('formatBlock', 'h2')}>Aa</ToolbarButton>
                <ToolbarButton onClick={() => runCommand('insertUnorderedList')}>•</ToolbarButton>
                <ToolbarButton onClick={() => runCommand('insertOrderedList')}>1.</ToolbarButton>
                <ToolbarButton onClick={() => runCommand('justifyLeft')}>⇤</ToolbarButton>
                <ToolbarButton onClick={() => runCommand('justifyRight')}>⇥</ToolbarButton>
                <ToolbarButton onClick={() => runCommand('formatBlock', 'blockquote')}>❝</ToolbarButton>
                <ToolbarButton
                  onClick={() => {
                    const url = prompt('Enter URL')
                    if (url) runCommand('createLink', url)
                  }}
                >
                  🔗
                </ToolbarButton>
                <ToolbarButton onClick={() => runCommand('undo')}>↶</ToolbarButton>
                <ToolbarButton onClick={() => runCommand('redo')}>↷</ToolbarButton>
              </div>

              <div
                ref={descriptionRef}
                contentEditable
                onInput={(e) =>
                  updateForm('description', e.currentTarget.innerHTML)
                }
                className="min-h-[220px] w-full p-4 outline-none text-gray-700 font-normal"
                data-placeholder="Write event description..."
              />
            </div>
          </section>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`${BASE}/events`)}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-lg bg-sky-500 text-white font-bold disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Event'}
            </button>
          </div>
        </form>

        <aside className="hidden xl:block">
          <div className="sticky top-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <Shortcut href="#event-detail" active title="Event detail" text="Add all of your event details." />
            <Shortcut href="#date-time" title="Date and Time" text="Keep your event-goers informed about timings." />
            <Shortcut href="#location" title="Location" text="Inform attendees where your event is held." />
            <Shortcut href="#description" title="Description" text="Help people learn more about your event." />
          </div>
        </aside>
      </div>

      <style>{`
        .card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 32px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
        }

        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 12px;
          padding: 16px 18px;
          font-size: 16px;
          outline: none;
          background: #ffffff;
          color: #4b5563;
          font-weight: 400;
        }

        .input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .input:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.15);
        }

        select.input {
          color: #4b5563;
        }

        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
      `}</style>
    </div>
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex items-start justify-between border-b border-gray-200 pb-6 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
        <p className="text-gray-500 mt-1">{subtitle}</p>
      </div>
      <span className="text-2xl text-gray-500">⌃</span>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}

function ToolbarButton({ children, onClick }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="min-w-9 h-9 px-2 rounded hover:bg-gray-100 font-semibold text-[18px] leading-none"
    >
      {children}
    </button>
  )
}

function Shortcut({ href, title, text, active }) {
  return (
    <a href={href} className="flex gap-4 group no-underline">
      <div className="flex flex-col items-center">
        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center ${
            active
              ? 'border-sky-400 bg-sky-50'
              : 'border-gray-300 bg-white'
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              active ? 'bg-sky-400' : 'bg-white'
            }`}
          />
        </div>
        <div className="w-px h-12 bg-gray-300" />
      </div>

      <div className="pb-5">
        <p className="font-bold text-gray-700 group-hover:text-sky-500">
          {title}
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
      </div>
    </a>
  )
}   
