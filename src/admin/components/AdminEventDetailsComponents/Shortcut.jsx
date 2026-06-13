export default function Shortcut({ href, title, text, active }) {
  return (
    <a href={href} className="flex gap-4 group no-underline">
      <div className="flex flex-col items-center">
        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center ${
            active ? 'border-sky-400 bg-sky-50' : 'border-slate-200 bg-white'
          }`}
        >
          <div className={`w-3 h-3 rounded-full ${active ? 'bg-sky-400' : 'bg-white'}`} />
        </div>
        <div className="w-px h-12 bg-slate-200" />
      </div>

      <div className="pb-5">
        <p className="font-semibold text-slate-900 group-hover:text-sky-500">{title}</p>
        <p className="text-sm text-slate-500 leading-relaxed">{text}</p>
      </div>
    </a>
  )
}
