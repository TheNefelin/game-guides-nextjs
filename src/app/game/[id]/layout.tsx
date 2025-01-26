import PageNotFound from "@/components/PageNotFound"
import Link from "next/link"
import { Game } from "@/services/models"
import { getApiResultAsync } from "@/services/fetching"

interface GameLayoutProps {
  params: Promise<{ id: string }>
  children: React.ReactNode 
}

export default async function GameLayout({ params, children }: GameLayoutProps) {
  const { id } = await params
  if (isNaN(Number(id))) return <PageNotFound/>
  const gameId: number = Number(id)

  // const apiResult = await Singleton.getApiResultAsync()  
  const apiResult = await getApiResultAsync()
  const game: Game | undefined = apiResult.data.find(e => e.id === gameId);
  if (!game) return <PageNotFound/>

  return(
    apiResult.isSucces &&
    <article key={game.id} className='w-full'>
      <h1 className='card-body card-title bg-base-200 uppercase shadow-md'>{game.name}</h1>
      <div className='my-2 flex flex-wrap gap-2'>
        <Link className='btn btn-warning' href={`/game/${id}`}>Juego</Link>
        {
          game.guides.length > 0 &&
          <Link className='btn btn-warning' href={`/game/${id}/timeline`}>Guia Time Line</Link>
        }
        {
          game.characters.length > 0 &&
          <Link className='btn btn-warning' href={`/game/${id}/character`}>Personajes</Link>
        }
        {
          game.sources.length > 0 &&
          <Link className='btn btn-warning' href={`/game/${id}/source`}>Fuentes</Link>
        }
      </div>
      <p className='indent-8 p-4 bg-base-200 shadow-md mb-4'>{game.description}</p>
      { children }
    </article>
  )
}