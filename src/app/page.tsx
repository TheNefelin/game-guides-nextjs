import Image from "next/image";
import BtnUpGuide from "@/components/BtnUpGuide";

export default function Home() {
  return (
    <main className='card-body bg-base-200'>
      <h1 className="card-title uppercase">Bienbenidos !!! &#129409;</h1>
      <p className="indent-4">Esta página nació porque cada vez que juego Chrono Cross y dejo el juego pendiente por mucho tiempo, ya no recuerdo en qué misión voy.</p>

      <Image
        className="m-auto"
        src="/star_wars.gif"
        alt="Star Wars"
        width={1032}
        height={613}
        priority
        unoptimized
      >
      </Image>

      <Image
        className="m-auto"
        src="/sin_guia.gif"
        alt="Vintage Game"
        width={1032}
        height={510}
        priority
        unoptimized
      >
      </Image>

      <BtnUpGuide id_guia_acordion="0"/>
    </main>
  );
}
