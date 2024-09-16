import { z } from 'zod';

export interface Post {
  id: string;
  title: string;
  views: number;
  author: string;
  date?: string;
  imagenURL?: unknown;
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

export const PostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5).max(20),
  author: z.string().min(5).max(20),
  views: z
    .number({
      message: 'Views must be a positive integer',
    })
    .int()
    .positive(),
  date: z.string().optional(),
  imagenURL: z.any().optional(),
});
