import { z, ZodType } from 'zod';

export interface Post {
  id: string;
  title: string;
  views: number;
  author: string;
  date?: string;
}

export interface PostResponse {
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Post[];
}

export const PostSchema: ZodType<Post> = z.object({
  id: z.string().min(1),
  title: z.string().min(5).max(20),
  author: z.string().min(5).max(20),
  views: z
    .number({
      message: 'Views must be a positive integer',
    })
    .int()
    .positive(),
  date: z.string().optional(),
});
