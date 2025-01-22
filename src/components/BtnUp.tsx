import Link from "next/link";
import Image from "next/image";

export default function BtnUp() {
  return (
    <Link href={"#id_body"} className='bg-base-100/10 rounded-full backdrop-blur-sm fixed z-10 bottom-4 hover:scale-110 duration-300'> 
      <Image
        className="m-0 p-0"
        src="/arrow.gif"
        alt='Subir'
        height={50}
        width={50}
        unoptimized
      ></Image>
    </Link>
  )
}