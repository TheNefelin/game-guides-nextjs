'use client'
import { postGuideCheck } from "@/services/fetching"
import { GuidesUser } from "@/services/models"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface TimelineGuideProps {
  guidesUser: GuidesUser
}

export default function TimelineGuideCheck({guidesUser}: TimelineGuideProps) {
  const auth = useSession()
  const idUser = auth.data?.user?.apiData?.id    
  const [isCheck, setIsCheck] = useState(guidesUser.isCheck)

  const handleClick = async () => {
    setIsCheck(isCheck => !isCheck)

    guidesUser.isCheck = !isCheck;

    if (guidesUser.id_User == idUser){
      await postGuideCheck(guidesUser)
    }
  }

  useEffect(() => {
    const el = document.querySelector(`#G-${guidesUser.id_Guide}`)

    if (isCheck) {
      el?.classList.add("bg-success", "text-success-content")
    } else {
      el?.classList.remove("bg-success", "text-success-content")
    }
  }, [guidesUser.id_Guide, isCheck]);
  
  return (
    <div className="form-control">
      <label className="cursor-pointer flex items-center">
        <input onChange={handleClick} checked={isCheck} type="checkbox" className="checkbox checkbox-accent" />
        <label className='label'>Capítulo Completado</label>
      </label>
    </div>
  )
}