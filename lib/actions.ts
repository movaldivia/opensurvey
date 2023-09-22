"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export const updateFormFromUser = async (formId: string, title: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const response = await prisma.form.update({
    where: {
      id: formId,
      userId: session.user.id,
    },
    data: {
      title,
    },
  });
  revalidatePath(`forms/${formId}`);
  return response;
};

export const tooglePublishFormFromUser = async (formId: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const form = await prisma.form.findFirstOrThrow({
    where: {
      id: formId,
      userId: session.user.id,
    },
  });

  const response = await prisma.form.update({
    where: {
      id: formId,
      userId: session.user.id,
    },
    data: {
      published: !form.published,
    },
  });
  revalidatePath(`forms/${formId}`);
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
      order: "asc",
    },
  });

  revalidatePath(`forms/${formId}`);

  return response;
};

export const deleteQuestion = async (formId: string, questionId: string) => {
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

  const questionToDelete = await prisma.question.findFirst({
    where: {
      id: questionId,
    },
  });

  if (!questionToDelete) {
    return {
      error: "Question does not exist",
    };
  }

  if (questionToDelete.formId != formId) {
    return {
      error: "Given questionId is not from the given form Id",
    };
  }

  const questions = await prisma.question.findMany({
    where: {
      formId,
      order: {
        gt: questionToDelete.order,
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  const updateOperations = questions.map((question) => {
    const newOrder = question.order - 1;
    return prisma.question.update({
      where: { id: question.id, formId },
      data: { order: newOrder },
    });
  });

  const deleteFunction = prisma.question.delete({
    where: {
      id: questionId,
    },
  });
  updateOperations.push(deleteFunction);

  await prisma.$transaction(updateOperations);

  revalidatePath(`forms/${formId}`);

  return;
};

export const createQuestion = async (formId: string, questionOrder: number) => {
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

  const questions = await prisma.question.findMany({
    where: {
      formId,
      order: {
        gte: questionOrder,
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  const updateOperations = questions.map((question) => {
    const newOrder = question.order + 1;
    return prisma.question.update({
      where: { id: question.id, formId },
      data: { order: newOrder },
    });
  });

  const createFunction = prisma.question.create({
    data: {
      userId: session.user.id,
      formId,
      order: questionOrder,
    },
  });

  updateOperations.push(createFunction);

  await prisma.$transaction(updateOperations);

  revalidatePath(`forms/${formId}`);

  return;
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

export const getForm = async (formId: string) => {
  const response = await prisma.form.findFirst({
    where: {
      id: formId,
    },
  });

  if (!response) {
    redirect("/forms/e");
  }

  if (!response.published) {
    redirect("/forms/e");
  }

  return response;
};
