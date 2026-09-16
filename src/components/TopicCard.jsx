import Link from 'next/link'
import LevelBadge from './LevelBadge'

export default function TopicCard({ topic }) {
  return (
    <Link
      href={`/docs/${topic.id}`}
      className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-brand-400/50 hover:bg-white/[0.06]"
    >
      <div className="mb-3 flex items-center justify-between">
        <LevelBadge level={topic.level} />
        <span className="text-xs text-gray-500">{topic.minutes} min read</span>
      </div>
      <h3 className="mb-1.5 text-lg font-semibold text-white transition group-hover:text-brand-300">
        {topic.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-400">{topic.summary}</p>
      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-gray-400">
          {topic.category}
        </span>
        {topic.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-gray-500">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
