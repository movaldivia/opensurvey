import { Button } from "@/components/ui/button";
import Link from "next/link";
import { checkIfUserIsLoggedIn } from "@/lib/actions/actions";
import { RegisterDialog } from "./registerDialog";
import { GitHubLogoIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";

export default async function Home() {
  const isUserLogged = await checkIfUserIsLoggedIn();
  return (
    <div>
      <SiteHeader isUserLogged={isUserLogged} />
      <section className="px-4 mt-10 md:mt-20 md:px-32">
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
    </div>
  );
}
