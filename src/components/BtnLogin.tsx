import Image from "next/image";

export default function BtnLogin() {
  return (
    <button className="btn p-1"
      //onClick={ async () => await signIn().then(() => router.push("/")) }
      // onClick={login}
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