import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
