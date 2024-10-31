import { CartLoginComponent } from "../CartLoginComponent/CartLoginComponent";
import Logo from "../Logo/logo";
import { MenuBurger } from "../MenuBurger/MenuBurger";
import NavLinks from "../NavLinks/NavLinks";

export const Navbar = ({ linksall }: any) => {
  return (
    <nav className="navbar">
      <Logo />
      <NavLinks links={linksall} />
      <div className="flex items-center gap-4 ">
        <CartLoginComponent />
        <MenuBurger links={linksall} />
      </div>
    </nav>
  );
};
