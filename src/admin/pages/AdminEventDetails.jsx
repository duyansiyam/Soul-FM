import { useNavigate } from 'react-router-dom'
import { BASE } from '../components/AdminEventDetailsComponents/constants'
import { useEventForm } from '../components/AdminEventDetailsComponents/useEventForm'
import Shortcut from '../components/AdminEventDetailsComponents/Shortcut'
import EventDetailSection from '../components/AdminEventDetailsComponents/EventDetailSection'
import DateTimeSection from '../components/AdminEventDetailsComponents/DateTimeSection'
import LocationSection from '../components/AdminEventDetailsComponents/LocationSection'
import DescriptionSection from '../components/AdminEventDetailsComponents/DescriptionSection'

export default function AdminEventDetails() {
  const {
    eventId,
    loading,
    form,
    updateForm,
    locationType,
    setLocationType,
    posterPreview,
    descriptionRef,
    handlePosterUpload,
    handleSaveDateTime,
    handleEditDateTime,
    handleDeleteDateTime,
    runCommand,
    handleSubmit,
    navigate,
  } = useEventForm()

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header bar (styled like AdminOrders) */}
          <div className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200 pt-4 pb-4 -mx-4">
            <div className="flex items-center justify-between gap-4 px-4">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-sky-500">Event Setup</p>
                <h1 className="mt-1 text-2xl font-bold text-slate-900">Event Details</h1>
              </div>

              {eventId && (
                <button
                  type="button"
                  onClick={() => navigate(`${BASE}/ticket-types/${eventId}`)}
                  className="rounded-lg bg-sky-600 px-5 py-3 text-sm font-bold text-white hover:bg-sky-700"
                >
                  Open Ticket Types
                </button>
              )}
            </div>
          </div>

          <EventDetailSection
            form={form}
            updateForm={updateForm}
            posterPreview={posterPreview}
            onPosterUpload={handlePosterUpload}
          />

          <DateTimeSection
            form={form}
            updateForm={updateForm}
            onSaveDateTime={handleSaveDateTime}
            onEditDateTime={handleEditDateTime}
            onDeleteDateTime={handleDeleteDateTime}
          />

          <LocationSection
            form={form}
            updateForm={updateForm}
            locationType={locationType}
            setLocationType={setLocationType}
          />

          <DescriptionSection
            descriptionRef={descriptionRef}
            runCommand={runCommand}
            updateForm={updateForm}
          />

          {/* Footer actions */}
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

        {/* Sidebar shortcuts */}
        <aside className="hidden xl:block">
          <div className="sticky top-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
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
