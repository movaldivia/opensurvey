"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { createForm } from "@/lib/actions";
import { useRouter } from "next/navigation";

const FormSchema = z.object({});

export default function InputForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit() {
    const formData = await createForm();
    if ("id" in formData) {
      router.push(`forms/${formData.id}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <Button type="submit">Create new form</Button>
      </form>
    </Form>
  );
}
