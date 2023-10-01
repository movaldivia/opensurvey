import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";
import { checkIfUserIsLoggedIn } from "@/lib/actions";
import { Search } from "@/components/dashboard/search";
import { UserNav } from "@/components/dashboard/user-nav";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { RegisterDialog } from "./registerDialog";
import { signOut } from "next-auth/react";
import Logout from "@/components/logout";
import { RegisterLink } from "@/components/registerLink";
import { LoginLink } from "@/components/loginLink";

export default async function Home() {
  const isUserLogged = await checkIfUserIsLoggedIn();
  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center px-32">
          {/* <TeamSwitcher /> */}
          {/* <div className="text-slate-600 mr-1 cursor-pointer">
            <FormInput></FormInput>
          </div> */}
          <h4 className="font-bold tracking-tight cursor-pointer">
            OpenSurvey
          </h4>
          {/* <MainNav className="mx-6" /> */}
          <div className="ml-auto flex items-center space-x-6 text-sm font-medium">
            {/* <Search />
            <UserNav /> */}
            {!isUserLogged && <LoginLink />}
            {!isUserLogged && <RegisterLink />}
            {isUserLogged && <Logout />}

            <div className="flex items-center">
              <span className="text-slate-700 text-sm cursor-pointer mr-2">
                Give us a star
              </span>
              <Github
                className="cursor-pointer"
                color="#000000"
                strokeWidth={1.75}
                absoluteStrokeWidth
                size={18}
                fill="true"
              />
            </div>
          </div>
        </div>
      </div>
      <section className="mt-12 px-32">
        <div className="">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            The open source alternative
          </h1>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            To Google Forms.
          </h1>
        </div>
        <div className="mt-4">
          <div className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Publish your form in less than 5 minutes.
          </div>
        </div>
        <div className="mt-4 flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
          {isUserLogged ? (
            <Link href={"/forms"}>
              <Button>Create form</Button>
            </Link>
          ) : (
            <RegisterDialog></RegisterDialog>
          )}

          <Button variant="secondary">GitHub</Button>
        </div>
      </section>
      {/* <div className="px-32 mt-8">
        <div className="mb-4 flex items-center">
          <div className="font-bold flex items-center pr-8  cursor-pointer">
            Dashboard
          </div>
          <div className="flex items-center px-8 font-medium text-muted-foreground cursor-pointer">
            Editor
          </div>
          <div className="flex items-center px-8 font-medium text-muted-foreground cursor-pointer">
            Responses
          </div>
        </div>
      </div> */}
    </div>
  );
}
