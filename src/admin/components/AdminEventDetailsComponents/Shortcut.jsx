export default function Shortcut({ href, title, text, active }) {
  return (
    <a href={href} className="flex gap-4 group no-underline">
      <div className="flex flex-col items-center">
        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center ${
            active ? 'border-sky-400 bg-sky-50' : 'border-gray-300 bg-white'
          }`}
        >
          <div className={`w-3 h-3 rounded-full ${active ? 'bg-sky-400' : 'bg-white'}`} />
        </div>
        <div className="w-px h-12 bg-gray-300" />
      </div>

      <div className="pb-5">
        <p className="font-bold text-gray-700 group-hover:text-sky-500">{title}</p>
        <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
      </div>
    </a>
  )
}
