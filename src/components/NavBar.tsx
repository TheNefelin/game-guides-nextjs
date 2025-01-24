import BtnLogo from "./BtnLogo";
import BtnTheme from "./BtnTheme";
import Loading from "./Loading";

export default function NavBar() {
  return (
    <section className="navbar bg-base-300 shadow-lg py-4">
      <BtnLogo/>
      <BtnTheme/>
      <Loading/>
    </section>
  )
}