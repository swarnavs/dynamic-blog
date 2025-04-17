import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const commentSchema = z.object({
  content: z.string().optional(),
});
