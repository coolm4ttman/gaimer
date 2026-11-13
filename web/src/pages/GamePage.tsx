import { useParams } from 'react-router'
import { Faq } from '../components/Faq'
import { GameHero } from '../components/GameHero'
import { GameIdeas, GameToolchain } from '../components/GameShowcase'
import { gameShowcase } from '../data/gameShowcase'
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
        <GameIdeas name={game.short} content={gameShowcase[game.slug]} />
      </div>
      <div className="grad-down">
        <GameToolchain name={game.short} hero={game.hero} content={gameShowcase[game.slug]} />
      </div>
      <div className="grad-up">
        <Faq items={gameFaqs[game.slug]} />
      </div>
    </div>
  )
}
