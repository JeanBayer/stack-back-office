import { FieldsType, Generic, Status } from '@form-dinamico-back/types';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface FormFilterProps<T> {
  filter?: T;
  status: Status[];
  onSubmit: (updatedPost: T) => void;
  isDisabledButton?: boolean;
  isSubmitting?: boolean;
}

export type ExtendedFormFilterProps<T, K> = FormFilterProps<T> & K;

export interface Option {
  label: string;
  id: string;
  tipo: FieldsType;
  properties?: {
    id?: string;
    placeholder?: string;
    message?: string;
    values?: Array<{ id: string; label: string }> | string;
  };
}

export interface FormComponentProps<T extends FieldValues = Generic> {
  register: UseFormRegister<T>;
  option?: Option;
}
