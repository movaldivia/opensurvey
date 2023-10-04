"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { type Form, Prisma, type Option } from "@prisma/client";
import { FormTitle } from "@/components/formTitle";

type QuestionWithOptions = Prisma.QuestionGetPayload<{
  include: {
    options: true;
  };
}>;

type ShortResponseAnswer = {
  type: "SHORT_RESPONSE";
  optionId: null;
  text: string;
};

type ManyOptionsAnswer = {
  type: "MANY_OPTIONS";
  optionId: string;
  text: string;
};

type Accumulator = {
  [key: string]: ShortResponseAnswer | ManyOptionsAnswer;
};

type SetAnswers = React.Dispatch<React.SetStateAction<Accumulator>>;

export default function Form({
  questions,
  submitForm,
  form,
}: {
  questions: QuestionWithOptions[];
  submitForm: any;
  form: Form;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState(
    questions.reduce<Accumulator>((acc, question) => {
      if (question.type === "SHORT_RESPONSE") {
        acc[question.id] = {
          type: "SHORT_RESPONSE",
          optionId: null,
          text: "",
        };
      } else if (question.type === "MANY_OPTIONS") {
        acc[question.id] = {
          type: "MANY_OPTIONS",
          optionId: "",
          text: "",
        };
      }
      return acc;
    }, {})
  );

  return (
    <div>
      <div className="mt-16">
        {questions.map((question) => {
          if (question.type === "SHORT_RESPONSE") {
            return (
              <div key={question.id} className="mb-5 group relative">
                <div className="sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-wide transition-colors leading-7 [&:not(:first-child)]:mt-0 text-lg mb-2 font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {question.text}
                </div>
                <Input
                  // defaultValue={question.placeholder}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [question.id]: {
                        ...prevAnswers[question.id],
                        text: newValue,
                        type: "SHORT_RESPONSE",
                        optionId: null,
                      },
                    }));
                  }}
                  placeholder={question.placeholder ? question.placeholder : ""}
                  key={question.id + "1"}
                  className="sm:w-1/2 leading-7 [&:not(:first-child)]:mt-0 text-muted-foreground "
                />
              </div>
            );
          } else if ("MANY_OPTIONS") {
            return (
              <div key={question.id} className="mb-5">
                <div className="sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-wide text-lg transition-colors leading-7 [&:not(:first-child)]:mt-0  mb-2 font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {question.text}
                </div>
                <QuestionRadioGroup
                  setAnswers={setAnswers}
                  options={question.options}
                  questionId={question.id}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="mt-8">
        <Button
          onClick={async () => {
            await submitForm(answers, form.id);
            router.push(`/forms/success/${form.id}`);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

const QuestionRadioGroup = ({
  options,
  setAnswers,
  questionId,
}: {
  options: Option[];
  setAnswers: SetAnswers;
  questionId: string;
}) => {
  return (
    <RadioGroup
      onValueChange={(value) => {
        const newValue = value;
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [questionId]: {
            text: "",
            optionId: newValue,
            type: "MANY_OPTIONS",
          },
        }));
      }}
    >
      {options.map((option) => {
        return (
          <div
            key={option.id}
            className="flex items-center space-x-2 relative group"
          >
            <RadioGroupItem value={option.id} id={option.id} />
            <Input
              defaultValue={option.optionText}
              placeholder="Type the option"
              className="sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0"
            />
          </div>
        );
      })}
    </RadioGroup>
  );
};
