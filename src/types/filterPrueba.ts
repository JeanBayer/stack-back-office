import { z } from 'zod';

export type DynamicId =
  | 'modulo-mision-dynamic'
  | 'modulo-mision-instruccion'
  | 'modulo-mision-meta'
  | 'modulo-mision-simple'
  | 'modulo-mision-pasos';

export type DynamicModules = {
  [key in DynamicId]: string;
};

export type FieldsType =
  | 'instruccion-monto'
  | 'instruccion-input'
  | 'instruccion-pasos'
  | 'simple'
  | 'empty';

export type ModuleType = 'modulo-mision';
export type Module = {
  [key in ModuleType]: string;
};

export type FilterPrueba = DynamicModules & Module;

export const FilterSchemaPrueba = z.object({
  'modulo-mision': z.string().min(1),
  'modulo-mision-instruccion': z.string().min(1),
  'modulo-mision-dynamic': z
    .union([z.string().min(1), z.string().min(10)])
    .optional(),
});
