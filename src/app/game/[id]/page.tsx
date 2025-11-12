import Image from "next/image"
import PageNotFound from "@/components/PageNotFound"
import { BackgroundImg, Game } from "@/services/models"
import { getGamesAsync } from "@/services/fetching"
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
  const apiResult = await getGamesAsync(session?.user?.apiData?.user_Id)
  const game: Game | undefined = apiResult.data?.find(e => e.game_Id === gameId)
  if (!game) return <PageNotFound/>

  return(
    game.backgroundImgs.map(async(backgroundImg: BackgroundImg) => (
      <Image
        key={backgroundImg.backgroundImg_Id}
        className='m-auto shadow-xl mb-4 p-2'
        src={`/api/getImage?fileName=${backgroundImg.imgUrl}`}
        alt='background'
        width={1280}
        height={720}
      >
      </Image>
    ))
  )
}