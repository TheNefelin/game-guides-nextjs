import Image from "next/image"
import PageNotFound from "@/components/PageNotFound"
import { Background, Game } from "@/services/models"
import Singleton from "@/services/singleton"
import { getGameAsync } from "@/services/fetching"

interface GamePageProps {
  params: Promise<{ id: string }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params
  if (isNaN(Number(id))) return <PageNotFound/>
  const gameId: number = Number(id)

  // const game: Game | undefined = await Singleton.getGameAsync(gameId)
  const game: Game | undefined = await getGameAsync(gameId)  
  if (!game) return <PageNotFound/>

  return(
    game.backgrounds.map((background: Background) => (
      <Image
        key={background.id}
        className='m-auto shadow-xl mb-4 p-2'
        src={Singleton.getImgPath(background.imgUrl)}
        alt='background'
        width={1280}
        height={720}
        blurDataURL={Singleton.getImgPath(background.imgUrl)}
        placeholder="blur"
      >
      </Image>
    ))
  )
}