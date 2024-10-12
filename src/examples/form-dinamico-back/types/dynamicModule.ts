import { NameInputs } from '@form-dinamico-back/utils';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB en bytes

export type FieldsType =
  | 'monto'
  | 'porcentaje'
  | 'numero'
  | 'instruccion-input'
  | 'instruccion-pasos'
  | 'csv'
  | 'simple'
  | 'radio-image'
  | 'empty';

export const MisionModuleSchema = z.object({
  [NameInputs.MODULO_MISION]: z.string().min(1),
  [NameInputs.MODULO_MISION_INSTRUCCION]: z.string().min(1),
  [NameInputs.MODULO_MISION_DYNAMIC]: z.string().min(0).optional(),
  [NameInputs.MODULO_AUDIENCIA]: z.string().min(0).optional(),
  [NameInputs.MODULO_AUDIENCIA_DYNAMIC]: z.union([
    z.number().min(0),
    z.string().min(1),
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "El archivo no debe superar los 5MB",
    }),
  ]).optional(),
  [NameInputs.MODULO_ICONO]: z.string().min(1),
  [NameInputs.MODULO_PREMIO]: z.string().min(1),
  [NameInputs.MODULO_PREMIO_DYNAMIC]: z.union([z.string().min(1), z.string().min(10)]).optional(),
});

// TODO: agregar un tipo merge para ir concatenando los Schema de otros modulos
export const FilterSchemaPrueba = MisionModuleSchema;
