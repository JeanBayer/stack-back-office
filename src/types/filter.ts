import { z } from 'zod';

export interface Filter {
  estado: string;
}

export const FilterSchema = z.object({
  estado: z.string(),
});
