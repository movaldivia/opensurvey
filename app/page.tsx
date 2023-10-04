import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";
import { checkIfUserIsLoggedIn } from "@/lib/actions/actions";
import { Search } from "@/components/dashboard/search";
import { UserNav } from "@/components/dashboard/user-nav";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { RegisterDialog } from "./registerDialog";
import { signOut } from "next-auth/react";
import Logout from "@/components/logout";
import { RegisterLink } from "@/components/registerLink";
import { LoginLink } from "@/components/loginLink";
import { GitHubLogoIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const isUserLogged = await checkIfUserIsLoggedIn();
  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center px-32">
          <div className="flex items-baseline cursor-pointer px-1">
            {/* <span className="">
              <ChatBubbleIcon
                color="#000000"
                className="h-4 w-4 cursor-pointer"
              />
            </span> */}
            <h4 className="font-semibold tracking-tight cursor-pointer ml-1">
              Opensurvey
            </h4>
            <div className="ml-8 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer">
              <Link href={"https://github.com/movaldivia/opensurvey"}>
                Documentation
              </Link>
            </div>
          </div>

          {/* <MainNav className="mx-6" /> */}
          <div className="ml-auto flex items-center space-x-6 text-sm font-medium">
            {/* <Search />
            <UserNav /> */}
            {!isUserLogged && <LoginLink />}
            {!isUserLogged && <RegisterLink />}
            {isUserLogged && <Logout />}

            <div className="flex items-center">
              <Link href={"https://github.com/movaldivia/opensurvey"}>
                <Button variant="outline">
                  <GitHubLogoIcon className="h-4 w-4" />
                  <span className="ml-2 text-xs">STAR US</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-20 px-32">
        <div className="">
          <div>
            <Link href={"https://github.com/movaldivia/opensurvey"}>
              <Badge className="py-1 px-2 cursor-pointer" variant="secondary">
                <div className="text-sm font-normal flex items-center">
                  <div>🎉</div>
                  <div className="text-slate-300 px-2">|</div>
                  <div>We are in Open Beta.</div>
                  <div>
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </Badge>
            </Link>
          </div>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            The open source alternative
          </h1>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            To Google Forms.
          </h1>
        </div>
        <div className="mt-4">
          <div className="max-w-[600px] font-light text-xl text-muted-foreground sm:text-xl">
            Simple form builder. Publish your form in less than 5 minutes.
            Accessible. Customizable. Open Source.
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
          <Link href={"https://github.com/movaldivia/opensurvey"}>
            <Button variant="outline">
              <GitHubLogoIcon className="h-4 w-4" />
              <span className="ml-2">GitHub</span>
            </Button>
          </Link>
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
