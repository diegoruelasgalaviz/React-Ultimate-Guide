import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Documents' },
  { href: '/gamify', label: 'Gamify' },
]

export default function Navbar() {
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
            GitHub ↗
          </a>
        </div>
      </nav>
    </header>
  )
}
