import PageNotFound from "@/components/PageNotFound";
// import Singleton from "@/services/singleton";
import TimelineGuide from "@/components/TimelineGuide";
import { Game } from "@/services/models";
import { fetchApiResult } from "@/services/fetching";

interface CharacterPageProps {
  params: Promise<{ id: string }>
}

export default async function TimelinePage({ params }: CharacterPageProps) {
  const { id } = await params
  if (isNaN(Number(id))) return <PageNotFound/>
  const gameId: number = Number(id)

  // const apiResult = await Singleton.getApiResultAsync()
  const apiResult = await fetchApiResult()
  const game: Game | undefined = apiResult.data.find(e => e.id === gameId);
  if (!game) return <PageNotFound/>
  
  return(
    <TimelineGuide guides={ game.guides }/>
  )
}