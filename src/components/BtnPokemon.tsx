'use client'
import Image from "next/image"
import { useState } from "react"

export default function BtnPokemon() {
  const [menu, setMenu] = useState(true)

  const handleClick = async () => {
    const sideBar = document.querySelector("#id_sidebar")
    setMenu(!menu)

    if (menu){
      sideBar?.classList.remove("hidden")
    } else {
      sideBar?.classList.add("hidden")
    }
    console.log(sideBar)
  }

  return (
    <button onClick={ handleClick } className='bg-base-100/10 rounded-full backdrop-blur-sm fixed z-10 flex justify-center hover:scale-110 duration-300'>
      <Image
        className="m-0 p-0 object-contain"
        src="/mewtwo.png"
        alt="Pokemon Button"
        width={60}
        height={60}
        priority={true}
      ></Image>
    </button>
  )
}