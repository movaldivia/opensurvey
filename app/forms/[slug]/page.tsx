import QuestionForm from "./form";

export default function Page({ params }: { params: { slug: string } }) {
  return <>{<QuestionForm formId={params.slug} />}</>;
}
