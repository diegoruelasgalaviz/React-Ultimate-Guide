export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-gray-500 sm:flex-row">
        <p>React Ultimate Guide — a free, open study reference. No backend, no tracking.</p>
        <a
          href="https://github.com/diegoruelasgalaviz/React-Ultimate-Guide"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-gray-300"
        >
          View source on GitHub
        </a>
      </div>
    </footer>
  )
}
