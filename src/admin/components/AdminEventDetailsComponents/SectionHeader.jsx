export default function SectionHeader({ title, subtitle }) {
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
