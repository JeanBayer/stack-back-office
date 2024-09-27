import { FormComponentProps } from '@/types';
import { Input } from '@nextui-org/react';

export const CSVForm = ({ register, option }: FormComponentProps) => {
  if (!option || !option?.properties?.id) return null;
  const { placeholder, id } = option.properties;

  return (
    <Input placeholder={placeholder} className="max-w-xs" {...register(id)} />
  );
};
