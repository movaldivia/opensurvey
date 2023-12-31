"use client";

import { useDebouncedCallback } from "use-debounce";
import { Plus, Trash2 } from "lucide-react";

import { FormContainer } from "@/components/form-container";
import { Checkbox } from "@/components/ui/checkbox";

import { type Form, Prisma, type Option } from "@prisma/client";

import { useRef, useEffect, useState } from "react";
import { QuestionCommand } from "@/components/command";

import {
  DotsVerticalIcon,
  Share1Icon,
  EyeOpenIcon,
  CopyIcon,
} from "@radix-ui/react-icons";

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

import EditableFormTitle from "@/components/editable-form-title";
import EditableQuestionText from "@/components/editable-question-text";

type QuestionWithOptions = Prisma.QuestionGetPayload<{
  include: { options: true };
}>;

export default function QuestionForm({
  questions,
  createShortResponseQuestion,
  deleteQuestion,
  tooglePublishFormFromUser,
  form,
  createOptionQuestion,
  updateOptionText,
  createOption,
  deleteOption,
  host,
  createMultipleOptionQuestion,
}: {
  questions: QuestionWithOptions[];
  createShortResponseQuestion: any;
  deleteQuestion: any;
  tooglePublishFormFromUser: any;
  form: Form;
  createOptionQuestion: any;
  updateOptionText: any;
  createOption: any;
  deleteOption: any;
  host: string;
  createMultipleOptionQuestion: any;
}) {
  const { id: formId, title } = form;
  const { toast } = useToast();

  const questionTextAndPlaceholderDebounced = useDebouncedCallback(
    (questionId, placeholder, text) => {
      updateQuestionFromUser(formId, questionId, placeholder, text);
    },
    300
  );

  const formTitleDebounced = useDebouncedCallback(
    (formId: string, title: string) => {
      updateFormFromUser(formId, title);
    },
    300
  );

  const [openQuestionCommand, setOpenQuestionCommand] = useState(false);

  const [newElementOrder, setNewElementOrder] = useState(questions.length + 1);

  const [commandQuestionId, setCommandQuestionId] = useState("");

  return (
    <div className="">
      <div className="my-6 block md:flex justify-between items-center">
        <div>
          <QuestionCommand
            setOpen={setOpenQuestionCommand}
            open={openQuestionCommand}
            newElementOrder={newElementOrder}
            formId={formId}
            createShortResponseQuestion={createShortResponseQuestion}
            createOptionQuestion={createOptionQuestion}
            deleteQuestion={deleteQuestion}
            commandQuestionId={commandQuestionId}
            createMultipleOptionQuestion={createMultipleOptionQuestion}
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
        <div className="flex mt-8 md:mt-0">
          <Link
            className="cursor-pointer"
            href={`/forms/viewform/${formId}`}
            target="_blank"
          >
            <div className="flex items-center px-1  hover:bg-slate-100 rounded-md">
              <EyeOpenIcon className="h-4 w-4 px-0 mx-0 ml-2" />
              <Button className="-ml-2 hover:no-underline" variant={"link"}>
                Preview
              </Button>
            </div>
          </Link>
          <div
            tabIndex={0}
            onClick={async () => {
              await tooglePublishFormFromUser(formId);
            }}
            className="flex items-center px-1 cursor-pointer hover:bg-slate-100 rounded-md ml-2"
          >
            <Share1Icon className="h-4 w-4 px-0 mx-0 ml-2" />
            <Button className="-ml-2 hover:no-underline" variant={"link"}>
              {form.published ? "Unpublish" : "Publish"}
            </Button>
          </div>
          {form.published ? (
            <div
              tabIndex={0}
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `${host}/forms/viewform/${formId}`
                );

                toast({
                  title: "Link successfully copied",
                });
              }}
              className="flex items-center px-1 cursor-pointer hover:bg-slate-100 rounded-md ml-2"
            >
              <CopyIcon className="h-4 w-4 px-0 mx-0 ml-2" />
              <Button className="-ml-2 hover:no-underline" variant={"link"}>
                Copy Link
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <FormContainer>
        <div className="">
          <EditableFormTitle
            value={title}
            formTitleDebounced={formTitleDebounced}
            formId={formId}
          />
          <div className="mt-8">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={async () => {
                setNewElementOrder(questions.length + 1);
                setCommandQuestionId("");
                setOpenQuestionCommand(true);
              }}
            >
              Add Question
            </Button>
          </div>

          <div className="mt-12">
            {questions.map((question) => {
              if (question.type === "SHORT_RESPONSE") {
                return (
                  <div key={question.id} className="mb-5 group relative">
                    <EditableQuestionText
                      value={question.text}
                      questionTextAndPlaceholderDebounced={
                        questionTextAndPlaceholderDebounced
                      }
                      questionId={question.id}
                    />
                    <Input
                      defaultValue={question.placeholder}
                      placeholder="Type a placeholder for the response (optional)"
                      key={question.id + "1"}
                      className="sm:w-1/2 leading-7 [&:not(:first-child)]:mt-0 text-muted-foreground "
                      onChange={(e) =>
                        questionTextAndPlaceholderDebounced(
                          question.id,
                          e.target.value,
                          null
                        )
                      }
                    />
                    <div className="absolute top-0 left-0 transform -translate-x-full flex md:hidden items-center">
                      <div className="mt-2 mr-1 flex">
                        <DotsVerticalIcon
                          className="h-4 w-4"
                          onClick={() => {
                            setNewElementOrder(question.order + 1);
                            setCommandQuestionId(question.id);
                            setOpenQuestionCommand(true);
                          }}
                        />
                      </div>
                    </div>
                    <div className=" absolute top-2 left-0 transform -translate-x-full  hidden md:group-hover:inline-flex">
                      <div className="mr-6">
                        <div className="px-2 hover:cursor-pointer">
                          <Plus
                            className=" text-gray-700"
                            onClick={async () => {
                              setNewElementOrder(question.order + 1);
                              setOpenQuestionCommand(true);

                              // await createShortResponseQuestion(formId, element.order + 1);
                            }}
                          />
                        </div>
                        <div className="px-2 mt-1 hover:cursor-pointer">
                          <Trash2
                            className=" mt-1 text-gray-700 "
                            onClick={async () => {
                              await deleteQuestion(formId, question.id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else if (question.type === "SELECT_ONE_OPTION") {
                return (
                  <div key={question.id} className="mb-5 group relative">
                    <EditableQuestionText
                      value={question.text}
                      questionTextAndPlaceholderDebounced={
                        questionTextAndPlaceholderDebounced
                      }
                      questionId={question.id}
                    />
                    <QuestionRadioGroup
                      options={question.options}
                      formId={formId}
                      questionId={question.id}
                      createOption={createOption}
                      deleteOption={deleteOption}
                    />
                    <div className="absolute top-0 left-0 transform -translate-x-full flex md:hidden items-center">
                      <div className="mt-2 mr-1 flex">
                        <DotsVerticalIcon
                          className="h-4 w-4"
                          onClick={() => {
                            setNewElementOrder(question.order + 1);
                            setCommandQuestionId(question.id);
                            setOpenQuestionCommand(true);
                          }}
                        />
                      </div>
                    </div>
                    <div className=" absolute top-0 left-0 transform -translate-x-full  hidden md:group-hover:inline-flex">
                      <div className="mr-4 items-center hidden md:flex">
                        <div className="hover:cursor-pointer">
                          <Plus
                            size={24}
                            className=" text-gray-700"
                            onClick={async () => {
                              setNewElementOrder(question.order + 1);
                              setOpenQuestionCommand(true);
                            }}
                          />
                        </div>
                        <div className="pl-1 hover:cursor-pointer">
                          <Trash2
                            size={22}
                            className=" mt-1 text-gray-700 "
                            onClick={async () => {
                              await deleteQuestion(formId, question.id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              if (question.type === "SELECT_MULTIPLE_OPTIONS") {
                return (
                  <div key={question.id} className="mb-5 group relative">
                    <EditableQuestionText
                      value={question.text}
                      questionTextAndPlaceholderDebounced={
                        questionTextAndPlaceholderDebounced
                      }
                      questionId={question.id}
                    />
                    <QuestionCheckboxes
                      options={question.options}
                      formId={formId}
                      questionId={question.id}
                      createOption={createOption}
                      deleteOption={deleteOption}
                    />
                    <div className="absolute top-0 left-0 transform -translate-x-full flex md:hidden items-center">
                      <div className="mt-2 mr-1 flex">
                        <DotsVerticalIcon
                          className="h-4 w-4"
                          onClick={() => {
                            setNewElementOrder(question.order + 1);
                            setCommandQuestionId(question.id);
                            setOpenQuestionCommand(true);
                          }}
                        />
                      </div>
                    </div>
                    <div className=" absolute top-0 left-0 transform -translate-x-full  hidden md:group-hover:inline-flex">
                      <div className="mr-4 items-center hidden md:flex">
                        <div className="hover:cursor-pointer">
                          <Plus
                            size={24}
                            className=" text-gray-700"
                            onClick={async () => {
                              setNewElementOrder(question.order + 1);
                              setOpenQuestionCommand(true);
                            }}
                          />
                        </div>
                        <div className="pl-1 hover:cursor-pointer">
                          <Trash2
                            size={22}
                            className=" mt-1 text-gray-700 "
                            onClick={async () => {
                              await deleteQuestion(formId, question.id);
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
      </FormContainer>
    </div>
  );
}

const QuestionRadioGroup = ({
  options,
  formId,
  questionId,
  createOption,
  deleteOption,
}: {
  options: Option[];
  formId: string;
  questionId: string;
  createOption: any;
  deleteOption: any;
}) => {
  const [prevOptionsLength, setPrevOptionsLength] = useState(options.length);

  const debounced = useDebouncedCallback(
    // function
    (optionText, optionId) => {
      updateOptionText(optionText, optionId, questionId, formId);
    },
    // delay in ms
    500
  );

  const lastInputRef = useRef<HTMLInputElement | null>(null);

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
                <div className="md:px-2 hover:cursor-pointer">
                  <Trash2
                    size={20}
                    className=" text-gray-700 "
                    onClick={async () => {
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

const QuestionCheckboxes = ({
  options,
  formId,
  questionId,
  createOption,
  deleteOption,
}: {
  options: Option[];
  formId: string;
  questionId: string;
  createOption: any;
  deleteOption: any;
}) => {
  const [prevOptionsLength, setPrevOptionsLength] = useState(options.length);

  const debounced = useDebouncedCallback(
    // function
    (optionText, optionId) => {
      updateOptionText(optionText, optionId, questionId, formId);
    },

    500
  );

  const lastInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (options.length > prevOptionsLength) {
      lastInputRef.current && lastInputRef.current.focus();
    }
    setPrevOptionsLength(options.length);
  }, [options, prevOptionsLength]);

  const debouncedCreateOption = useDebouncedCallback((order) => {
    createOption(questionId, formId, order);
  }, 500);

  if (!options) {
    return null;
  }

  return (
    <div>
      {options.map((option, index) => {
        return (
          <div
            key={option.id}
            className="flex items-center space-x-2 relative group"
          >
            <Checkbox />
            <Input
              ref={options.length === index + 1 ? lastInputRef : null}
              defaultValue={option.optionText}
              placeholder="Type the option"
              className="sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0"
              onChange={(e) => debounced(e.target.value, option.id)}
            />
            <div className=" absolute top-2 left-0 transform -translate-x-full  hidden group-hover:inline-flex">
              <div className="mr-4">
                <div className="md:px-2 hover:cursor-pointer">
                  <Trash2
                    size={20}
                    className=" text-gray-700 "
                    onClick={async () => {
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
        <Checkbox value={"input"} id={"input"} />
        <Input
          defaultValue="Add other option"
          placeholder="Type the option"
          className="sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0 text-slate-400"
          onChange={(e) => debouncedCreateOption(options.length + 1)}
        />
      </div>
    </div>
  );
};
