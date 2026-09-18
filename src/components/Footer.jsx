'use client'

import { useLanguage } from '@/i18n/LanguageProvider'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-gray-500 sm:flex-row">
        <p>{t('footer_tagline')}</p>
        <a
          href="https://github.com/diegoruelasgalaviz/React-Ultimate-Guide"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-gray-300"
        >
          {t('footer_source')}
        </a>
      </div>
    </footer>
  )
}
