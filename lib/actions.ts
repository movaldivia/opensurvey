"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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

export const updateQuestionFromUser = async (
  formId: string,
  questionId: string,
  placeholder: string | null,
  text: string | null
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  if (text != null && placeholder != null) {
    const response = await prisma.question.update({
      where: {
        formId,
        id: questionId,
        userId: session.user.id,
      },
      data: {
        text,
        placeholder,
      },
    });
    revalidatePath(`forms/${formId}`);
    return response;
  } else if (text != null) {
    const response = await prisma.question.update({
      where: {
        formId,
        id: questionId,
        userId: session.user.id,
      },
      data: {
        text,
      },
    });
    revalidatePath(`forms/${formId}`);
    return response;
  } else if (placeholder != null) {
    const response = await prisma.question.update({
      where: {
        formId,
        id: questionId,
        userId: session.user.id,
      },
      data: {
        placeholder,
      },
    });
    revalidatePath(`forms/${formId}`);
    return response;
  }
};

export const getQuestionsFromUser = async (formId: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const formFromUser = await prisma.form.findFirst({
    where: {
      id: formId,
    },
  });

  if (!formFromUser) {
    return {
      error: "Form does not exist",
    };
  }

  if (formFromUser.userId !== session.user.id) {
    return {
      error: "Form is not from user",
    };
  }

  const response = await prisma.question.findMany({
    where: {
      formId: formFromUser.id,
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  revalidatePath(`forms/${formId}`);

  return response;
};

export const createQuestion = async (formId: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const formFromUser = await prisma.form.findFirst({
    where: {
      id: formId,
    },
  });

  if (!formFromUser) {
    return {
      error: "Form does not exist",
    };
  }

  if (formFromUser.userId !== session.user.id) {
    return {
      error: "Form is not from user",
    };
  }

  const response = await prisma.question.create({
    data: {
      userId: session.user.id,
      formId: formFromUser.id,
    },
  });

  revalidatePath(`forms/${formId}`);

  return response;
};

export const getFormsFromUser = async () => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const response = await prisma.form.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return response;
};

export const getFormFromUser = async (formId: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const response = await prisma.form.findFirst({
    where: {
      userId: session.user.id,
      id: formId,
    },
  });

  return response;
};
