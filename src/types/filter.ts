import { z } from 'zod';

export interface Filter {
  estado: string;
  title: string;
  'monto-mision-instruccion-monto-mision': string;
  'instruccion-input-instruccion': string;
  'cantidad-pasos-mision-instruccion-pasos-mision': string
  cantidadPasos?: string; 
  simple?: string
}

export const FilterSchema = z.object({
  estado: z.string().optional(),
  title: z.union([z.string().min(3).max(255), z.string().length(0)]).optional(),
  'monto-mision-instruccion-monto-mision': z.string().optional(),
  'instruccion-input-instruccion': z.string().optional(),
  'cantidad-pasos-mision-instruccion-pasos-mision': z.string().optional(),
  cantidadPasos: z.string().optional(),
  simple: z.string().optional(),
});
