import { FormComponentProps } from '@/types';
import { Select, SelectItem } from '@nextui-org/react';

export const PasosForm = ({ register, option }: FormComponentProps) => {
  if (!option || !option?.properties?.id) return null;
  const { id, placeholder, values } = option.properties;
  if (typeof values === 'string') return null;

  return (
    <div>
      <Select
        label="Selecciona"
        placeholder={placeholder}
        items={values}
        {...register(id)}
      >
        {(pasos: { id: string; label: string }) => <SelectItem key={pasos.id}>{pasos.label}</SelectItem>}
      </Select>
    </div>
  );
};
