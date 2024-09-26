import { Input, Spacer } from '@nextui-org/react';
import { FormComponentProps } from '@/types';
import { CantidadPasosInput } from './CantidadPasosInput';
import { CantidadPasosSelect } from './CantidadPasosSelect'

export const PasosForm = ({ register, subProperties }: FormComponentProps) => {
  const { placeholder = 'Ingrese la instrucción', values = [] } = subProperties || {};

  const cantidadPasosComponents: Record<string, JSX.Element> = {
    select: <CantidadPasosSelect values={values} register={register} />,
    input: <CantidadPasosInput register={register} />,
  };

  const cantidadPasosKey = values.length > 0 ? 'select' : 'input';

  return (
    <div>
      <Input
        label="Instrucción"
        placeholder={placeholder}
        className="max-w-xs"
        {...register('cantidad-pasos-mision-instruccion-pasos-mision')}
      />
      <Spacer y={1} />
      {cantidadPasosComponents[cantidadPasosKey]}
    </div>
  );
};
