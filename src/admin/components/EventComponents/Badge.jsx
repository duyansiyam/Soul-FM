const STATUS_META = {
  active:    { label: 'Active',    className: 'bg-green-50 text-green-700 border-green-200' },
  draft:     { label: 'Draft',     className: 'bg-gray-50 text-gray-500 border-gray-200'   },
  cancelled: { label: 'Cancelled', className: 'bg-red-50 text-red-600 border-red-200'      },
  completed: { label: 'Completed', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
};

export default function Badge({ status }) {
  const m = STATUS_META[status] ?? {
    label: status,
    className: 'bg-blue-50 text-blue-600 border-blue-200',
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wide border rounded ${m.className}`}>
      {m.label}
    </span>
  );
}
