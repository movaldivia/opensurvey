import QuestionForm from "./form";
import {
  getQuestionsFromUser,
  getFormFromUser,
  deleteQuestion,
  tooglePublishFormFromUser,
  updateOptionText,
} from "@/lib/actions/actions";

import { createOption } from "@/lib/actions/options/create";
import { deleteOption } from "@/lib/actions/options/delete";

import {
  createShortResponseQuestion,
  createOptionQuestion,
  createMultipleOptionQuestion,
} from "@/lib/actions/questions/create";

import { headers } from "next/headers";

import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const questions = await getQuestionsFromUser(params.slug);

  const headersList = headers();

  const host = headersList.get("host") || "";

  if ("error" in questions) {
    notFound();
  }

  const form = await getFormFromUser(params.slug);

  if (form === null || "error" in form) {
    notFound();
  }

  return (
    <>
      {
        <QuestionForm
          questions={questions}
          form={form}
          createShortResponseQuestion={createShortResponseQuestion}
          deleteOption={deleteOption}
          deleteQuestion={deleteQuestion}
          tooglePublishFormFromUser={tooglePublishFormFromUser}
          createOptionQuestion={createOptionQuestion}
          updateOptionText={updateOptionText}
          createOption={createOption}
          host={host}
          createMultipleOptionQuestion={createMultipleOptionQuestion}
        />
      }
    </>
  );
}
