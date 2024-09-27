import { FilterSchemaPrueba, FormFilterProps, Option } from '@/types';
import { NameInputs } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  cn,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Spacer,
  Spinner,
} from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { FormFactory } from './FormFactory';
import {
  optionsModuloAudiencia,
  optionsModuloIcono,
  optionsModuloMision,
} from './dummy';

type Generic = Record<string, string>;

export const FormPrueba = ({
  filter,
  onSubmit,
  isDisabledButton = false,
  isSubmitting,
}: FormFilterProps<Generic>) => {
  const {
    control,
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

  function findOption(listOptions: Option[], optionModuloMision: string) {
    return listOptions.find((option) => option.id === optionModuloMision);
  }

  const disabledButton = isDisabledButton || Object.keys(errors).length > 0;
  const optionModuloMision = watch(NameInputs.MODULO_MISION);
  const optionModuloAudiencia = watch(NameInputs.MODULO_AUDIENCIA);
  const optionModuloIcono = watch(NameInputs.MODULO_ICONO);
  const selectedOptionMOduloIcono = findOption(
    optionsModuloIcono,
    optionModuloIcono,
  );

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

        <Controller
          name={NameInputs.MODULO_ICONO}
          control={control}
          render={({ field }) => (
            <div>
              <RadioGroup
                label="Selecciona un ícono para acompañar la misión"
                orientation="horizontal"
                isInvalid={!!errors?.[NameInputs.MODULO_ICONO]}
                errorMessage={errors?.[NameInputs.MODULO_ICONO]?.message}
                {...field}
                className="border-blue-600"
              >
                {optionsModuloIcono?.map((option) => (
                  <Radio
                    key={option.id}
                    value={option.id}
                    classNames={{
                      base: cn(
                        'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
                        'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 bg-slate-300 border-blue-600',
                        'data-[selected=true]:border-blue-600',
                      ), // no funciona
                    }}
                  >
                    <Image
                      src={option.properties?.values as string}
                      width={50}
                      height={50}
                    />
                    <p>{option?.label}</p>
                  </Radio>
                ))}
              </RadioGroup>
              <div>
                {selectedOptionMOduloIcono?.properties?.message && (
                  <p>
                    {selectedOptionMOduloIcono?.properties?.placeholder}{' '}
                    {selectedOptionMOduloIcono?.properties?.message}
                  </p>
                )}
              </div>
            </div>
          )}
        />

        <Spacer y={3} />

        <Button type="submit" color="primary" isDisabled={disabledButton}>
          {isSubmitting ? <Spinner size="sm" color="secondary" /> : 'Search'}
        </Button>
      </form>
    </div>
  );
};
