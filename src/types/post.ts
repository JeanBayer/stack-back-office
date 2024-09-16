import { z } from 'zod';

export interface Post {
  id: string;
  title: string;
  views: number;
  author: string;
  estado: string;
  date?: string;
  imageUrl?: string;
}

export interface Pagination {
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

export interface PostResponse {
  pagination: Pagination;
  items: Post[];
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
  estado: z.string(),
  date: z.string().optional(),
  imageUrl: z.any().optional(),
});
