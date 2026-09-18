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
      <DocsExplorer topics={topics} />
    </div>
  )
}
