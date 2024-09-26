import { FormComponentProps } from '@/types';
import { Input } from '@nextui-org/react';

export const InstruccionMonto = ({ register, option }: FormComponentProps) => {
  if (!option || !option?.properties?.id) return null;
  const { placeholder, id } = option.properties;

  return (
    <Input
      label="Monto"
      placeholder={placeholder}
      className="max-w-xs"
      {...register(id)}
    />
  );
};


