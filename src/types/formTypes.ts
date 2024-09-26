import { UseFormRegister } from 'react-hook-form';
import { Filter, Status } from '@/types';

export interface FormFilterProps {
  filter?: Filter;
  status: Status[];
  onSubmit: (updatedPost: Filter) => void;
  isDisabledButton?: boolean;
  isSubmitting?: boolean;
}

export interface Option {
  label: string;
  id: string;
  tipo: string;
  properties?: {
    message: string;
    placeholder: string;
    tipo?: {
      id: string;
      placeholder?: string;
      values?: Array<{ id: number; label: string }>;
    };
  };
}

export interface FormComponentProps {
  register: UseFormRegister<Filter>;
  subProperties?: {
    id: string;
    placeholder?: string;
    values?: Array<{ id: number; label: string }>;
  };
}
