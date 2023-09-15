import TypographyH1 from "@/components/typography/typography-h1";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { MainNav } from "@/components/dashboard/main-nav";
import { Search } from "@/components/dashboard/search";
import { UserNav } from "@/components/dashboard/user-nav";

export default function Home() {
  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center px-32">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <section className="mt-24 px-8">
        <div className="ml-24">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Build beatiful forms
          </h1>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            And own your data.
          </h1>
        </div>
        <div className="mt-8 ml-24">
          <div className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Publish your form in less than 5 minutes.
          </div>
        </div>
      </section>
    </div>
  );
}
