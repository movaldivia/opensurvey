"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";

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

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  questions: z
    .array(
      z.object({
        label: z.string().min(1, { message: "Can't left empty question" }),
        input: z.string(),
      })
    )
    .optional(),
});

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("xd");
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const { fields, append } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  return (
    <div className="mx-48 my-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/3 space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="!space-y-0">
                <FormControl>
                  <Input
                    placeholder="Type form title"
                    className="border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() =>
              append({
                label: "",
                input: "",
              })
            }
          >
            Add Question
          </Button>
          {fields.map((field, index) => (
            <div key={field.id}>
              <FormField
                control={form.control}
                key={field.id}
                name={`questions.${index}.label`}
                render={({ field }) => (
                  <FormItem className="!space-y-0">
                    <FormControl>
                      <Input
                        placeholder="Type a question"
                        className="border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                key={field.id}
                name={`questions.${index}.input`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Type placeholder text"
                        className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
