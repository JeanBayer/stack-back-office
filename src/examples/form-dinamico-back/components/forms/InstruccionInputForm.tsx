import { Input } from '@nextui-org/react';
import { FormComponentProps } from '@/types';

export const InstruccionInputForm = ({ register }: FormComponentProps) => (
  <div>
    <Input
      type="date"
      label="Fecha de Inicio"
      placeholder="Seleccionar fecha"
      {...register('instruccion-input-instruccion')}
    />
  </div>
);
