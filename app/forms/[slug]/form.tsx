"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { revalidatePath } from "next/cache";
import { Plus, Trash2 } from "lucide-react";

import { useRef, useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";
import {
  updateQuestionFromUser,
  updateFormFromUser,
  updateOptionText,
} from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { MoveLeft } from "lucide-react";

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
  createOptionQuestion,
  updateOptionText,
  createOption,
}: {
  formId: string;
  questions: any;
  title: string;
  createQuestion: any;
  deleteQuestion: any;
  tooglePublishFormFromUser: any;
  form: any;
  createOptionQuestion: any;
  updateOptionText: any;
  createOption: any;
}) {
  type FormSchema = z.infer<typeof formSchema>;
  const { toast } = useToast();
  const router = useRouter();

  console.log({ questions });

  console.log({ form });

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
    <div className="mx-auto	my-6 mt-16 sm:my-24 w-full max-w-xs sm:max-w-4xl">
      <div className="">
        <div className="my-10">
          <Link href={`/forms`}>
            <div className="flex items-center">
              {
                <MoveLeft
                  className="mr-2"
                  color="#000000"
                  strokeWidth={1.75}
                  absoluteStrokeWidth
                  size={18}
                />
              }
              {"Back to my forms"}
            </div>
          </Link>
        </div>
        <Input
          placeholder="Type form title"
          defaultValue={title}
          className="border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0"
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
            className="mt-2"
            onClick={async () => {
              await createOptionQuestion(formId, questions.length);
            }}
          >
            Add Option Question
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

                  toast({
                    title: "Link successfully copied",
                  });
                  // toast({
                  //   description: "Your message has been sent.",
                  // });
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
            if (element.type === "SHORT_RESPONSE") {
              return (
                <div key={element.id} className="mb-5 group relative">
                  <Input
                    defaultValue={element.text}
                    key={element.id + "2"}
                    placeholder="Type a question"
                    className="sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0"
                    onChange={(e) =>
                      debounced(element.id, null, e.target.value)
                    }
                  />
                  <Input
                    defaultValue={element.placeholder}
                    placeholder="Type a placeholder for the response (optional)"
                    key={element.id + "1"}
                    className="sm:w-1/2 leading-7 [&:not(:first-child)]:mt-0 text-muted-foreground "
                    onChange={(e) =>
                      debounced(element.id, e.target.value, null)
                    }
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
            }
            if (element.type === "MANY_OPTIONS") {
              return (
                <div key={element.id} className="mb-5">
                  <Input
                    defaultValue={element.text}
                    key={element.id + "2"}
                    placeholder="Type a question"
                    className="mb-1 sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0"
                    onChange={(e) =>
                      debounced(element.id, null, e.target.value)
                    }
                  />
                  <QuestionRadioGroup
                    options={element.options}
                    formId={formId}
                    questionId={element.id}
                    createOption={createOption}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

const QuestionRadioGroup = ({ options, formId, questionId, createOption }) => {
  // optionText: string,
  // optionId: string,
  // questionId: string,
  // formId: string
  console.log({ options, len: options.length });

  const debounced = useDebouncedCallback(
    // function
    (optionText, optionId) => {
      updateOptionText(optionText, optionId, questionId, formId);
    },
    // delay in ms
    500
  );

  const lastInputRef = useRef(null);

  // Monitor changes in the options array
  useEffect(() => {
    // After adding a new option, set the focus to the last input
    lastInputRef.current && lastInputRef.current.focus();
  }, [options]);

  // questionId: string,
  // formId: string,
  // order: number

  const debouncedCreateOption = useDebouncedCallback((order) => {
    createOption(questionId, formId, order);
  }, 500);

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <RadioGroup defaultValue="option-one font-base">
      {options.map((option, index) => {
        return (
          <div
            key={option.id}
            className="flex items-center space-x-2 relative group"
          >
            <RadioGroupItem value="option-one" id="option-one" />
            <Input
              ref={options.length === index + 1 ? lastInputRef : null}
              defaultValue={option.optionText}
              placeholder="Type the option"
              className="sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0"
              onChange={(e) => debounced(e.target.value, option.id)}
            />
            <div className=" absolute top-2 left-0 transform -translate-x-full  hidden group-hover:inline-flex">
              <div className="mr-4">
                {/* <div className="px-2 hover:cursor-pointer">
                  <Plus
                    size={16}
                    className=" text-gray-700"
                    onClick={async () => {
                      // await createQuestion(formId, element.order + 1);
                    }}
                  />
                </div> */}
                <div className="px-2 hover:cursor-pointer">
                  <Trash2
                    size={20}
                    className=" text-gray-700 "
                    onClick={async () => {
                      // await deleteQuestion(formId, element.id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div
        onClick={() => {
          createOption(questionId, formId, options.length + 1);
        }}
        key={"dsd"}
        className="flex items-center space-x-2 "
      >
        <RadioGroupItem value="option-one" id="option-one" />
        <Input
          defaultValue="Add other option"
          placeholder="Type the option"
          // disabled
          className="sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0 text-slate-400"
          // onChange={(e) => debouncedCreateOption(options.length + 1)}
        />
      </div>
    </RadioGroup>
  );
};
