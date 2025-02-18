"use client"
import { postAdventureCheck } from "@/services/fetching"
import { AdventuresUser } from "@/services/models"
import { useSession } from "next-auth/react"
import { useState } from "react"

interface AdventureCheckProps {
  description: string,
  adventuresUser: AdventuresUser
}

export default function TimelineAdventureCheck(props : AdventureCheckProps) {
  const {description, adventuresUser} = props

  const auth = useSession()
  const idUser = auth.data?.user?.apiData?.idUser
  const [isCheck, setIsCheck] = useState(adventuresUser.isCheck)

  const handleClick = async () => {
    setIsCheck(isCheck => !isCheck)

    adventuresUser.isCheck = !isCheck;
    
    if (adventuresUser.id_User == idUser){
      try {
        await postAdventureCheck(adventuresUser);
      } catch (error) {
        console.error("Error al hacer el postAdventureCheck:", error);
      }
    }
  }

  return (
    <div className='bg-error-content text-white p-2'>
      <div className="form-control">
        <label className="cursor-pointer flex">
          <input onChange={handleClick} checked={isCheck} type="checkbox" className="checkbox checkbox-accent mt-2" />
          <label className='label'>{ description }</label>
        </label>
      </div> 
    </div>
  )
}