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
      <GamifyGame questions={questions} />
    </div>
  )
}
