import Image from "next/image"
import { AdventureImg } from "@/services/models";

interface AdventureImgProps {
  adventuresImg: AdventureImg[],
}

export default function TimelineAdventureImg({ adventuresImg }: AdventureImgProps) {
  return (
    adventuresImg.length > 0 &&
    <div className='my-4 flex flex-wrap gap-4 justify-center'>
      {adventuresImg.map((adventureImg: AdventureImg) => (
        <Image
          key={adventureImg.id}
          className='shadow-md rounded'
          src={`/api/getImage?fileName=${adventureImg.imgUrl}`}
          alt="Imagen de Guia"
          width={608}
          height={427}
          // blurDataURL={getImgPath(adventureImg.imgUrl)}
          // placeholder="blur"
          style={{ width: 'auto', height: 'auto' }}
        ></Image>
      ))}
    </div>
  )
}