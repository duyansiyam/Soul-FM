import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'

const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

const emptyTicket = {
  ticket_section: 'Ticket Type',
  ticket_name: '',
  quantity: '',
  price: '',
  sale_start_date: '',
  sale_end_date: '',
  min_ticket: 1,
  max_ticket: 15,
  status: 'available',
  show_ticket: true,
  availability: true,
}

export default function AdminTicketType() {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const [tickets, setTickets] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(emptyTicket)

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const fetchTickets = async () => {
    if (!eventId) {
      setTickets([])
      return
    }

    const snapshot = await getDocs(
      query(collection(db, 'ticket_types'), where('event_id', '==', eventId))
    )
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setTickets(data)
  }

  useEffect(() => {
    fetchTickets()
  }, [eventId])

  const handleSave = async (e) => {
    e.preventDefault()

    if (!form.ticket_name.trim()) {
      alert('Ticket name is required.')
      return
    }

    if (!eventId) {
      alert('Please select an event first.')
      return
    }

    if (Number(form.quantity) <= 0) {
      alert('Quantity must be greater than 0.')
      return
    }

    if (Number(form.price) < 0) {
      alert('Price cannot be negative.')
      return
    }

    if (!form.sale_start_date || !form.sale_end_date) {
      alert('Sale start and end date are required.')
      return
    }

    if (new Date(form.sale_end_date) <= new Date(form.sale_start_date)) {
      alert('Sale end date must be later than sale start date.')
      return
    }

    if (Number(form.max_ticket) < Number(form.min_ticket)) {
      alert('Maximum ticket cannot be lower than minimum ticket.')
      return
    }

    setLoading(true)

    try {
      await addDoc(collection(db, 'ticket_types'), {
        event_id: eventId,
        ticket_section: form.ticket_section,
        ticket_name: form.ticket_name.trim(),
        quantity: Number(form.quantity),
        available_quantity: Number(form.quantity),
        price: Number(form.price),
        sale_start_date: form.sale_start_date,
        sale_end_date: form.sale_end_date,
        min_ticket: Number(form.min_ticket),
        max_ticket: Number(form.max_ticket),
        status: form.status,
        show_ticket: form.show_ticket,
        availability: form.availability,
        created_at: new Date(),
      })

      setForm(emptyTicket)
      setShowForm(false)
      fetchTickets()
      alert('Ticket saved successfully!')
    } catch (error) {
      console.log(error)
      alert('Failed to save ticket.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this ticket type?')) return

    await deleteDoc(doc(db, 'ticket_types', id))
    fetchTickets()
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 text-gray-700">
      <div className="max-w-7xl mx-auto space-y-8">
        {!eventId && (
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-5 py-4 text-sm text-yellow-800">
            Save the event details first, then ticket types will attach to that event.
            <button
              type="button"
              onClick={() => navigate(`${BASE}/event-details`)}
              className="ml-3 font-bold text-yellow-900 underline"
            >
              Go to Event Details
            </button>
          </div>
        )}

        <div className="flex items-center justify-between gap-4 rounded-2xl border border-sky-200 bg-sky-50 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
              Event Setup
            </p>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              Ticket Types
            </h1>
          </div>

          {eventId && (
            <button
              type="button"
              onClick={() => navigate(`${BASE}/event-details/${eventId}`)}
              className="rounded-lg border border-sky-300 bg-white px-5 py-3 text-sm font-bold text-sky-700 hover:bg-sky-100"
            >
              Open Event Details
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Tickets</h2>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="rounded-full bg-sky-500 px-8 py-4 text-white font-bold hover:bg-sky-600"
            >
              + Add Tickets
            </button>
          )}
        </div>

        <div className="border-t border-gray-200" />

        {!showForm && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-200 px-6 py-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-700">Ticket Type</h2>
            </div>

            <div className="grid grid-cols-[1.6fr_1fr_1fr_1.8fr_1fr_1fr_auto] px-6 py-4 border-b text-sm font-bold text-gray-500">
              <span>Ticket Name</span>
              <span>Price (PHP)</span>
              <span>Quantity</span>
              <span>Entry Date</span>
              <span>Show Ticket</span>
              <span>Availability</span>
              <span></span>
            </div>

            {tickets.length === 0 ? (
              <div className="py-16 text-center text-gray-400">
                No ticket types yet.
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="grid grid-cols-[1.6fr_1fr_1fr_1.8fr_1fr_1fr_auto] items-center px-6 py-5 border-b text-gray-700"
                >
                  <div>
                    <p className="font-bold">{ticket.ticket_name}</p>
                    <p className="text-sm text-gray-500">
                      <span className="text-green-600">●</span>{' '}
                      {ticket.status === 'available' ? 'On Sale' : 'Unavailable'}
                    </p>
                  </div>

                  <span>{Number(ticket.price || 0).toLocaleString()}</span>
                  <span>{ticket.quantity}</span>
                  <span>
                    {formatDateTime(ticket.sale_start_date)} -{' '}
                    {formatDateTime(ticket.sale_end_date)}
                  </span>

                  <Toggle checked={ticket.show_ticket} />
                  <Toggle checked={ticket.availability} />

                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="text-red-500 font-bold"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}

            <button
              onClick={() => setShowForm(true)}
              className="w-full py-6 text-sky-500 font-bold hover:bg-sky-50"
            >
              + Add Tickets
            </button>
          </section>
        )}

        {showForm && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
            <form onSubmit={handleSave} className="space-y-8">
              <section id="ticket-details" className="card">
                <SectionHeader
                  title="Ticket Details"
                  subtitle="Ticket details of the tickets on sale."
                />

                <div className="space-y-5">
                  <Field label="Ticket Section *">
                    <input
                      value={form.ticket_section}
                      onChange={(e) =>
                        updateForm('ticket_section', e.target.value)
                      }
                      className="input"
                      placeholder="Ticket Type"
                    />
                  </Field>

                  <Field label="Ticket Name *">
                    <input
                      value={form.ticket_name}
                      onChange={(e) => updateForm('ticket_name', e.target.value)}
                      className="input"
                      placeholder="e.g. Early Bird"
                    />
                  </Field>

                  <Field label="Quantity *">
                    <input
                      type="number"
                      min="1"
                      value={form.quantity}
                      onChange={(e) => updateForm('quantity', e.target.value)}
                      className="input"
                      placeholder="Number of tickets"
                    />
                  </Field>
                </div>
              </section>

              <section id="sales-period" className="card">
                <SectionHeader
                  title="Sales Period"
                  subtitle="Time period tickets will be available for purchase."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Sale Start Date *">
                    <input
                      type="datetime-local"
                      value={form.sale_start_date}
                      onChange={(e) =>
                        updateForm('sale_start_date', e.target.value)
                      }
                      className="input"
                    />
                  </Field>

                  <Field label="Sale End Date *">
                    <input
                      type="datetime-local"
                      value={form.sale_end_date}
                      onChange={(e) =>
                        updateForm('sale_end_date', e.target.value)
                      }
                      className="input"
                    />
                  </Field>
                </div>
              </section>

              <section id="pricing" className="card">
                <SectionHeader
                  title="Pricing"
                  subtitle="Set the price of the ticket."
                />

                <Field label="Price *">
                  <div className="flex">
                    <span className="px-5 py-4 border border-r-0 border-gray-300 rounded-l-xl bg-gray-50 font-semibold">
                      PHP
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={(e) => updateForm('price', e.target.value)}
                      className="input rounded-l-none"
                      placeholder="0"
                    />
                  </div>

                  <p className="mt-3 text-sky-700">
                    Buyer total: {Number(form.price || 0).toLocaleString()} PHP
                  </p>
                </Field>
              </section>

              <section id="advanced" className="card">
                <SectionHeader
                  title="Advanced Setting"
                  subtitle="Additional configurations for your ticket."
                />

                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-2xl font-bold text-gray-700">
                    Tickets allowed per order
                  </h3>
                  <p className="text-gray-500 mt-1">
                    You can limit the number of tickets users can purchase per order.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                    <Field label="Minimum ticket *">
                      <input
                        type="number"
                        min="1"
                        value={form.min_ticket}
                        onChange={(e) =>
                          updateForm('min_ticket', e.target.value)
                        }
                        className="input"
                      />
                    </Field>

                    <Field label="Maximum ticket *">
                      <input
                        type="number"
                        min="1"
                        value={form.max_ticket}
                        onChange={(e) =>
                          updateForm('max_ticket', e.target.value)
                        }
                        className="input"
                      />
                    </Field>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-700 mt-8">
                    Ticket Status
                  </h3>

                  <div className="space-y-4 mt-4">
                    <label className="flex items-center gap-3 text-lg">
                      <input
                        type="radio"
                        checked={form.status === 'available'}
                        onChange={() => updateForm('status', 'available')}
                        className="w-5 h-5"
                      />
                      Available
                    </label>

                    <label className="flex items-center gap-3 text-lg">
                      <input
                        type="radio"
                        checked={form.status === 'unavailable'}
                        onChange={() => updateForm('status', 'unavailable')}
                        className="w-5 h-5"
                      />
                      Unavailable
                    </label>
                  </div>
                </div>
              </section>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-lg bg-sky-500 text-white font-bold disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Ticket'}
                </button>
              </div>
            </form>

            <aside className="hidden xl:block">
              <div className="sticky top-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <Shortcut
                  href="#ticket-details"
                  active
                  title="Ticket Details"
                  text="Ticket details of the tickets on sale"
                />
                <Shortcut
                  href="#sales-period"
                  title="Sales Period"
                  text="Time period tickets will be available for purchase"
                />
                <Shortcut
                  href="#pricing"
                  title="Pricing"
                  text="Ticket price charged to buyers"
                />
                <Shortcut
                  href="#advanced"
                  title="Advanced Setting"
                  text="Additional configurations for your ticket"
                />
              </div>
            </aside>
          </div>
        )}
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
        }

        .input:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.15);
        }
      `}</style>
    </div>
  )
}

function Toggle({ checked }) {
  return (
    <span
      className={`w-14 h-8 rounded-full p-1 flex items-center ${
        checked ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'
      }`}
    >
      <span className="w-6 h-6 rounded-full bg-white" />
    </span>
  )
}

function formatDateTime(value) {
  if (!value) return 'Not set'

  const date = new Date(value)
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex items-start justify-between border-b border-gray-200 pb-6 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
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

function Shortcut({ href, title, text, active }) {
  return (
    <a href={href} className="flex gap-4 group no-underline">
      <div className="flex flex-col items-center">
        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center ${
            active ? 'border-sky-400 bg-sky-50' : 'border-gray-300 bg-white'
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
