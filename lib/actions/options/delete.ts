"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const deleteOption = async (
  questionId: string,
  optionId: string,
  formId: string
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  await prisma.question.findFirstOrThrow({
    where: {
      userId: session.user.id,
      id: questionId,
      formId,
    },
  });

  await prisma.option.delete({
    where: {
      id: optionId,
      questionId,
    },
  });

  revalidatePath(`forms/${formId}`);
};
