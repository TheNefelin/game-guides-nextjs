import Image from "next/image"
import Link from "next/link"
import { Game } from "@/services/models"

interface SideBarProps {
  games: Game[]
}

export default async function SideBar({ games }: SideBarProps) {
  return (
    <ul id="id_sidebar" className="bg-base-100 h-full min-w-24 max-w-24 p-0 my-4 ml-2 menu menu-xs">
      {games.map((game: Game) => (
        game.isEnabled && 
        <li key={game.game_Id} className="mb-2">
          <Link href={`/game/${game.game_Id}`}>
            <div className="avatar grid place-items-center">
              <div className="rounded-xl">
                <Image
                  className="shadow-md"
                  rel="preload"
                  src={`/api/getImage?fileName=${game.imgUrl}`}
                  width={65}
                  height={65}
                  alt={game.name}
                />
              </div>
              <p>{game.name}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
