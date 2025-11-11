import Image from "next/image";

export default async function Home() {
  return (
    <main className='card-body p-4 mx-2 my-4 bg-base-200 shadow-lg'>
      <h1 className="card-title uppercase">bienvenidos !!! &#129409;</h1>
      <p className="indent-4">Esta página nació después de muchas veces abrir Chrono Cross, ver mi partida guardada… y no tener ni idea de qué estaba haciendo. Así que decidí crear un espacio para registrar mis aventuras y no volver a perder el hilo de la historia (otra vez 😅).</p>
  
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
