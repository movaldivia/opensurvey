"use client";

import * as React from "react";
import Link from "next/link";
import Logout from "@/components/logout";
import { RegisterLink } from "@/components/registerLink";
import { LoginLink } from "@/components/loginLink";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function MainNav({ isUserLogged }: { isUserLogged: boolean }) {
  return (
    <div className="mr-4 hidden md:block">
      <div className="border-b">
        <div className="flex h-16 items-center px-48">
          <div className="flex items-center cursor-pointer px-1">
            <div className="cursor-pointer flex items-center">
              <Image width={30} height={30} alt="logo" src={"/logo.png"} />
              <h4 className="font-semibold tracking-tight cursor-pointer ml-1">
                Opensurvey
              </h4>
            </div>

            <div className="ml-8 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer">
              <Link href={"https://github.com/movaldivia/opensurvey"}>
                Documentation
              </Link>
            </div>
            <div className="ml-8 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer">
              <Link
                href={
                  "https://opensurvey.vercel.app/forms/viewform/f7cad0e9-89b3-4599-b02d-15c695fd546e"
                }
              >
                Demo
              </Link>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-6 text-sm font-medium">
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
    </div>
  );
}
