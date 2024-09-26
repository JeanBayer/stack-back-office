import { Input } from '@nextui-org/react';
import { FormComponentProps } from '@/types';

export const MontoForm = ({ register, subProperties }: FormComponentProps) => (
  <Input
    label="Monto"
    placeholder={subProperties?.placeholder || 'Enter monto'}
    className="max-w-xs"
    {...register('monto-mision-instruccion-monto-mision')}
  />
);