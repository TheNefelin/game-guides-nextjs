"use client"
import { useEffect, useState } from "react"
import { AdventureUser } from "@/services/models"

interface AdventureCheckProps {
  description: string,
  adventuresUser: AdventureUser
}

export default function TimelineAdventureCheck(props : AdventureCheckProps) {
  const {description, adventuresUser} = props
  const [isCheck, setIsCheck] = useState(false)

  useEffect(() => {
    setIsCheck(localStorage.getItem(`adventure-check-${adventuresUser.adventure_Id}`) === "true")
  }, [adventuresUser.adventure_Id])

  const handleClick = () => {
    setIsCheck(prev => {
      const next = !prev
      localStorage.setItem(`adventure-check-${adventuresUser.adventure_Id}`, String(next))
      return next
    })
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
