import BtnLogin from "./BtnLogin";
import BtnLogo from "./BtnLogo";
import BtnTheme from "./BtnTheme";

export default function NavBar() {
  return (
    <section className="navbar bg-base-300 shadow-lg py-2 flex justify-between">
      <span>
        <BtnLogo/>
        <BtnTheme/>
      </span>
      <BtnLogin/>
    </section>
  )
}