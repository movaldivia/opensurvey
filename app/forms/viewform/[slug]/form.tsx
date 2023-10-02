"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Form({
  questions,
  submitForm,
  form,
}: {
  questions: any;
  submitForm: any;
  form: any;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState(
    questions.reduce((acc, question) => {
      if (question.type === "SHORT_RESPONSE")
        acc[question.id] = {
          type: "SHORT_RESPONSE",
          optionId: null,
          text: "",
        };
      else if (question.type === "MANY_OPTIONS") {
        acc[question.id] = {
          type: "MANY_OPTIONS",
          optionId: null,
          text: null,
        };
      }
      return acc;
    }, {})
  );

  return (
    <div>
      <div className="mt-12">
        {questions.map((question) => {
          if (question.type === "SHORT_RESPONSE") {
            return (
              <div key={question.id} className="mb-5 group relative">
                <div className="sm:w-1/2 tracking-tight flex h-9 w-full rounded-md border-0 bg-transparent py-1 text-sm transition-colors leading-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
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
              <div key={question.id}>
                <div className="sm:w-1/2 tracking-tight flex h-9 w-full rounded-md border-0 bg-transparent py-1 text-sm transition-colors leading-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
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
            // router.push(`/forms/success/${form.id}`);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

const QuestionRadioGroup = ({ options, setAnswers, questionId }) => {
  return (
    <RadioGroup
      onValueChange={(value) => {
        const newValue = value;
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [questionId]: {
            ...prevAnswers[questionId],
            optionId: newValue,
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
