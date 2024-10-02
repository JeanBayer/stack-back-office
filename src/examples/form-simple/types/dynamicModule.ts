import { NameInputs } from '@form-simple/utils';
import { z } from 'zod';

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
  [NameInputs.MODULO_MISION_DYNAMIC]: z
    .union([z.string().min(1), z.string().min(10)])
    .optional(),
  [NameInputs.MODULO_AUDIENCIA]: z.string().min(1),
  [NameInputs.MODULO_AUDIENCIA_DYNAMIC]: z
    .union([z.string().min(1), z.string().min(10)])
    .optional(),
  [NameInputs.MODULO_ICONO]: z.string().min(1),
  [NameInputs.MODULO_PREMIO]: z.string().min(1),
  [NameInputs.MODULO_PREMIO_DYNAMIC]: z
    .union([z.string().min(1), z.string().min(10)])
    .optional(),
});

// TODO: agregar un tipo merge para ir concatenando los Schema de otros modulos
export const FilterSchemaPrueba = MisionModuleSchema;
