import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'

function TicketForm({ event, onClose }) {
  const availableTickets = event.tickets.filter((ticket) => ticket.available)

  const [buyerName, setBuyerName] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [buyerContact, setBuyerContact] = useState('')
  const [ticketType, setTicketType] = useState(availableTickets[0]?.type || '')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  const selectedTicket = availableTickets.find(
    (ticket) => ticket.type === ticketType
  )

  const ticketPrice = selectedTicket?.price || 0
  const totalAmount = ticketPrice * quantity

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addDoc(collection(db, 'orders'), {
        buyer_name: buyerName,
        buyer_email: buyerEmail,
        buyer_contact: buyerContact,
        ticket_type: ticketType,
        quantity: Number(quantity),
        total_amount: totalAmount,
        event_id: event.id,
        event_title: event.title,
        order_number: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        order_status: 'pending',
        payment_status: 'pending',
        date_purchased: new Date(),
      })

      alert('Ticket order submitted!')
      onClose()
    } catch (error) {
      console.log(error)
      alert('Firebase Error. Check console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-red-600 font-semibold">
              Ticket Registration
            </p>

            <h2 className="mt-2 text-2xl font-bold text-black">
              {event.title}
            </h2>

            <p className="mt-1 text-sm text-black/50">
              Fill out your details to reserve your ticket.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-black/10 px-3 py-1 text-sm text-black/60 hover:bg-black hover:text-white transition"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
              Full Name
            </label>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-black"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
              Email Address
            </label>
            <input
              type="email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-black"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
              Contact Number
            </label>
            <input
              type="text"
              value={buyerContact}
              onChange={(e) => setBuyerContact(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-black"
              placeholder="09XXXXXXXXX"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
                Ticket Type
              </label>
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-black bg-white"
              >
                {availableTickets.map((ticket) => (
                  <option key={ticket.type} value={ticket.type}>
                    {ticket.type} — ₱{ticket.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
                className="mt-2 w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="rounded-xl border border-black/10 bg-black/[0.03] p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-black/50">Ticket Price</span>
              <span className="font-semibold text-black">
                ₱{ticketPrice.toLocaleString()}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-black/50">Quantity</span>
              <span className="font-semibold text-black">{quantity}</span>
            </div>

            <div className="mt-4 border-t border-black/10 pt-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-black">
                Total Amount
              </span>
              <span className="text-xl font-bold text-black">
                ₱{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-red-600 transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Ticket Order'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TicketForm