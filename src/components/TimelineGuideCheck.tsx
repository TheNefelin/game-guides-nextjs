'use client'
import { postGuideCheck } from "@/services/fetching"
import { GuideUser } from "@/services/models"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface TimelineGuideProps {
  guideUser: GuideUser
}

export default function TimelineGuideCheck({guideUser}: TimelineGuideProps) {
  const auth = useSession()
  const user_id = auth.data?.user?.apiData?.user_Id
  const [isCheck, setIsCheck] = useState(guideUser.isCheck)

  const handleClick = async () => {
    setIsCheck(isCheck => !isCheck)
    guideUser.isCheck = !isCheck;

    if (user_id){
      try {
        await postGuideCheck(guideUser);
      } catch (error) {
        console.error("Error al hacer el postAdventureCheck:", error);
      }
    }
  }

  useEffect(() => {
    const el = document.querySelector(`#G-${guideUser.guide_Id}`)

    if (isCheck) {
      el?.classList.add("bg-success", "text-success-content")
    } else {
      el?.classList.remove("bg-success", "text-success-content")
    }
  }, [guideUser.guide_Id, isCheck]);
  
  return (
    <div className="form-control">
      <label className="cursor-pointer flex items-center">
        <input onChange={handleClick} checked={isCheck} type="checkbox" className="checkbox checkbox-accent" />
        <label className='label'>Capítulo Completado</label>
      </label>
    </div>
  )
}