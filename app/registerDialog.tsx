"use client";

import { useState, ChangeEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterDialog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ name: "", email: "", password: "" });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      const resSignIn = await signIn("credentials", {
        // redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl: "/forms",
      });

      if (!resSignIn?.error) {
        router.push("/");
      } else {
        setError("invalid email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  //   const login = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //       setLoading(true);
  //       setFormValues({ email: "", password: "" });

  //       const res = await signIn("credentials", {
  //         redirect: false,
  //         email: formValues.email,
  //         password: formValues.password,
  //         callbackUrl,
  //       });

  //       setLoading(false);

  //       if (!res?.error) {
  //         router.push(callbackUrl);
  //       } else {
  //         setError("invalid email or password");
  //       }
  //     } catch (error: any) {
  //       setLoading(false);
  //       setError(error);
  //     }
  //   };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

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
        <div>
          <form onSubmit={onSubmit} className="py-2">
            {error && (
              <p className="text-center bg-red-300 py-4 mb-6 rounded">
                {error}
              </p>
            )}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                name="name"
                placeholder="Harry"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2 mt-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="h@example.com"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2 mt-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <DialogFooter>
              <Button className="mt-5" type="submit">
                Register
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
