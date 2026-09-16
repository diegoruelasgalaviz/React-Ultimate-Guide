import Link from 'next/link'
import { topics, LEVELS, CATEGORIES } from '@/data/topics'
import { questions } from '@/data/quiz'
import LevelBadge from '@/components/LevelBadge'

export default function Home() {
  const levelCounts = LEVELS.map((level) => ({
    level,
    count: topics.filter((t) => t.level === level).length,
  }))

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300">
          No backend • No signup • Everything runs in your browser
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Learn React the way you&apos;d want a{' '}
          <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
            senior engineer
          </span>{' '}
          to teach it to you
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
          React Ultimate Guide is a free, open study reference covering React.js and its
          ecosystem end to end — from your very first component to the internals of
          concurrent rendering and Server Components. Read it, search it, and test
          yourself with the gamified practice mode.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-400"
          >
            Browse the documents
          </Link>
          <Link
            href="/gamify"
            className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-gray-100 transition hover:border-brand-400 hover:text-white"
          >
            Try the gamified quiz
          </Link>
        </div>

        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          <Stat label="Topics" value={topics.length} />
          <Stat label="Levels" value={LEVELS.length} />
          <Stat label="Categories" value={CATEGORIES.length} />
          <Stat label="Quiz questions" value={questions.length} />
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <FeatureCard
            title="Documents"
            href="/docs"
            description="Every topic is its own self-contained study document — real explanations and code, not flashcards. Filter by difficulty or search by keyword to find exactly what you need."
            icon="📚"
          />
          <FeatureCard
            title="Gamify"
            href="/gamify"
            description="Turn studying into a game: answer questions tied to each document, build a streak, earn points by difficulty, and see how far you get before missing one."
            icon="🎮"
          />
          <FeatureCard
            title="Reference, forever"
            href="/docs"
            description="Come back any time you need a refresher — on hooks, rendering internals, testing, or architecture — without digging through scattered blog posts."
            icon="🧭"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-white">A curriculum from junior to graduate level</h2>
          <Link href="/docs" className="text-sm font-medium text-brand-300 hover:text-brand-200">
            View all documents →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {levelCounts.map(({ level, count }) => (
            <div key={level} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <LevelBadge level={level} />
              <p className="mt-3 text-3xl font-bold text-white">{count}</p>
              <p className="text-sm text-gray-400">{count === 1 ? 'topic' : 'topics'}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold text-white">Everything is covered by category</h2>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to level up?</h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          Pick a topic that matches where you are today, and let the difficulty filter guide
          you toward what&apos;s next.
        </p>
        <Link
          href="/docs"
          className="mt-8 inline-flex rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-400"
        >
          Start learning
        </Link>
      </section>
    </>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] py-4">
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
    </div>
  )
}

function FeatureCard({ title, href, description, icon }) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand-400/50 hover:bg-white/[0.06]"
    >
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-white transition group-hover:text-brand-300">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </Link>
  )
}
