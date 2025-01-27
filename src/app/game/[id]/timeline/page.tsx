import PageNotFound from "@/components/PageNotFound";
import Singleton from "@/services/singleton";
import TimelineGuide from "@/components/TimelineGuide";
import { Game } from "@/services/models";

interface CharacterPageProps {
  params: Promise<{ id: string }>
}

export default async function TimelinePage({ params }: CharacterPageProps) {
  const { id } = await params
  if (isNaN(Number(id))) return <PageNotFound/>
  const gameId: number = Number(id)

  const game: Game | undefined = await Singleton.getGameAsync(gameId)
  if (!game) return <PageNotFound/>
  
  return(
    <TimelineGuide guides={ game.guides }/>
  )
}