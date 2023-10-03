import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Form from "@/app/forms/form";
import { getFormsFromUser } from "@/lib/actions/actions";
import { DataTable } from "@/components/formsTable/data-table";
import { columns } from "@/components/formsTable/columns";
import path from "path";
import { taskSchema } from "@/components/formsTable/data/schema";
import { promises as fs } from "fs";
import { z } from "zod";

import { format } from "date-fns";

// Add
export const dynamic = "force-dynamic";

type Question = {
  type: "text";
};

const generateQuestion = (): Question => {
  return {
    type: "text",
  };
};

type RenderQuestionProps = {
  text: string;
};

const renderQuestion = (props: Question) => {
  if (props.type === "text") {
    return <div>hola</div>;
  }
  return null;
};

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "components/formsTable/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function Forms() {
  const tasks = await getTasks();
  const formsFromUser = await getFormsFromUser();

  if ("error" in formsFromUser) {
    return null;
  }

  const formsFromUserFormatted = formsFromUser.map((element) => {
    return {
      ...element,
      createdAt: format(element.createdAt, "dd/MM/yyyy"),
      updatedAt: format(element.updatedAt, "dd/MM/yyyy"),
    };
  });

  const questions = [generateQuestion()];
  return (
    <div className="my-24 mx-24">
      <div className="mt-12 mb-8">{<Form></Form>}</div>
      {<DataTable data={formsFromUserFormatted} columns={columns}></DataTable>}
      {/* {questions.map((element) => {
        return renderQuestion(element);
      })}
      <div className="my-12">
        <Input
          className="border-0 shadow-none focus-visible:ring-0 !focus:border-0 !active:border-0 text-lg font-semibold p-4"
          type="email"
          placeholder="Type the question"
        />
      </div>
      <div className="my-12 ">
        <Input
          className="border-0 shadow-none text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] p-12"
          type="email"
          placeholder="Type the question"
        />
      </div>

      <input placeholder="Type the question"></input> */}
    </div>
  );
}
