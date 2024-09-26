
import React from 'react';
import { Input, Select, SelectItem, Spacer } from '@nextui-org/react';
import { FormComponentProps } from '../../../types';

export const PasosForm: React.FC<FormComponentProps> = ({ register, subProperties }) => {
  return (
    <div>
      <Input
        label="Instrucción"
        placeholder={subProperties?.placeholder || 'Ingrese la instrucción'}
        className="max-w-xs"
        {...register('cantidad-pasos-mision-instruccion-pasos-mision')}
      />
      <Spacer y={1} />
      
      {subProperties?.values && (
        <Select
          label="Cantidad de pasos"
          placeholder={subProperties.placeholder || 'Seleccione cantidad de pasos'}
          className="max-w-xs"
          {...register('cantidadPasos', { required: 'Seleccione la cantidad de pasos' })}
        >
          {subProperties.values.map((value) => (
            <SelectItem key={value.id} value={String(value.id)}>
              {value.label}
            </SelectItem>
          ))}
        </Select>
      )}

      {!subProperties?.values && (
        <p className="text-red-500">
          No hay información de pasos disponible.
        </p>
      )}
      
    </div>
  );
};

