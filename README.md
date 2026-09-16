# React Ultimate Guide

A free, self-contained study reference for React.js and its ecosystem — built to teach,
help you study, and serve as a lookup reference whether you're writing your first
component or architecting a large-scale app. Everything lives in the frontend: there is
no backend, no database, and no signup. All documents and quiz questions are embedded
directly in the code as static data.

## What's inside

- **Landing page (`/`)** — overview, stats, and entry points into the rest of the site.
- **Documents (`/docs`)** — a library of React topics, each its own study document,
  spanning **Junior → Mid → Senior → Graduate** level. Includes a search bar and a
  difficulty-level filter.
- **Gamify (`/gamify`)** — a scored, streak-based quiz tied directly to the documents,
  with points weighted by difficulty and a bonus for answer streaks.

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- React 19
- Tailwind CSS v4
- No backend, no external APIs — all content is static data under `src/data/`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Project structure

```
src/
  app/
    page.js                # Landing page
    docs/page.js            # Documents listing (search + filter)
    docs/[topicId]/page.js  # Individual document page
    gamify/page.js          # Gamified quiz page
  components/               # Navbar, Footer, TopicCard, GamifyGame, etc.
  data/
    topics.js               # The full study document library
    quiz.js                 # Quiz question bank, tied to topics by id
```

## Contributing

Adding a new document is just adding an entry to `src/data/topics.js` (title, level,
category, and structured content blocks) — no routing or UI code required, since the
`/docs/[topicId]` route renders any topic automatically.
