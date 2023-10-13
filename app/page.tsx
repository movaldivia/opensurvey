import { Button } from "@/components/ui/button";
import Link from "next/link";
import { checkIfUserIsLoggedIn } from "@/lib/actions/actions";
import { RegisterDialog } from "./registerDialog";
import { GitHubLogoIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import Image from "next/image";

export default async function Home() {
  const isUserLogged = await checkIfUserIsLoggedIn();
  return (
    <div>
      <SiteHeader isUserLogged={isUserLogged} />
      <section className="px-4 mt-10 md:mt-20 md:px-32">
        <div className="">
          <div className="flex justify-center">
            <div>
              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-center">
                The open source alternative
              </h1>
              <h1 className="md:mt-2 text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-center">
                To Google Forms.
              </h1>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <div className="max-w-[600px] font-light text-xl text-muted-foreground sm:text-xl text-center">
              Simple form builder. Publish your form in less than 5 minutes.
              Accessible. Customizable. Open Source.
            </div>
          </div>
          <div className="mt-8">
            <div className="flex justify-center space-x-3">
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
          </div>
        </div>
      </section>
      <section className="mt-14 mb-8">
        <div className="flex justify-center">
          <Image
            alt="hero image form"
            height={1000}
            width={1000}
            src={"/heroimage.png"}
          />
        </div>
      </section>
    </div>
  );
}
