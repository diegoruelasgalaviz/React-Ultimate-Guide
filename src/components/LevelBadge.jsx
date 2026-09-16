const STYLES = {
  Junior: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Mid: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  Senior: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Graduate: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30',
}

export default function LevelBadge({ level, className = '' }) {
  const style = STYLES[level] ?? 'bg-white/10 text-gray-300 border-white/20'
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${style} ${className}`}
    >
      {level}
    </span>
  )
}
