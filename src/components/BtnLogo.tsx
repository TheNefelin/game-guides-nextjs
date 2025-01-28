import Link from "next/link";
import Image from "next/image";

export default function BtnLogo() {
  return (
    <Link href={"/"} className="btn bg-transparent border-none shadow-none hover:bg-transparent px-2 normal-case text-xl ml-16">
      <Image
        src="/logo.png"
        alt='Logo'
        width={60}
        height={40}
        priority={true}
      ></Image>
      Guias
    </Link>
  )
}