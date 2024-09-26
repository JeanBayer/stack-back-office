import { FormComponentProps, Option } from '@/types';
import {FormRegistry} from './FormRegistry';

interface FactoryProps {
  register: FormComponentProps['register'];
  option: Option | undefined;
}

export const FormFactory = ({ register, option }: FactoryProps) => {
  if (!option) return null;

  const FormComponent = FormRegistry[option.tipo];

  if (!FormComponent) return null;

  return (
    <FormComponent
      register={register}
      subProperties={option.properties?.tipo}
    />
  );
};
