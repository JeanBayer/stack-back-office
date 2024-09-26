import { FormComponentProps } from '@/types';
import { Select, SelectItem } from '@nextui-org/react';

export const PasosForm = ({ register, option }: FormComponentProps) => {
  if (!option || !option?.properties?.id) return null;

  const { id, placeholder, values } = option.properties;

  return (
    <div>
      <Select
        label="Selecciona"
        placeholder={placeholder}
        className="max-w-xs"
        items={values}
        {...register(id)}
      >
        {(pasos) => <SelectItem key={pasos.id}>{pasos.label}</SelectItem>}
      </Select>
    </div>
  );
};
