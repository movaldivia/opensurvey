import QuestionForm from "./form";
import { getQuestionsFromUser, getFormFromUser } from "@/lib/actions";

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
        />
      }
    </>
  );
}
