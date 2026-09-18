import { notFound } from 'next/navigation'
import { topics } from '@/data/topics'
import DocContent from '@/components/DocContent'

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

  return <DocContent topic={topic} prev={prev} next={next} related={related} />
}
