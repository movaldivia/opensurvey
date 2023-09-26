import TypographyH1 from "@/components/typography/typography-h1";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { MainNav } from "@/components/dashboard/main-nav";
import { Search } from "@/components/dashboard/search";
import { UserNav } from "@/components/dashboard/user-nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormInput, Github } from "lucide-react";
import { Icons } from "@/components/icons";
import { checkIfUserIsLoggedIn } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Register() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Form</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            For full access and a seamless experience on the platform, please
            take a moment to register.
          </DialogDescription>
        </DialogHeader>
        {/* <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div> */}
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div> */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <DialogFooter>
          <Button type="submit">Register</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DemoCreateAccount() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create account</Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home() {
  const isUserLogged = await checkIfUserIsLoggedIn();
  console.log({ isUserLogged });
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
          <div className="ml-auto flex items-center space-x-2">
            {/* <Search />
            <UserNav /> */}

            <span className="text-slate-700 text-sm cursor-pointer">
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
          {/* <Link href={"/register"}> */}
          {/* <Button onClick={}>Create form</Button> */}
          {/* </Link> */}
          {isUserLogged ? (
            <Link href={"/forms"}>
              <Button>Create form</Button>
            </Link>
          ) : (
            <Register></Register>
          )}

          <Button variant="secondary">GitHub</Button>
        </div>
      </section>
      <div className="px-32 mt-8">
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
      </div>
    </div>
  );
}
