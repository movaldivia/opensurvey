"use client";

import * as z from "zod";
import { useDebouncedCallback } from "use-debounce";
import { Plus, Trash2 } from "lucide-react";

import { useRef, useEffect, useState } from "react";
import { QuestionCommand } from "@/components/command";

import { useToast } from "@/components/ui/use-toast";
import {
  updateQuestionFromUser,
  updateFormFromUser,
  updateOptionText,
} from "@/lib/actions/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { MoveLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

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
  createShortResponseQuestion,
  deleteQuestion,
  tooglePublishFormFromUser,
  form,
  createOptionQuestion,
  updateOptionText,
  createOption,
  deleteOption,
}: {
  formId: string;
  questions: any;
  title: string;
  createShortResponseQuestion: any;
  deleteQuestion: any;
  tooglePublishFormFromUser: any;
  form: any;
  createOptionQuestion: any;
  updateOptionText: any;
  createOption: any;
  deleteOption: any;
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

  const [openQuestionCommand, setOpenQuestionCommand] = useState(false);

  const [newElementOrder, setNewElementOrder] = useState(questions.length + 1);

  // const [createFunction, setCreateFunction] = useState(null);

  return (
    <div className="mx-auto	my-6 mt-16 sm:my-24 w-full max-w-xs sm:max-w-4xl">
      <div className="">
        <div className="my-10">
          <QuestionCommand
            setOpen={setOpenQuestionCommand}
            open={openQuestionCommand}
            newElementOrder={newElementOrder}
            formId={formId}
            createShortResponseQuestion={createShortResponseQuestion}
            createOptionQuestion={createOptionQuestion}
          />
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
              await createShortResponseQuestion(formId, questions.length + 1);
            }}
          >
            Add Question
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 ml-2"
            onClick={async () => {
              await createOptionQuestion(formId, questions.length + 1);
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
                            console.log("set function");
                            setNewElementOrder(element.order + 1);
                            setOpenQuestionCommand(true);

                            // await createShortResponseQuestion(formId, element.order + 1);
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
                <div key={element.id} className="mb-5 group relative">
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
                    deleteOption={deleteOption}
                  />
                  <div className=" absolute top-0 left-0 transform -translate-x-full  hidden group-hover:inline-flex">
                    <div className="mr-4 flex items-center">
                      <div className="hover:cursor-pointer">
                        <Plus
                          size={24}
                          className=" text-gray-700"
                          onClick={async () => {
                            setNewElementOrder(element.order + 1);
                            setOpenQuestionCommand(true);
                            // await createShortResponseQuestion(
                            //   formId,
                            //   element.order + 1
                            // );
                          }}
                        />
                      </div>
                      <div className="pl-1 hover:cursor-pointer">
                        <Trash2
                          size={22}
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
          })}
        </div>
      </div>
    </div>
  );
}

const QuestionRadioGroup = ({
  options,
  formId,
  questionId,
  createOption,
  deleteOption,
}) => {
  // optionText: string,
  // optionId: string,
  // questionId: string,
  // formId: string

  const [prevOptionsLength, setPrevOptionsLength] = useState(options.length);

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
    if (options.length > prevOptionsLength) {
      // A new option has been added, set the focus to the last input
      lastInputRef.current && lastInputRef.current.focus();
    }
    // Update the previous length state
    setPrevOptionsLength(options.length);
  }, [options, prevOptionsLength]);

  // questionId: string,
  // formId: string,
  // order: number

  const debouncedCreateOption = useDebouncedCallback((order) => {
    createOption(questionId, formId, order);
  }, 500);

  if (!options) {
    return null;
  }

  return (
    <RadioGroup>
      {options.map((option, index) => {
        return (
          <div
            key={option.id}
            className="flex items-center space-x-2 relative group"
          >
            <RadioGroupItem value={option.id} id={option.id} />
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
                      // await createShortResponseQuestion(formId, element.order + 1);
                    }}
                  />
                </div> */}
                <div className="px-2 hover:cursor-pointer">
                  <Trash2
                    size={20}
                    className=" text-gray-700 "
                    onClick={async () => {
                      // questionId: string,
                      // optionId: string,
                      // formId: string
                      await deleteOption(questionId, option.id, formId);
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
        <RadioGroupItem value={"input"} id={"input"} />
        <Input
          defaultValue="Add other option"
          placeholder="Type the option"
          // disabled

          className="sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0 text-slate-400"
          onChange={(e) => debouncedCreateOption(options.length + 1)}
        />
      </div>
    </RadioGroup>
  );
};
