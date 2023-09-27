import QuestionForm from "./form";
import {
  getQuestionsFromUser,
  getFormFromUser,
  createQuestion,
  deleteQuestion,
  tooglePublishFormFromUser,
  createOptionQuestion,
} from "@/lib/actions";

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
          createQuestion={createQuestion}
          deleteQuestion={deleteQuestion}
          tooglePublishFormFromUser={tooglePublishFormFromUser}
          form={form}
          createOptionQuestion={createOptionQuestion}
        />
      }
    </>
  );
}
