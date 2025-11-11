import Image from "next/image"
import { AdventureImg } from "@/services/models";

interface AdventureImgProps {
  adventureImgs: AdventureImg[],
}

export default function TimelineAdventureImg({ adventureImgs }: AdventureImgProps) {
  return (
    adventureImgs.length > 0 &&
    <div className='my-4 flex flex-wrap gap-4 justify-center'>
      {adventureImgs.map((adventureImg: AdventureImg) => (
        <Image
          key={adventureImg.adventureImg_Id}
          className='shadow-md rounded'
          src={`/api/getImage?fileName=${adventureImg.imgUrl}`}
          alt="Imagen de Guia"
          width={1536}
          height={1080}
          // blurDataURL={getImgPath(adventureImg.imgUrl)}
          // placeholder="blur"
          style={{ width: 'auto', height: 'auto' }}
        ></Image>
      ))}
    </div>
  )
}