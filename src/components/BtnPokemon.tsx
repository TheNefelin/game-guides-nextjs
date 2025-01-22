import Image from "next/image"

export default function BtnPokemon() {
  return (
    <button className='bg-base-100/10 rounded-full backdrop-blur-sm fixed z-10 flex justify-center w-20'>
      <Image
        className="m-0 p-0"
        src="/mewtwo.png"
        alt="Pokemon Button"
        width={60}
        height={60}
        priority={true}
      ></Image>
    </button>
  )
}