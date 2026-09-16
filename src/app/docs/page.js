import { topics } from '@/data/topics'
import DocsExplorer from '@/components/DocsExplorer'

export const metadata = {
  title: 'Documents · React Ultimate Guide',
  description:
    'Every React topic, junior through graduate level, as its own study document. Filter by difficulty and search across all of them.',
}

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Documents</h1>
        <p className="mt-3 max-w-2xl text-gray-400">
          {topics.length} self-contained study documents covering React.js and its ecosystem,
          tagged by difficulty level so you always know what to read next.
        </p>
      </div>
      <DocsExplorer topics={topics} />
    </div>
  )
}
