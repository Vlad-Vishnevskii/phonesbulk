import { LeftMenu } from "@/components/LeftMenu/LeftMenu";
import Logo from "@/components/Logo/logo";
import { MenuShop } from "@/components/MenuBurger/MenuShop";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="navbar hidden md:flex">
        <Logo />
        <MenuShop />
      </nav>

      <main className="flex justify-between">
        <div className="min-h-screen w-[300px] rounded-r-[10px] bg-base_green md:hidden">
          <LeftMenu />
        </div>
        <div className="w-full">{children}</div>
      </main>
    </>
  );
}
