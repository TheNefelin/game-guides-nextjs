import Image from "next/image"
import PageNotFound from "@/components/PageNotFound"
import Singleton from "@/services/singleton"
import { Background, Game } from "@/services/models"

interface GamePageProps {
  params: Promise<{ id: string }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params
  if (isNaN(Number(id))) return <PageNotFound/>
  const gameId: number = Number(id)

  const apiResult = await Singleton.getApiResultAsync()
  const game: Game | undefined = apiResult.data.find(e => e.id === gameId);
  if (!game) return <PageNotFound/>

  return(
    game.backgrounds.map((background: Background) => (
      <Image
        key={background.id}
        className='m-auto shadow-xl mb-4'
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