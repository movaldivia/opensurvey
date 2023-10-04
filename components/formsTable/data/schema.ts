import { z } from "zod";

export const formSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  shortId: z.string(),
});

export type Form = z.infer<typeof formSchema>;
