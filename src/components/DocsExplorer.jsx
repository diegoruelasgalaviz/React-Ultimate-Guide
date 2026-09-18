'use client'

import { useMemo, useState } from 'react'
import { LEVELS } from '@/data/topics'
import { useLanguage } from '@/i18n/LanguageProvider'
import TopicCard from './TopicCard'

export default function DocsExplorer({ topics }) {
  const { t, lang, categoryLabel, levelLabel } = useLanguage()
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('All')

  const localizedTopics = useMemo(
    () =>
      topics.map((topic) => ({
        ...topic,
        localizedTitle: lang === 'es' && topic.title_es ? topic.title_es : topic.title,
        localizedSummary: lang === 'es' && topic.summary_es ? topic.summary_es : topic.summary,
      })),
    [topics, lang]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return localizedTopics.filter((topic) => {
      const matchesLevel = level === 'All' || topic.level === level
      if (!matchesLevel) return false
      if (!q) return true
      const haystack = [
        topic.localizedTitle,
        topic.localizedSummary,
        topic.category,
        categoryLabel(topic.category),
        ...topic.tags,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [localizedTopics, query, level, categoryLabel])

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">{t('docs_title')}</h1>
        <p className="mt-3 max-w-2xl text-gray-400">
          {topics.length} {t('docs_description')}
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('docs_search_placeholder')}
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-400 focus:outline-none"
            aria-label={t('docs_search_label')}
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label={t('docs_filter_label')}>
          {['All', ...LEVELS].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              aria-pressed={level === l}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                level === l
                  ? 'border-brand-400 bg-brand-500/20 text-brand-200'
                  : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/25 hover:text-gray-200'
              }`}
            >
              {l === 'All' ? t('docs_level_all') : levelLabel(l)}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? t('docs_result_singular') : t('docs_result_plural')}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 py-16 text-center text-gray-500">
          {t('docs_empty_prefix')} &quot;{query}&quot;. {t('docs_empty_suffix')}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  )
}
