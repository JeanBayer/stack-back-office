import { Filter } from '@/types';
import { Select, SelectItem } from '@nextui-org/react';
import { UseFormRegister } from 'react-hook-form';

export const CantidadPasosSelect = ({ values, register }: {
  values: Array<{ id: number; label: string }>;
  register: UseFormRegister<Filter>
}) => (
  <Select
    label="Cantidad de pasos"
    placeholder="Seleccione cantidad de pasos"
    className="max-w-xs"
    {...register('cantidadPasos')}
  >
    {values.map(({ id, label }) => (
      <SelectItem key={id} value={String(id)}>
        {label}
      </SelectItem>
    ))}
  </Select>
);
