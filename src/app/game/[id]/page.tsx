import Image from "next/image"
import PageNotFound from "@/components/PageNotFound"
import { getApiResultAsync, getImgPath } from "@/services/fetching"
import { Background, Game } from "@/services/models"
// import Singleton from "@/services/singleton"

interface GamePageProps {
  params: Promise<{ id: string }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params
  if (isNaN(Number(id))) return <PageNotFound/>
  const gameId: number = Number(id)

  // const apiResult = await Singleton.getApiResultAsync()
  const apiResult = await getApiResultAsync()
  const game: Game | undefined = apiResult.data.find(e => e.id === gameId);
  if (!game) return <PageNotFound/>

  return(
    game &&
    game.backgrounds.map((background: Background) => (
      <Image
        key={background.id}
        className='m-auto shadow-xl mb-4 p-2'
        src={getImgPath(background.imgUrl)}
        alt='background'
        width={1280}
        height={720}
        blurDataURL={getImgPath(background.imgUrl)}
        placeholder="blur"
      >
      </Image>
    ))
  )
}