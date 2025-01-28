import Image from "next/image";

export default async function Home() {
  return (
    <main className='card-body p-4 mx-2 my-4 bg-base-200 shadow-lg'>
      <h1>V 1.19</h1>
      <h1 className="card-title uppercase">Bienbenidos !!! &#129409;</h1>
      <p className="indent-4">Esta página nació porque cada vez que juego Chrono Cross y dejo el juego pendiente por mucho tiempo, ya no recuerdo en qué misión voy.</p>
  
      <Image
        className="m-auto h-auto"
        src="/star_wars.gif"
        alt="Star Wars"
        width={1032}
        height={613}
        priority
        unoptimized
      >
      </Image>

      <Image
        className="m-auto h-auto"
        src="/sin_guia.gif"
        alt="Vintage Game"
        width={1032}
        height={510}
        priority
        unoptimized
      >
      </Image>

    </main>
  );
}
