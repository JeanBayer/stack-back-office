import { z } from 'zod';

export type FieldsType =
  | 'instruccion-monto'
  | 'instruccion-input'
  | 'instruccion-pasos'
  | 'csv'
  | 'simple'
  | 'empty';

export const MisionModuleSchema = z.object({
  'modulo-mision': z.string().min(1),
  'modulo-mision-instruccion': z.string().min(1),
  'modulo-mision-dynamic': z
    .union([z.string().min(1), z.string().min(10)])
    .optional(),
  'modulo-audiencia': z.string().min(1),
  'modulo-audiencia-dynamic': z
    .union([z.string().min(1), z.string().min(10)])
    .optional(),
});

// TODO: agregar un tipo merge para ir concatenando los Schema de otros modulos
export const FilterSchemaPrueba = MisionModuleSchema;
