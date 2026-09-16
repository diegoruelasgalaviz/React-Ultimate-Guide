import { questions } from '@/data/quiz'
import GamifyGame from '@/components/GamifyGame'

export const metadata = {
  title: 'Gamify · React Ultimate Guide',
  description:
    'Test what you know with a scored, streak-based React quiz spanning junior to graduate-level topics — entirely client-side, no backend required.',
}

export default function GamifyPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Gamify</h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-400">
          Turn studying into a game. Answer questions tied directly to the Documents
          library, earn points based on difficulty, and chain a streak for bonus points.
        </p>
      </div>
      <GamifyGame questions={questions} />
    </div>
  )
}
