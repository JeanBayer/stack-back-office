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
import { optionsModuloAudiencia, optionsModuloMision } from './dummy';

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
  const optionModuloAudiencia = watch(NameInputs.MODULO_AUDIENCIA);

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
          {(optionModuloMision) => (
            <SelectItem key={optionModuloMision.id}>
              {optionModuloMision.label}
            </SelectItem>
          )}
        </Select>
        <Spacer y={1} />
        <FormFactory
          register={register}
          option={findOption(optionsModuloMision, optionModuloMision)}
        />
        {/*  MODULO MISION */}

        <Spacer y={3} />

        {/*  MODULO AUDIENCIA */}
        <Select
          label="Selecciona"
          placeholder="Audiencia"
          className="max-w-xs"
          items={optionsModuloAudiencia}
          isInvalid={!!errors?.[NameInputs.MODULO_AUDIENCIA]}
          errorMessage={errors?.[NameInputs.MODULO_AUDIENCIA]?.message}
          {...register(NameInputs.MODULO_AUDIENCIA)}
        >
          {(optionModuloAudiencia) => (
            <SelectItem key={optionModuloAudiencia.id}>
              {optionModuloAudiencia.label}
            </SelectItem>
          )}
        </Select>
        <Spacer y={1} />
        <FormFactory
          register={register}
          option={findOption(optionsModuloAudiencia, optionModuloAudiencia)}
        />
        {/*  MODULO AUDIENCIA */}

        <Spacer y={3} />

        <Button type="submit" color="primary" isDisabled={disabledButton}>
          {isSubmitting ? <Spinner size="sm" color="secondary" /> : 'Search'}
        </Button>
      </form>
    </div>
  );
};
