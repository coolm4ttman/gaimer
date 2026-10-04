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
    <>
      <GameHero game={game} />
      <Platform content={gameContent[game.slug]} />
      <Faq items={gameFaqs[game.slug]} />
    </>
  )
}
