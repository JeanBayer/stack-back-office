import { FilterSchemaPrueba, FormFilterProps, Option } from '@/types';
import { NameInputs } from '@/utils';
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
  const optionModuloMision = watch(NameInputs.MODULO_MISION);

  function findOption(listOptions: Option[], optionModuloMision: string) {
    return listOptions.find((option) => option.id === optionModuloMision);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900">
        {/*  MODULO MISION */}
        <Input
          label="Titulo"
          placeholder="Titulo: Instrucción de la misión"
          className="max-w-xs"
          isInvalid={!!errors?.[NameInputs.MODULO_MISION_INSTRUCCION]}
          errorMessage={errors?.[NameInputs.MODULO_MISION_INSTRUCCION]?.message}
          {...register(NameInputs.MODULO_MISION_INSTRUCCION)}
        />
        <Spacer y={1} />
        <Select
          label="Selecciona"
          placeholder="Tipo de misión"
          className="max-w-xs"
          items={optionsModuloMision}
          isInvalid={!!errors?.[NameInputs.MODULO_MISION]}
          errorMessage={errors?.[NameInputs.MODULO_MISION]?.message}
          {...register(NameInputs.MODULO_MISION)}
        >
          {(estado) => <SelectItem key={estado.id}>{estado.label}</SelectItem>}
        </Select>
        <Spacer y={1} />
        <FormFactory
          register={register}
          option={findOption(optionsModuloMision, optionModuloMision)}
        />
        {/*  MODULO MISION */}

        <Spacer y={1} />
        <Button type="submit" color="primary" isDisabled={disabledButton}>
          {isSubmitting ? <Spinner size="sm" color="secondary" /> : 'Search'}
        </Button>
      </form>
    </div>
  );
};
