"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const createForm = async () => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const response = await prisma.form.create({
    data: {
      userId: session.user.id,
      title: "",
    },
  });

  return response;
};
