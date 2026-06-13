export default function ToolbarButton({ children, onClick }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="min-w-9 h-9 px-2 rounded hover:bg-slate-100 font-semibold text-[18px] leading-none text-slate-700"
    >
      {children}
    </button>
  )
}
