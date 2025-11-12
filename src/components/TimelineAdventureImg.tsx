import Image from "next/image"
import { AdventureImg } from "@/services/models";

interface AdventureImgProps {
  adventureImgs: AdventureImg[],
}

export default function TimelineAdventureImg({ adventureImgs }: AdventureImgProps) {
  return (
    adventureImgs.length > 0 &&
      adventureImgs.map((adventureImg: AdventureImg) => (
        <Image
          key={adventureImg.adventureImg_Id}
          className='m-auto p-2 shadow-md rounded'
          src={`/api/getImage?fileName=${adventureImg.imgUrl}`}
          alt="Imagen de Guia"
          width={1536}
          height={1080}
          style={{ width: 'auto', height: 'auto' }}
        ></Image>
      ))
  )
}