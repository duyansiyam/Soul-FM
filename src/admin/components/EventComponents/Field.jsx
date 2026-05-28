export default function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
