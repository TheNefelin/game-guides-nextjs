import Image from "next/image"
import Fetching from "@/services/fetching"
import { Game } from "@/services/models"
import Link from "next/link"

export default async function SideBar() {
  const fetching = new Fetching()
  const data = await fetching.get_all_games_async()

  if (data.length === 0 ) return <></>

  return (
    <ul id="id_sidebar" className="bg-base-100 h-full menu menu-xs pr-0">
      {data.map((e:Game) => (
        <li key={e.id} className='mb-2'>
          <Link href={`/game/${e.id}`}>
            <div key={e.id} className="avatar grid place-items-center">
              <div className="rounded-xl">
                <Image
                  className='shadow-md'
                  src={`${fetching.imgurl}${e.img}`}
                  width={65}
                  height={65}
                  alt={e.nombre}
                ></Image>
              </div>
              <p>{e.nombre}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}