"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { revalidatePath } from "next/cache";

import { updateQuestionFromUser } from "@/lib/actions";

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

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 characters.",
  }),
  questions: z
    .array(
      z.object({
        text: z.string().min(1, { message: "Can't left empty question" }),
        placeholder: z.string(),
      })
    )
    .optional(),
});

export default function QuestionForm({
  formId,
  questions,
  title,
  createQuestion,
}: {
  formId: string;
  questions: any;
  title: string;
  createQuestion: any;
}) {
  console.log({ formId });
  console.log({ questions });
  type FormSchema = z.infer<typeof formSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<FormSchema> = {
    questions,
    title,
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(data: FormSchema) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const firstName = useWatch({
    control: form.control,
    // name: "firstName", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    // defaultValue: "default", // default value before the render
  });

  console.log({ firstName });

  const debounced = useDebouncedCallback(
    // function
    (questionId, placeholder, text) => {
      updateQuestionFromUser(formId, questionId, placeholder, text);
      console.log(questionId, placeholder, text);
    },
    // delay in ms
    1000
  );

  const { fields, append } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  return (
    <div className="mx-48 my-24">
      <Input
        placeholder="Type form title"
        className="border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      />
      <div className="mt-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={async () => {
            await createQuestion(formId);
          }}
        >
          Add Question
        </Button>
      </div>

      <div className="mt-12">
        {questions.map((element) => {
          return (
            <div key={element.id} className="mb-5">
              <Input
                defaultValue={element.text}
                key={element.id + "2"}
                placeholder="Type a question"
                className="border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0"
                onChange={(e) => debounced(element.id, null, e.target.value)}
              />
              <Input
                defaultValue={element.placeholder}
                placeholder="Type a placeholder for the response"
                key={element.id + "1"}
                className="leading-7 [&:not(:first-child)]:mt-0 text-muted-foreground "
                onChange={(e) => debounced(element.id, e.target.value, null)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
