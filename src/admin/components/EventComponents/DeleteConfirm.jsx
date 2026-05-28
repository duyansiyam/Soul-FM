import Modal from './Modal';

export default function DeleteConfirm({ event, onConfirm, onClose, loading, error }) {
  return (
    <Modal title="Delete Event" onClose={onClose}>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        Are you sure you want to delete{' '}
        <span className="font-bold text-gray-900">{event.event_name}</span>?
        This action cannot be undone.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-center gap-2 mb-4">
          <span>⚠</span><span>{error}</span>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
        >
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </button>
      </div>
    </Modal>
  );
}
