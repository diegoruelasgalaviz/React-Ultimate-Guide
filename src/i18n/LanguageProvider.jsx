'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { strings, LEVEL_LABELS, CATEGORY_LABELS } from './strings'

const STORAGE_KEY = 'rug_lang'

const LanguageContext = createContext(null)

function readStoredLang() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'es' || stored === 'en' ? stored : null
  } catch {
    return null
  }
}

function writeStoredLang(lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // localStorage unavailable (private mode, etc.) — language just won't persist
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en')

  useEffect(() => {
    // Read localStorage only after mount so the server-rendered ('en') and
    // first client render match, avoiding a hydration mismatch.
    const stored = readStoredLang()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setLangState(stored)
  }, [])

  function setLang(next) {
    setLangState(next)
    writeStoredLang(next)
  }

  function t(key) {
    return strings[lang]?.[key] ?? strings.en[key] ?? key
  }

  function levelLabel(level) {
    return LEVEL_LABELS[lang]?.[level] ?? level
  }

  function categoryLabel(category) {
    return CATEGORY_LABELS[lang]?.[category] ?? category
  }

  const value = { lang, setLang, t, levelLabel, categoryLabel }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside a LanguageProvider')
  return ctx
}
