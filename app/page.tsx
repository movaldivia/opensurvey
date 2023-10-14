import { Button } from "@/components/ui/button";
import Link from "next/link";
import { checkIfUserIsLoggedIn } from "@/lib/actions/actions";
import { RegisterDialog } from "./registerDialog";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
      <section className="px-8 md:px-48 mt-20 mb-20">
        <div className="md:px-48">
          <div>
            <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              It&apos;s time to move on from Google Forms.
            </h3>
            <p className="leading-8 text-lg [&:not(:first-child)]:mt-6 text-slate-500 font-normal">
              Google Forms has been widely used for many years. We believe
              it&apos;s time for an alternative, which is why we created
              Opensurvey.
            </p>
          </div>
          <div className="mt-12">
            <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
              How does Google Forms manage our data?
            </h3>
            <p className="leading-8 text-lg [&:not(:first-child)]:mt-6 text-slate-500 font-normal">
              They can make any claim or promise, but without access to the
              codebase, how can we truly verify? That&apos;s why we launched
              OpenSurvey as an open-source alternative.
            </p>
          </div>
          <div className="mt-12">
            <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
              Tired of Google Forms?
            </h3>
            <p className="leading-8 text-lg [&:not(:first-child)]:mt-6 text-slate-500 font-normal">
              You&apos;re not alone! Approximately 80% of the forms I&apos;ve
              filled out have been Google Forms. That&apos;s why we decided to
              create an open-source alternative with fresh designs for both us
              and our users. We&apos;re committed to regularly adding new
              features, prioritizing the ones most requested by our community.
            </p>
          </div>
          <div className="mt-12">
            <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
              Do you want to own your form data?
            </h3>
            <p className="leading-8 text-lg [&:not(:first-child)]:mt-6 text-slate-500 font-normal">
              When you use Google Forms, your data is stored on their servers.
              But what if you want to keep that data on your local machine? With
              OpenSurvey, you can host your own surveys and have complete
              control over your data.
            </p>
          </div>
          <div className="mt-12">
            <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
              Don&apos;t have money?
            </h3>
            <p className="leading-8 text-lg [&:not(:first-child)]:mt-6 text-slate-500 font-normal">
              One of the most compelling reasons people use Google Forms is
              because it&apos;s free. With OpenSurvey, you can host it on your
              own using Vercel (Next.js) and Supabase (PostgreSQL) for free,
              just like we did.
            </p>
          </div>
          <div className="mt-12">
            <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
              OpenSurvey currently offers the following features:
            </h3>
            <p className="leading-4 text-lg [&:not(:first-child)]:mt-6 text-slate-500 font-normal">
              1. Quick form creation in under 1 minute.
            </p>
            <p className="leading-4 text-lg [&:not(:first-child)]:mt-6 text-slate-500 font-normal">
              2. Easy publication and viewing of responses with charts.
            </p>
            <p className="leading-4 text-lg [&:not(:first-child)]:mt-6 text-slate-500 font-normal">
              3. Data export to Excel files.
            </p>
            <p className="leading-4 text-lg [&:not(:first-child)]:mt-6 text-slate-500 font-normal">
              4. Support for short answer, multiple-choice, and single-choice
              questions.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
