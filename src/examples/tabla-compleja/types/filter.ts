import { z } from 'zod';

export type Filter = {
  estado: string;
  views: string;
};

export const FilterSchema = z.object({
  estado: z.string().optional(),
  views: z
    .union([
      z
        .string()
        .refine((value) => !isNaN(Number(value)) && Number(value) >= 0, {
          message: 'views must be a number greater than or equal to 0',
        }),
      z.string().length(0),
    ])
    .optional(),
});
