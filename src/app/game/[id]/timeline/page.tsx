import PageNotFound from "@/components/PageNotFound";
import TimelineGuide from "@/components/TimelineGuide";
import { Game } from "@/services/models";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/authOptions";
import { getGamesAsync } from "@/services/fetching";

interface CharacterPageProps {
  params: Promise<{ id: string }>
}

export default async function TimelinePage({ params }: CharacterPageProps) {
  const { id } = await params
  if (isNaN(Number(id))) return <PageNotFound/>
  const gameId: number = Number(id)

  const session = await getServerSession(authOptions)
  const apiResult = await getGamesAsync(session?.user?.apiData?.idUser)
  const game: Game | undefined = apiResult.data?.find(e => e.id === gameId)
  if (!game) return <PageNotFound/>

  return(
    <TimelineGuide guides={ game.guides }/>
  )
}