'use client'

import Link from 'next/link'
import { topics, LEVELS, CATEGORIES } from '@/data/topics'
import { questions } from '@/data/quiz'
import LevelBadge from '@/components/LevelBadge'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function Home() {
  const { t, categoryLabel } = useLanguage()
  const levelCounts = LEVELS.map((level) => ({
    level,
    count: topics.filter((topic) => topic.level === level).length,
  }))

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300">
          {t('home_kicker')}
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {t('home_title_pre')}{' '}
          <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
            {t('home_title_highlight')}
          </span>{' '}
          {t('home_title_post')}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">{t('home_lede')}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-400"
          >
            {t('home_cta_docs')}
          </Link>
          <Link
            href="/gamify"
            className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-gray-100 transition hover:border-brand-400 hover:text-white"
          >
            {t('home_cta_gamify')}
          </Link>
        </div>

        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          <Stat label={t('stat_topics')} value={topics.length} />
          <Stat label={t('stat_levels')} value={LEVELS.length} />
          <Stat label={t('stat_categories')} value={CATEGORIES.length} />
          <Stat label={t('stat_questions')} value={questions.length} />
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <FeatureCard
            title={t('feature_docs_title')}
            href="/docs"
            description={t('feature_docs_body')}
            icon="📚"
          />
          <FeatureCard
            title={t('feature_gamify_title')}
            href="/gamify"
            description={t('feature_gamify_body')}
            icon="🎮"
          />
          <FeatureCard
            title={t('feature_reference_title')}
            href="/docs"
            description={t('feature_reference_body')}
            icon="🧭"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-white">{t('home_curriculum_title')}</h2>
          <Link href="/docs" className="text-sm font-medium text-brand-300 hover:text-brand-200">
            {t('home_curriculum_cta')}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {levelCounts.map(({ level, count }) => (
            <div key={level} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <LevelBadge level={level} />
              <p className="mt-3 text-3xl font-bold text-white">{count}</p>
              <p className="text-sm text-gray-400">
                {count === 1 ? t('home_topic_singular') : t('home_topic_plural')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold text-white">{t('home_categories_title')}</h2>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
            >
              {categoryLabel(category)}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white">{t('home_ready_title')}</h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-400">{t('home_ready_body')}</p>
        <Link
          href="/docs"
          className="mt-8 inline-flex rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-400"
        >
          {t('home_ready_cta')}
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
