import { DynamicId, FieldsType, FilterPrueba, Status } from '@/types';
import { UseFormRegister } from 'react-hook-form';

export interface FormFilterProps {
  filter?: FilterPrueba;
  status: Status[];
  onSubmit: (updatedPost: FilterPrueba) => void;
  isDisabledButton?: boolean;
  isSubmitting?: boolean;
}

export interface Option {
  label: string;
  id: DynamicId;
  tipo: FieldsType;
  properties?: {
    id?: DynamicId;
    placeholder?: string;
    message?: string;
    values?: Array<{ id: string; label: string }>;
  };
}

export interface FormComponentProps {
  register: UseFormRegister<FilterPrueba>;
  option?: Option;
}
