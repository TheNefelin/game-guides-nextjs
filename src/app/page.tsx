import Image from "next/image";
import BtnUp from "@/components/BtnUp";
import BtnUpGuia from "@/components/BtnUpGuia";

export default function Home() {
  return (
    <main className='card-body bg-base-200'>
      <h1 className="card-title uppercase">Bienbenidos !!! &#129409;</h1>
      <p className="indent-4">Esta página nació porque cada vez que juego Chrono Cross y dejo el juego pendiente por mucho tiempo, ya no recuerdo en qué misión voy.</p>

      <Image
        className="m-auto"
        src="/star_wars.gif"
        alt="Star Wars"
        height={700}
        width={700}
        unoptimized
      >
      </Image>

      <Image
        className="m-auto"
        src="/sin_guia.gif"
        alt="Vintage Game"
        height={700}
        width={700}
        unoptimized
      >
      </Image>

      <BtnUpGuia id_guia_acordion="0"/>
      <BtnUp/>
    </main>
  );
}
