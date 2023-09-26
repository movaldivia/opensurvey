import {
  getQuestionsFromUser,
  getFormFromUser,
  createQuestion,
  deleteQuestion,
} from "@/lib/actions";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export default async function Page({ params }: { params: { slug: string } }) {
  const questions = await getQuestionsFromUser(params.slug);
  const form = await getFormFromUser(params.slug);

  const title = form.title;

  return (
    <div className="mx-auto	my-6 mt-16 sm:my-24 w-full max-w-xs sm:max-w-4xl">
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
            {"Back to Editor"}
          </div>
        </Link>
      </div>
      <div className="text-4xl font-semibold tracking-tight transition-colors">
        {title}
      </div>

      <div className="mt-12">
        {questions.map((element) => {
          return (
            <div key={element.id} className="mb-5 group relative">
              <div className="sm:w-1/2 tracking-tight flex h-9 w-full rounded-md border-0 bg-transparent py-1 text-sm transition-colors leading-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                {element.text}
              </div>
              <Input
                // defaultValue={element.placeholder}
                placeholder={element.placeholder ? element.placeholder : ""}
                key={element.id + "1"}
                className="sm:w-1/2 leading-7 [&:not(:first-child)]:mt-0 text-muted-foreground "
              />
            </div>
          );
        })}
      </div>
      <div className="mt-16">
        <Button>Submit</Button>
      </div>
    </div>
  );
}
