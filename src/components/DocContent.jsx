'use client'

import Link from 'next/link'
import { useLanguage } from '@/i18n/LanguageProvider'
import LevelBadge from './LevelBadge'
import DocBody from './DocBody'

export default function DocContent({ topic, prev, next, related }) {
  const { t, lang, categoryLabel } = useLanguage()

  const title = lang === 'es' && topic.title_es ? topic.title_es : topic.title
  const summary = lang === 'es' && topic.summary_es ? topic.summary_es : topic.summary
  const hasSpanishBody = Boolean(topic.blocks_es)
  const blocks = lang === 'es' && hasSpanishBody ? topic.blocks_es : topic.blocks
  const showEnglishOnlyNotice = lang === 'es' && !hasSpanishBody

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/docs" className="text-sm text-gray-400 hover:text-gray-200">
        {t('doc_back')}
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <LevelBadge level={topic.level} />
        <span className="text-xs text-gray-500">{categoryLabel(topic.category)}</span>
        <span className="text-xs text-gray-500">·</span>
        <span className="text-xs text-gray-500">
          {topic.minutes} {t('docs_min_read')}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{title}</h1>
      <p className="mt-3 text-lg text-gray-400">{summary}</p>

      {showEnglishOnlyNotice && (
        <p className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
          {t('doc_body_es_missing')}
        </p>
      )}

      <div className="mt-10">
        <DocBody blocks={blocks} />
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
            ← {lang === 'es' && prev.title_es ? prev.title_es : prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/docs/${next.id}`} className="text-right text-sm text-gray-400 hover:text-white">
            {lang === 'es' && next.title_es ? next.title_es : next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      {related.length > 0 && (
        <div className="mt-14 border-t border-white/10 pt-8">
          <h2 className="mb-4 text-lg font-semibold text-white">
            {t('doc_more_in')} {categoryLabel(topic.category)}
          </h2>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={`/docs/${r.id}`} className="text-sm text-brand-300 hover:text-brand-200">
                  {lang === 'es' && r.title_es ? r.title_es : r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
