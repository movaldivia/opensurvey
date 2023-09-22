"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { revalidatePath } from "next/cache";
import { Plus, Trash2 } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { updateQuestionFromUser, updateFormFromUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  deleteQuestion,
  tooglePublishFormFromUser,
  form,
}: {
  formId: string;
  questions: any;
  title: string;
  createQuestion: any;
  deleteQuestion: any;
  tooglePublishFormFromUser: any;
  form: any;
}) {
  type FormSchema = z.infer<typeof formSchema>;
  const { toast } = useToast();
  const router = useRouter();

  // This can come from your database or API.
  const defaultValues: Partial<FormSchema> = {
    questions,
    title,
  };

  // const form = useForm<FormSchema>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues,
  // });

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

  return (
    <div className="mx-8 my-6 mt-16 sm:mx-48 sm:my-24">
      <div className="my-10">
        <Link href={`/forms`}>{"<-- Back to my forms"}</Link>
      </div>
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
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2 ml-8"
          onClick={() => {
            router.push(`/forms/preview/${formId}`);
          }}
        >
          Preview
        </Button>
        <Button
          type="button"
          size="sm"
          className="mt-2 ml-2"
          onClick={async () => {
            await tooglePublishFormFromUser(formId);
          }}
        >
          {form.published ? `Unpublish` : "Publish"}
        </Button>
        {form.published ? (
          <div>
            <Button
              type="button"
              size="sm"
              className="mt-8"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `http://localhost:3000/forms/viewform/${formId}`
                );
                console.log("xd");
                toast({
                  title: "Link successfully copied",
                });
                // toast({
                //   description: "Your message has been sent.",
                // });
                console.log("xd2");
              }}
            >
              Copy Link
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="mt-8 ml-2"
              onClick={() => {
                router.push(`/forms/viewform/${formId}`);
              }}
            >
              Go to form
            </Button>
          </div>
        ) : null}
      </div>

      <div className="mt-12">
        {questions.map((element) => {
          return (
            <div key={element.id} className="mb-5 group relative">
              <Input
                defaultValue={element.text}
                key={element.id + "2"}
                placeholder="Type a question"
                className="sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0"
                onChange={(e) => debounced(element.id, null, e.target.value)}
              />
              <Input
                defaultValue={element.placeholder}
                placeholder="Type a placeholder for the response"
                key={element.id + "1"}
                className="sm:w-1/2 leading-7 [&:not(:first-child)]:mt-0 text-muted-foreground "
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
                    <Trash2
                      className=" mt-1 text-gray-700 "
                      onClick={async () => {
                        await deleteQuestion(formId, element.id);
                      }}
                    />
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
