import { Input } from '@nextui-org/react';
import { UseFormRegister } from 'react-hook-form';
import { Filter } from '@/types';

export function CantidadPasosInput({ register }: { register: UseFormRegister<Filter> }) {
  return (
    <Input
      label="Cantidad de pasos"
      placeholder="Ingrese la cantidad de pasos"
      className="max-w-xs"
      {...register('cantidadPasos')}
    />
  );
}
