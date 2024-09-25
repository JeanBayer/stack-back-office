import { z } from 'zod';

export interface Filter {
  estado: string;
  title: string;
  'monto-mision-instruccion-monto-mision': string;
}

export const FilterSchema = z.object({
  estado: z.string().optional(),
  title: z.union([z.string().min(3).max(255), z.string().length(0)]).optional(),
  'monto-mision-instruccion-monto-mision': z.string().optional(),
});
