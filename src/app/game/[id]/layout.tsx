import Link from "next/link"
import PageNotFound from "@/components/PageNotFound"
import { Game } from "@/services/models"
import { authOptions } from "@/services/authOptions"
import { getServerSession } from "next-auth"
import { getGamesAsync } from "@/services/fetching"

interface GameLayoutProps {
  params: Promise<{ id: string }>
  children: React.ReactNode 
}

export default async function GameLayout({ params, children }: GameLayoutProps) {
  const { id } = await params
  if (isNaN(Number(id))) return <PageNotFound/>
  const gameId: number = Number(id)

  const session = await getServerSession(authOptions)
  const apiResult = await getGamesAsync(session?.user?.apiData?.idUser)
  const game: Game | undefined = apiResult.data?.find(e => e.id === gameId)

  if (!game) return <PageNotFound/>

  return(
    <article key={game.id} className='w-full px-2 py-4'>
      <h1 className='card-body card-title bg-base-200 uppercase shadow-md'>{game.name}</h1>
      <div className='my-2 flex flex-wrap gap-2'>
        <Link className='btn btn-sm btn-warning' href={`/game/${id}`}>Juego</Link>
        {
          game.guides.length > 0 &&
          <Link className='btn btn-sm btn-warning' href={`/game/${id}/timeline`}>Guia Time Line</Link>
        }
        {
          game.characters.length > 0 &&
          <Link className='btn btn-sm btn-warning' href={`/game/${id}/character`}>Personajes</Link>
        }
        {
          game.sources.length > 0 &&
          <Link className='btn btn-sm btn-warning' href={`/game/${id}/source`}>Fuentes</Link>
        }
      </div>
      <p className='indent-8 p-4 bg-base-200 shadow-md mb-4'>{game.description}</p>
      { children }
    </article>
  )
}