import { z } from "zod";

export const postSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(2, "Name must be at least 2 characters"),
  content: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().min(2, "Name must be at least 2 characters"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isDraft: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  views: z.number().optional(),
});

export type Post = z.infer<typeof postSchema>;
