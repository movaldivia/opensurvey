import {
  getForm,
  submitForm,
  getQuestionsFromPublishedFormOrFromAuthor,
} from "@/lib/actions/actions";

import Form from "./form";
import { notFound } from "next/navigation";
import { FormTitle } from "@/components/formTitle";
import { FormContainer } from "@/components/form-container";

export default async function Page({ params }: { params: { slug: string } }) {
  const questions = await getQuestionsFromPublishedFormOrFromAuthor(
    params.slug
  );

  if (!questions || "error" in questions) {
    notFound();
  }

  const form = await getForm(params.slug);

  const title = form.title;

  return (
    <FormContainer>
      <div className="mt-20 md:mt-0">
        <FormTitle title={title} />
        <Form questions={questions} form={form} submitForm={submitForm}></Form>
      </div>
    </FormContainer>
  );
}
