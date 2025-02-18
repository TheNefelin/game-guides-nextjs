import Link from "next/link";
import PageNotFound from "@/components/PageNotFound";
import { Game, Source } from "@/services/models";
import { getGamesAsync } from "@/services/fetching";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/authOptions";

interface CharacterPageProps {
  params: Promise<{ id: string }>
}

export default async function SourcePage({ params }: CharacterPageProps) {
  const { id } = await params
  if (isNaN(Number(id))) return <PageNotFound/>
  const gameId: number = Number(id)

  const session = await getServerSession(authOptions)
  const apiResult = await getGamesAsync(session?.user?.apiData?.idUser)
  const game: Game | undefined = apiResult.data?.find(e => e.id === gameId)

  return(
    <div className='flex flex-col gap-1 pl-16 py-4 bg-base-200 shadow-md mb-4'>
      {game?.sources.map((source: Source) => (
        <Link key={source.id} className='link' target="_blank" href={source.url}>{source.name}</Link>
      ))}
    </div>
  )
}