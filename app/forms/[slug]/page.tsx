import QuestionForm from "./form";
import {
  getQuestionsFromUser,
  getFormFromUser,
  deleteQuestion,
  tooglePublishFormFromUser,
  updateOptionText,
  createOption,
  deleteOption,
} from "@/lib/actions/actions";

import {
  createShortResponseQuestion,
  createOptionQuestion,
} from "@/lib/actions/questions/create";

import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const questions = await getQuestionsFromUser(params.slug);

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
        />
      }
    </>
  );
}
