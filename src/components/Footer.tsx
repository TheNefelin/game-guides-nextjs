import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content p-4 mt-4 grid gap-4 bottom-0">
      <nav className="flex justify-center gap-4">
        <a href="https://www.youtube.com/@TheNefelin" target="_blank">
          <Image
            className="m-0 p-0 object-contain"
            src="/youtube.svg"
            alt="YouTube"
            width={40}
            height={40}
            priority={true}
          ></Image>
        </a>
        <a href="https://github.com/TheNefelin" target="_blank">
          <Image
            className="m-0 p-0 object-contain"
            src="/github.svg"
            alt="GitHub"
            width={40}
            height={40}
            priority={true}
          ></Image>
        </a>
        <a href="https://www.twitch.tv/TheNefelin" target="_blank">
          <Image
            className="m-0 p-0 object-contain"
            src="/twitch.svg"
            alt="Twitch"
            width={40}
            height={40}
            priority={true}
          ></Image>
        </a>
      </nav>
      <p className="text-center">Copyright © {new Date().getFullYear()} - All right reserved</p>
  </footer>
  )
}