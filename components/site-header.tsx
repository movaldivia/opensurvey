import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader({ isUserLogged }: { isUserLogged: boolean }) {
  return (
    <>
      <MainNav isUserLogged={isUserLogged} />
      <MobileNav isUserLogged={isUserLogged} />
    </>
  );
}
