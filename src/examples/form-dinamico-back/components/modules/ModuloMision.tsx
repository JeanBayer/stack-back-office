import { Card, CardBody, CardHeader, Input, Select, SelectItem, Spacer } from '@nextui-org/react';
import { FormFactory } from '../forms/FormFactory';
import { NameInputs } from '@/utils';
import { findOption } from '../../utils/';
import { optionsModuloMision } from '../../data/dummy';
import { FieldErrors, FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Generic } from '@/types';

type ModuloMisionProps = {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>
  errors: FieldErrors<Generic>
}

export const ModuloMision = ({ register, watch, errors }: ModuloMisionProps) => {
  const optionModuloMision = watch(NameInputs.MODULO_MISION);
  return (
    <Card className="max-w-[420px]">
      <CardHeader>
        <label>Misión</label>
      </CardHeader>
      <CardBody>
        <Input
          label="Titulo"
          placeholder="Titulo: Instrucción de la misión"
          isInvalid={!!errors?.[NameInputs.MODULO_MISION_INSTRUCCION]}
          errorMessage={errors?.[NameInputs.MODULO_MISION_INSTRUCCION]?.message}
          {...register(NameInputs.MODULO_MISION_INSTRUCCION)}
        />
        <Spacer y={1} />
        <Select
          label="Selecciona"
          placeholder="Tipo de misión"
          items={optionsModuloMision}
          isInvalid={!!errors?.[NameInputs.MODULO_MISION]}
          errorMessage={errors?.[NameInputs.MODULO_MISION]?.message}
          {...register(NameInputs.MODULO_MISION)}
        >
          {(option: { id: string; label: string }) => (
            <SelectItem key={option.id}>
              {option.label}
            </SelectItem>
          )}
        </Select>
        <Spacer y={1} />
        <FormFactory 
          register={register} 
          option={findOption(optionsModuloMision, optionModuloMision)} 
        />
      </CardBody>
    </Card>
  );
};
