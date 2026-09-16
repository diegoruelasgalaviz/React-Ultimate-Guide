import Link from 'next/link'
import { notFound } from 'next/navigation'
import { topics } from '@/data/topics'
import LevelBadge from '@/components/LevelBadge'
import DocBody from '@/components/DocBody'

export function generateStaticParams() {
  return topics.map((topic) => ({ topicId: topic.id }))
}

export async function generateMetadata({ params }) {
  const { topicId } = await params
  const topic = topics.find((t) => t.id === topicId)
  if (!topic) return {}
  return {
    title: `${topic.title} · React Ultimate Guide`,
    description: topic.summary,
  }
}

export default async function DocPage({ params }) {
  const { topicId } = await params
  const index = topics.findIndex((t) => t.id === topicId)
  if (index === -1) notFound()

  const topic = topics[index]
  const prev = topics[index - 1]
  const next = topics[index + 1]
  const related = topics
    .filter((t) => t.id !== topic.id && t.category === topic.category)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/docs" className="text-sm text-gray-400 hover:text-gray-200">
        ← All documents
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <LevelBadge level={topic.level} />
        <span className="text-xs text-gray-500">{topic.category}</span>
        <span className="text-xs text-gray-500">·</span>
        <span className="text-xs text-gray-500">{topic.minutes} min read</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{topic.title}</h1>
      <p className="mt-3 text-lg text-gray-400">{topic.summary}</p>

      <div className="mt-10">
        <DocBody blocks={topic.blocks} />
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {topic.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-400">
            #{tag}
          </span>
        ))}
      </div>

      <nav className="mt-14 flex items-center justify-between gap-4 border-t border-white/10 pt-8">
        {prev ? (
          <Link href={`/docs/${prev.id}`} className="text-sm text-gray-400 hover:text-white">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/docs/${next.id}`} className="text-right text-sm text-gray-400 hover:text-white">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      {related.length > 0 && (
        <div className="mt-14 border-t border-white/10 pt-8">
          <h2 className="mb-4 text-lg font-semibold text-white">More in {topic.category}</h2>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={`/docs/${r.id}`} className="text-sm text-brand-300 hover:text-brand-200">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
