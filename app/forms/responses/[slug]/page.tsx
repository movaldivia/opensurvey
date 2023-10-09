import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MoveLeft } from "lucide-react";

import Link from "next/link";

import { type Form, type Question, Prisma, type Option } from "@prisma/client";

import {
  getResponsesSummaryFromUser,
  getResponsesFromForm,
} from "@/lib/actions/actions";

import ResponsePie from "@/components/pie";

import { notFound } from "next/navigation";

import { ExportToExcelButton } from "./export-excel-button";

type QuestionWithOptionsWithAnswer = Prisma.QuestionGetPayload<{
  include: {
    answers: {
      include: {
        option: true;
      };
    };
  };
}>;

function transformData(optionsData: (Option | null)[]) {
  type QuestionIdCount = {
    [key: string]: {
      name: string;
      value: number;
    };
  };
  const questionIdCount: QuestionIdCount = {};

  // Count the occurrences of each questionId
  optionsData.forEach((item) => {
    if (item === null) {
      return;
    }
    if (!questionIdCount[item.id]) {
      questionIdCount[item.id] = { name: item.optionText, value: 1 };
    } else {
      questionIdCount[item.id].value += 1;
    }
  });

  // Convert the object into the desired array format
  const result = Object.values(questionIdCount);

  return result;
}

function Question({ question }: { question: QuestionWithOptionsWithAnswer }) {
  if (question.type === "SHORT_RESPONSE") {
    return (
      <Card className="col-span-3 mt-8">
        <CardHeader className="pb-2">
          <CardTitle>{question.text}</CardTitle>
          <CardDescription>{`${question.answers.length} responses`}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 md:space-y-6">
            {}
            {question.answers.map((answer) => {
              return (
                <div key={answer.id} className="ml-4 space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {answer.answerText}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  } else if (question.type === "MANY_OPTIONS") {
    const optionsData = question.answers.map((answer) => {
      return answer.option;
    });

    const options = transformData(optionsData);

    return (
      <Card className="col-span-3 mt-8">
        <CardHeader className="pb-2">
          <CardTitle>{question.text}</CardTitle>
          <CardDescription>{`${question.answers.length} responses`}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <ResponsePie data={options} />
            {question.answers.map((answer) => {
              return (
                <div key={answer.id} className="ml-4 space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {answer.answerText}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const formId = params.slug;
  const result = await getResponsesSummaryFromUser(formId);
  const processedData = await getResponsesFromForm(formId);

  if (processedData === null || "error" in processedData) {
    notFound();
  }

  if ("error" in result) {
    notFound();
  }

  return (
    <div className="px-4 mb-4 md:mx-48 md:my-20">
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
      <h2 className=" border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
        Responses
      </h2>
      <div className="mt-6">
        <ExportToExcelButton processedData={processedData} />
      </div>
      {result.map((question) => {
        return <Question key={question.id} question={question} />;
      })}
    </div>
  );
}
