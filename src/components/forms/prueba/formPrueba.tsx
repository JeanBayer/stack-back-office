import { FilterSchemaPrueba, FormFilterProps, Option } from '@/types';
import { Constants } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spacer,
  Spinner,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { FormFactory } from './FormFactory';
import { optionsModuloMision } from './dummy';

type Generic = Record<string, string>;

export const FormPrueba = ({
  filter,
  onSubmit,
  isDisabledButton = false,
  isSubmitting,
}: FormFilterProps<Generic>) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Generic>({
    resolver: zodResolver(FilterSchemaPrueba),
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: filter,
  });

  const disabledButton = isDisabledButton || Object.keys(errors).length > 0;
  const optionModuloMision = watch(Constants.NAME_INPUTS['modulo-mision']);

  function findOption(listOptions: Option[], optionModuloMision: string) {
    return listOptions.find((option) => option.id === optionModuloMision);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900">
        <Input
          label="Instruccion"
          placeholder="Instruccion"
          className="max-w-xs"
          {...register(Constants.NAME_INPUTS['modulo-mision-instruccion'])}
          isInvalid={
            !!errors?.[Constants.NAME_INPUTS['modulo-mision-instruccion']]
          }
          errorMessage={
            errors?.[Constants.NAME_INPUTS['modulo-mision-instruccion']]
              ?.message
          }
        />
        <Spacer y={1} />

        <Select
          label="State"
          placeholder="Select a State"
          className="max-w-xs"
          items={optionsModuloMision}
          {...register(Constants.NAME_INPUTS['modulo-mision'])}
        >
          {(estado) => <SelectItem key={estado.id}>{estado.label}</SelectItem>}
        </Select>
        {errors?.[Constants.NAME_INPUTS['modulo-mision']] && (
          <p className="text-red-500">
            {errors?.[Constants.NAME_INPUTS['modulo-mision']]?.message}
          </p>
        )}

        <Spacer y={1} />

        <FormFactory
          register={register}
          option={findOption(optionsModuloMision, optionModuloMision)}
        />

        <Spacer y={1} />
        <Button type="submit" color="primary" isDisabled={disabledButton}>
          {isSubmitting ? <Spinner size="sm" color="secondary" /> : 'Search'}
        </Button>
      </form>
    </div>
  );
};
