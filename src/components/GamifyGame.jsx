'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { LEVELS } from '@/data/topics'
import { POINTS_BY_LEVEL } from '@/data/quiz'
import { useLanguage } from '@/i18n/LanguageProvider'
import LevelBadge from './LevelBadge'

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function readBestScore() {
  try {
    const raw = window.localStorage.getItem('rug_best_score')
    return raw ? Number(raw) : 0
  } catch {
    return 0
  }
}

function writeBestScore(score) {
  try {
    window.localStorage.setItem('rug_best_score', String(score))
  } catch {
    // ignore — best-score persistence is a nice-to-have, not required
  }
}

export default function GamifyGame({ questions }) {
  const { t, lang, levelLabel } = useLanguage()
  const [levelFilter, setLevelFilter] = useState('All')
  const [deck, setDeck] = useState(null)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const pool = useMemo(() => {
    if (levelFilter === 'All') return questions
    return questions.filter((q) => q.level === levelFilter)
  }, [questions, levelFilter])

  function startGame() {
    setDeck(shuffle(pool))
    setIndex(0)
    setSelected(null)
    setScore(0)
    setStreak(0)
    setCorrectCount(0)
    setFinished(false)
    setBestScore(readBestScore())
  }

  function localized(question, field) {
    const esField = `${field}_es`
    if (lang === 'es' && question[esField]) return question[esField]
    return question[field]
  }

  function handleAnswer(optionIndex) {
    if (selected !== null) return
    const question = deck[index]
    const isCorrect = optionIndex === question.correctIndex
    setSelected(optionIndex)

    if (isCorrect) {
      const gained = POINTS_BY_LEVEL[question.level] ?? 10
      const nextStreak = streak + 1
      const streakBonus = nextStreak >= 3 ? Math.floor(gained * 0.5) : 0
      setScore((s) => s + gained + streakBonus)
      setStreak(nextStreak)
      setBestStreak((b) => Math.max(b, nextStreak))
      setCorrectCount((c) => c + 1)
    } else {
      setStreak(0)
    }
  }

  function handleNext() {
    if (index + 1 >= deck.length) {
      const finalScore = score
      const currentBest = readBestScore()
      if (finalScore > currentBest) writeBestScore(finalScore)
      setBestScore(Math.max(finalScore, currentBest))
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  if (!deck) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{t('gamify_title')}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-400">{t('gamify_description')}</p>
        </div>
        <p className="mb-6 text-gray-400">{t('gamify_intro_body')}</p>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {['All', ...LEVELS].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevelFilter(l)}
              aria-pressed={levelFilter === l}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                levelFilter === l
                  ? 'border-brand-400 bg-brand-500/20 text-brand-200'
                  : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/25 hover:text-gray-200'
              }`}
            >
              {l === 'All' ? t('docs_level_all') : levelLabel(l)}
            </button>
          ))}
        </div>
        <p className="mb-8 text-sm text-gray-500">
          {pool.length} {t('gamify_pool_count_prefix')}
        </p>
        <button
          type="button"
          onClick={startGame}
          disabled={pool.length === 0}
          className="rounded-lg bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t('gamify_start')}
        </button>
      </div>
    )
  }

  if (finished) {
    const total = deck.length
    const pct = Math.round((correctCount / total) * 100)
    return (
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-brand-300">
          {t('gamify_complete')}
        </p>
        <h2 className="mt-2 text-4xl font-bold text-white">
          {score} {t('gamify_pts')}
        </h2>
        <p className="mt-3 text-gray-400">
          {correctCount} / {total} {t('gamify_correct_of')} ({pct}%) · {t('gamify_best_streak')}{' '}
          {bestStreak}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {t('gamify_personal_best')}: {bestScore} {t('gamify_pts')}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setDeck(null)}
            className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
          >
            {t('gamify_play_again')}
          </button>
          <Link
            href="/docs"
            className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-gray-100 transition hover:border-brand-400 hover:text-white"
          >
            {t('gamify_review_docs')}
          </Link>
        </div>
      </div>
    )
  }

  const question = deck[index]
  const progress = Math.round((index / deck.length) * 100)
  const options = localized(question, 'options')

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between text-sm text-gray-400">
        <span>
          {t('gamify_question_of')} {index + 1} / {deck.length}
        </span>
        <span className="flex items-center gap-3">
          <span>
            {t('gamify_score')}: {score}
          </span>
          <span>
            {t('gamify_streak')}: {streak}
          </span>
        </span>
      </div>
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="mb-4 flex items-center gap-3">
        <LevelBadge level={question.level} />
        <span className="text-xs text-gray-500">
          {POINTS_BY_LEVEL[question.level]} {t('gamify_pts')}
        </span>
      </div>

      <h2 className="mb-6 text-xl font-semibold text-white">{localized(question, 'prompt')}</h2>

      <div className="space-y-3">
        {options.map((option, i) => {
          const isSelected = selected === i
          const isCorrectOption = i === question.correctIndex
          let style = 'border-white/10 bg-white/[0.03] hover:border-white/25'
          if (selected !== null) {
            if (isCorrectOption) style = 'border-emerald-400 bg-emerald-500/10'
            else if (isSelected) style = 'border-rose-400 bg-rose-500/10'
            else style = 'border-white/5 bg-white/[0.02] opacity-60'
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
              className={`block w-full rounded-lg border p-4 text-left text-sm text-gray-100 transition ${style}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-gray-300">{localized(question, 'explanation')}</p>
          <div className="mt-3 flex items-center justify-between">
            <Link
              href={`/docs/${question.topicId}`}
              className="text-sm text-brand-300 hover:text-brand-200"
            >
              {t('gamify_read_full_doc')}
            </Link>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-lg bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-400"
            >
              {index + 1 >= deck.length ? t('gamify_finish') : t('gamify_next')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
