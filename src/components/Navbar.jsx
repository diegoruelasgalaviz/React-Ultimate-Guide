'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: t('nav_home') },
    { href: '/docs', label: t('nav_docs') },
    { href: '/gamify', label: t('nav_gamify') },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0c10]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-bold text-white">
            R
          </span>
          <span>React Ultimate Guide</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/diegoruelasgalaviz/React-Ultimate-Guide"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-3 py-1.5 text-gray-200 transition hover:border-brand-400 hover:text-white"
          >
            {t('nav_github')} ↗
          </a>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-gray-200 transition hover:border-brand-400 hover:text-white"
            >
              <span aria-hidden="true">🌐</span>
              <span>{lang.toUpperCase()}</span>
              <svg
                className={`h-3 w-3 transition ${open ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <>
                <button
                  type="button"
                  aria-label="Close language menu"
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 z-10 cursor-default"
                />
                <ul
                  role="listbox"
                  className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-lg border border-white/10 bg-[#14151c] py-1 shadow-xl"
                >
                  {['en', 'es'].map((code) => (
                    <li key={code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={lang === code}
                        onClick={() => {
                          setLang(code)
                          setOpen(false)
                        }}
                        className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition hover:bg-white/5 ${
                          lang === code ? 'text-brand-300' : 'text-gray-300'
                        }`}
                      >
                        {t(`lang_name_${code}`)}
                        {lang === code && <span aria-hidden="true">✓</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
