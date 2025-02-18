import Image from "next/image"
import PageNotFound from "@/components/PageNotFound"
import { Background, Game } from "@/services/models"
import { getGamesAsync, getImgPath } from "@/services/fetching"
import { getServerSession } from "next-auth"
import { authOptions } from "@/services/authOptions"

interface GamePageProps {
  params: Promise<{ id: string }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params
  if (isNaN(Number(id))) return <PageNotFound/>
  const gameId: number = Number(id)

  const session = await getServerSession(authOptions)
  const apiResult = await getGamesAsync(session?.user?.apiData?.idUser)
  const game: Game | undefined = apiResult.data?.find(e => e.id === gameId)
  if (!game) return <PageNotFound/>

  return(
    game.backgrounds.map(async(background: Background) => (
      <Image
        key={background.id}
        className='m-auto shadow-xl mb-4 p-2'
        src={await getImgPath(background.imgUrl)}
        alt='background'
        width={1280}
        height={720}
        blurDataURL={await getImgPath(background.imgUrl)}
        placeholder="blur"
      >
      </Image>
    ))
  )
}