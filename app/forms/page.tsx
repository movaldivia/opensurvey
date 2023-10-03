import Form from "@/app/forms/form";
import { getFormsFromUser } from "@/lib/actions/actions";
import { DataTable } from "@/components/formsTable/data-table";
import { columns } from "@/components/formsTable/columns";

import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function Forms() {
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

  return (
    <div className="my-24 mx-24">
      <div className="mt-12 mb-8">{<Form></Form>}</div>
      {<DataTable data={formsFromUserFormatted} columns={columns}></DataTable>}
    </div>
  );
}
