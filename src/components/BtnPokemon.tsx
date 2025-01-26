import Image from "next/image"

export default function BtnPokemon() {
  return (
    <button className='bg-base-100/10 rounded-full backdrop-blur-sm fixed z-10 flex justify-center hover:scale-110 duration-300'>
      <Image
        className="m-0 p-0 object-contain"
        rel="preload"
        src="/mewtwo.png"
        alt="Pokemon Button"
        width={80}
        height={80}
        priority={true}
      ></Image>
    </button>
  )
}