import PageNotFound from "@/components/PageNotFound"
import { Game } from "@/services/models"
import Singleton from "@/services/singleton"

interface CharacterPageProps {
  params: Promise<{ id: string }>
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params
  if (isNaN(Number(id))) return <PageNotFound/>
  const gameId: number = Number(id)

  const apiResult = await Singleton.getApiResultAsync()
  const game: Game | undefined = apiResult.data.find(e => e.id === gameId);
  if (!game) return <PageNotFound/>

  return(
    <div>CHARACTERS {gameId}</div>
  )
}