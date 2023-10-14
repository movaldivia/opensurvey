import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-40 md:py-0 mt-32">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with ❤️ by{" "}
          <a
            href={"https://github.com/movaldivia"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            movaldivia.
          </a>{" "}
          The source code is available on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
