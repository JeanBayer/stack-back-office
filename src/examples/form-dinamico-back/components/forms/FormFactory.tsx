import { FormComponentProps } from '@/types';
import { FormRegistry } from './FormRegistry';

export const FormFactory = ({ register, option, csv }: FormComponentProps) => {
  if (!option) return null;

  const FormComponent = FormRegistry[option.tipo];

  if (!FormComponent) return null;

  return <FormComponent register={register} option={option} csv={csv} />;
};
