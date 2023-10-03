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

export default async function Page({ params }: { params: { slug: string } }) {
  const questions = await getQuestionsFromUser(params.slug);
  const form = await getFormFromUser(params.slug);

  return (
    <>
      {
        <QuestionForm
          title={form?.title}
          formId={params.slug}
          questions={questions}
          createShortResponseQuestion={createShortResponseQuestion}
          deleteOption={deleteOption}
          deleteQuestion={deleteQuestion}
          tooglePublishFormFromUser={tooglePublishFormFromUser}
          form={form}
          createOptionQuestion={createOptionQuestion}
          updateOptionText={updateOptionText}
          createOption={createOption}
        />
      }
    </>
  );
}
