import { Card, CardBody, CardHeader, Select, SelectItem, Spacer } from '@nextui-org/react';
import { NameInputs } from '@/utils';
import { findOption } from '../../utils/';
import { FormFactory } from '../forms/FormFactory';
import { optionsModuloAudiencia } from '../../data/dummy';
import { FieldErrors, FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Generic } from '@/types';

type ModuloAudienciaProps = {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>
  errors: FieldErrors<Generic>;
}

export const ModuloAudiencia = ({ register, watch, errors }: ModuloAudienciaProps) => {
  const optionModuloAudiencia = watch(NameInputs.MODULO_AUDIENCIA);

  return (
    <Card className="max-w-[420px]">
      <CardHeader>
        <label>Seleccionar audiencia</label>
      </CardHeader>
      
      <CardBody>
        <Select
          label="Selecciona"
          placeholder="Audiencia"
          items={optionsModuloAudiencia}
          isInvalid={!!errors?.[NameInputs.MODULO_AUDIENCIA]}
          errorMessage={errors?.[NameInputs.MODULO_AUDIENCIA]?.message}
          {...register(NameInputs.MODULO_AUDIENCIA)}
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
          option={findOption(optionsModuloAudiencia, optionModuloAudiencia)}
        />
      </CardBody>
    </Card>
  );
};
