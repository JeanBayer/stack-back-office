import { Card, CardBody, CardHeader, Select, SelectItem, Spacer } from '@nextui-org/react';
import { NameInputs } from '@/utils';
import { findOption } from '../../utils';
import { FormFactory } from '../forms/FormFactory';
import { optionsModuloPremio } from '../../data/dummy';
import { UseFormRegister, FieldErrors, UseFormWatch, FieldValues } from 'react-hook-form';
import { Generic } from '@/types';

type ModuloPremioProps = {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>
  errors: FieldErrors<Generic>
}

export const ModuloPremio = ({ register, watch, errors }: ModuloPremioProps) => {
  const optionModuloPremio = watch(NameInputs.MODULO_PREMIO);

  return (
    <Card className="max-w-[420px]">
      <CardHeader>
        <label>Premio</label>
      </CardHeader>
      <CardBody>
        <Select
          label="Selecciona"
          placeholder="Tipo de premio"
          items={optionsModuloPremio}
          isInvalid={!!errors?.[NameInputs.MODULO_PREMIO]}
          errorMessage={errors?.[NameInputs.MODULO_PREMIO]?.message}
          {...register(NameInputs.MODULO_PREMIO)}
        >
          {(option: { id: string; label: string }) => (
            <SelectItem key={option.id}>
              {option.label}
            </SelectItem>
          )}
        </Select>
        <Spacer y={1} />
        <FormFactory register={register} option={findOption(optionsModuloPremio, optionModuloPremio)} />
      </CardBody>
    </Card>
  );
};
