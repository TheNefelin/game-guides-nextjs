import Link from "next/link";
import Image from "next/image";

interface Props {
  id_guia_acordion: string
}

export default function BtnUpGuide(props: Props) {
  return (
    <Link
    href={`#${props.id_guia_acordion}`}
    className="grid justify-end"
    >
      <Image
        src="/arrow.gif"
        alt='Subir'
        height={40}
        width={40}
        unoptimized
      ></Image>
    </Link>
  )
}