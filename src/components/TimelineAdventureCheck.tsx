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
  const idUser = auth.data?.user?.apiData?.id    
  const [isCheck, setIsCheck] = useState(adventuresUser.isCheck)

  const handleClick = async () => {
    setIsCheck(isCheck => !isCheck)

    adventuresUser.isCheck = !isCheck;

    if (adventuresUser.id_User == idUser){
      await postAdventureCheck(adventuresUser)
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