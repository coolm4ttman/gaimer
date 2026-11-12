import { useParams } from 'react-router'
import { Faq } from '../components/Faq'
import { GameHero } from '../components/GameHero'
import { Platform } from '../components/Platform'
import { gameContent } from '../data/gameContent'
import { gameFaqs } from '../data/gameFaqs'
import { games } from '../data/games'
import { NotFoundPage } from './NotFoundPage'

export function GamePage() {
  const { slug } = useParams()
  const game = games.find((g) => g.slug === slug)
  if (!game) return <NotFoundPage />

  return (
    <div className="theme-dark">
      {/* Padding, not the hero's own margin: a margin would collapse through this wrapper and show the light page behind the nav. */}
      <div className="grad-down pt-16">
        <GameHero game={game} />
      </div>
      <div className="grad-up">
        <Platform content={gameContent[game.slug]} />
      </div>
      <div className="grad-down">
        <Faq items={gameFaqs[game.slug]} />
      </div>
    </div>
  )
}
