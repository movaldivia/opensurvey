import { getQuestionsFromUser, getFormFromUser } from "@/lib/actions/actions";
import Link from "next/link";
import { notFound } from "next/navigation";

import { type Option } from "@prisma/client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { FormContainer } from "@/components/form-container";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

import { FormTitle } from "@/components/formTitle";

export default async function Page({ params }: { params: { slug: string } }) {
  const questions = await getQuestionsFromUser(params.slug);
  const form = await getFormFromUser(params.slug);

  if (!form || "error" in form) {
    notFound();
  }

  if ("error" in questions) {
    notFound();
  }

  const { title } = form;

  return (
    <div className="mx-auto	my-6 mt-16 sm:my-24 w-full max-w-xs sm:max-w-4xl">
      <div className="my-10">
        <Link href={`/forms/${form.id}`}>
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
            {"Back to Editor"}
          </div>
        </Link>
      </div>

      <FormContainer>
        <FormTitle title={title} />
        <div className="mt-12">
          {questions.map((question) => {
            if (question.type === "SHORT_RESPONSE") {
              return (
                <div key={question.id} className="mb-5 group relative">
                  <div className="sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0 font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tracking-wide text-lg">
                    {question.text}
                  </div>
                  <Input
                    placeholder={
                      question.placeholder ? question.placeholder : ""
                    }
                    key={question.id + "1"}
                    className="sm:w-1/2 leading-7 [&:not(:first-child)]:mt-0 text-muted-foreground "
                  />
                </div>
              );
            } else if ("MANY_OPTIONS") {
              return (
                <div key={question.id} className="mb-5">
                  <div className="sm:w-1/2 border-0 shadow-none focus-visible:ring-0 pl-0 !mt-0 !pt-0 scroll-m-20 tracking-tight transition-colors leading-7 [&:not(:first-child)]:mt-0 font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tracking-wide text-lg">
                    {question.text}
                  </div>
                  <QuestionRadioGroup options={question.options} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="mt-16">
          <Button>Submit</Button>
        </div>
      </FormContainer>
    </div>
  );
}

const QuestionRadioGroup = ({ options }: { options: Option[] }) => {
  return (
    <RadioGroup defaultValue="option-one font-base ">
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
