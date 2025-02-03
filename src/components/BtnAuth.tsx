'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function BtnLogin() {
  const auth = useSession()
  const user = auth.data?.user

  console.log(auth)

  const login = async () => {
    await signIn("google", { callbackUrl: "/" })
  }

  const logout = async () => {
    await signOut({ callbackUrl: "/" })
  }
  
  return (
    user? 
    <button className="btn p-1"
      onClick={logout}
    >
      {user.image && user.name && 
        <Image
          className="rounded-full"
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
        />  
      }
    </button>
    :
    <button className="btn p-1"
      onClick={login}
    >
      <Image
        src="/google.svg"
        alt="Login Google"
        width={40}
        height={40}
      />    
    </button>
  )
}