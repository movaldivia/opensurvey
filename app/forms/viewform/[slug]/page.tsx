import {
  getForm,
  submitForm,
  getQuestionsFromPublishedForm,
} from "@/lib/actions/actions";

import Form from "./form";
import { notFound } from "next/navigation";
import { FormTitle } from "@/components/formTitle";

export default async function Page({ params }: { params: { slug: string } }) {
  const questions = await getQuestionsFromPublishedForm(params.slug);

  if (!questions || "error" in questions) {
    notFound();
  }

  const form = await getForm(params.slug);

  const title = form.title;

  return (
    <div className="mx-auto	my-6 mt-16 sm:my-24 w-full max-w-xs sm:max-w-4xl">
      <div className="px-20 mt-20">
        <FormTitle title={title} />

        <Form questions={questions} form={form} submitForm={submitForm}></Form>
      </div>
    </div>
  );
}
