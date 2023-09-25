import {
  getQuestionsFromUser,
  getFormFromUser,
  createQuestion,
  deleteQuestion,
  getForm,
  submitForm,
} from "@/lib/actions";
import Link from "next/link";

import Form from "./form";

export default async function Page({ params }: { params: { slug: string } }) {
  const questions = await getQuestionsFromUser(params.slug);
  const form = await getForm(params.slug);

  const title = form.title;

  return (
    <div className="mx-8 my-6 sm:mx-48 sm:my-8">
      <div className="text-3xl font-semibold tracking-tight transition-colors">
        {title}
      </div>

      <Form questions={questions} form={form} submitForm={submitForm}></Form>
    </div>
  );
}
