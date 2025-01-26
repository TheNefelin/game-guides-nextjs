import Image from "next/image"
import Link from "next/link"
import Singleton from "@/services/singleton"
import { Game } from "@/services/models"

interface SideBarProps {
  games: Game[]
}

export default async function SideBar({ games }: SideBarProps) {
  return (
    <ul id="id_sidebar" className="bg-base-100 h-full min-w-24 max-w-24 menu menu-xs pr-0">
      {games.map((game: Game) => (
        game.isActive && 
        <li key={game.id} className="mb-2">
          <Link href={`/game/${game.id}`}>
            <div className="avatar grid place-items-center">
              <div className="rounded-xl">
                <Image
                  className="shadow-md"
                  rel="preload"
                  src={Singleton.getImgPath(game.imgUrl)}
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
  );
}
