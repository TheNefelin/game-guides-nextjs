'use client'
import { useEffect, useState } from "react"
import { GuideUser } from "@/services/models"

interface TimelineGuideProps {
  guideUser: GuideUser
}

export default function TimelineGuideCheck({guideUser}: TimelineGuideProps) {
  const [isCheck, setIsCheck] = useState(false)

  useEffect(() => {
    setIsCheck(localStorage.getItem(`guide-check-${guideUser.guide_Id}`) === "true")
  }, [guideUser.guide_Id])

  const handleClick = () => {
    setIsCheck(prev => {
      const next = !prev
      localStorage.setItem(`guide-check-${guideUser.guide_Id}`, String(next))
      return next
    })
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
