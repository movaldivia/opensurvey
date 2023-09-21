"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { revalidatePath } from "next/cache";
import { Plus, Trash2 } from "lucide-react";

import { updateQuestionFromUser, updateFormFromUser } from "@/lib/actions";

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

  const firstName = useWatch({
    control: form.control,
    // name: "firstName", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    // defaultValue: "default", // default value before the render
  });

  const debounced = useDebouncedCallback(
    // function
    (questionId, placeholder, text) => {
      updateQuestionFromUser(formId, questionId, placeholder, text);
    },
    // delay in ms
    500
  );

  const formTitleDebounced = useDebouncedCallback(
    // function
    (formId: string, title: string) => {
      updateFormFromUser(formId, title);
    },
    // delay in ms
    500
  );

  const { fields, append } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  return (
    <div className="mx-48 my-24">
      <Input
        placeholder="Type form title"
        defaultValue={title}
        className="border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        onChange={(e) => formTitleDebounced(formId, e.target.value)}
      />
      <div className="mt-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={async () => {
            await createQuestion(formId, questions.length);
          }}
        >
          Add Question
        </Button>
      </div>

      <div className="mt-12">
        {questions.map((element) => {
          return (
            <div key={element.id} className="mb-5 group relative">
              <Input
                defaultValue={element.text}
                key={element.id + "2"}
                placeholder="Type a question"
                className="w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0"
                onChange={(e) => debounced(element.id, null, e.target.value)}
              />
              <Input
                defaultValue={element.placeholder}
                placeholder="Type a placeholder for the response"
                key={element.id + "1"}
                className="w-1/2 leading-7 [&:not(:first-child)]:mt-0 text-muted-foreground "
                onChange={(e) => debounced(element.id, e.target.value, null)}
              />
              <div className=" absolute top-2 left-0 transform -translate-x-full  hidden group-hover:inline-flex">
                <div className="mr-6">
                  <div className="px-2 hover:cursor-pointer">
                    <Plus
                      className=" text-gray-700"
                      onClick={async () => {
                        await createQuestion(formId, element.order + 1);
                      }}
                    />
                  </div>
                  <div className="px-2 mt-1 hover:cursor-pointer">
                    <Trash2 className=" mt-1 text-gray-700 " />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
