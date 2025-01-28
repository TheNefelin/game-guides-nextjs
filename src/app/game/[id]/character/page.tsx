import Image from "next/image"
import PageNotFound from "@/components/PageNotFound"
// import Singleton from "@/services/singleton"
import { Character, Game } from "@/services/models"
import { getGameAsync, getImgPath } from "@/services/fetching"

interface CharacterPageProps {
  params: Promise<{ id: string }>
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params
  if (isNaN(Number(id))) return <PageNotFound/>
  const gameId: number = Number(id)

  // const game: Game | undefined = await Singleton.getGameAsync(gameId)
  const game: Game | undefined = await getGameAsync(gameId)  
  if (!game) return <PageNotFound/>

  return(
    <div className='bg-base-200 mb-4 card card-side shadow-xl flex gap-4 flex-wrap justify-center p-4'>
      {game.characters.map((character: Character) => (
        <div key={character.id} className="card bg-base-100 shadow-xl max-w-xs w-full">
        <figure>
          <Image
            className='w-auto min-w-24 pt-4'
            src={getImgPath(character.imgUrl)}
            alt={character.name}
            height={50}
            width={50}
            blurDataURL={getImgPath(character.imgUrl)}
            placeholder="blur"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${character.name} (${character.id})`}</h2>
          <p>{character.description}</p>
        </div>
      </div>
      ))}
    </div>
  )
}