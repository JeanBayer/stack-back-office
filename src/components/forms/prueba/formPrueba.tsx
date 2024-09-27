import { FilterSchemaPrueba, FormFilterProps, Option } from '@/types';
import { NameInputs } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
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
  optionsModuloPremio,
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
  const optionModuloPremio = watch(NameInputs.MODULO_PREMIO);
  const selectedOptionMOduloIcono = findOption(
    optionsModuloIcono,
    optionModuloIcono,
  );

  return (
    <div className="m-0 mx-auto w-fit p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900 w-fit">
        {/*  MODULO MISION */}
        <Card className="max-w-[420px]">
          <CardHeader>
            <label>Misión</label>
          </CardHeader>
          <CardBody>
            <Input
              label="Titulo"
              placeholder="Titulo: Instrucción de la misión"
              className="max-w-xs"
              isInvalid={!!errors?.[NameInputs.MODULO_MISION_INSTRUCCION]}
              errorMessage={
                errors?.[NameInputs.MODULO_MISION_INSTRUCCION]?.message
              }
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
          </CardBody>
        </Card>
        {/*  MODULO MISION */}

        <Spacer y={3} />

        {/*  MODULO AUDIENCIA */}
        <Card className="max-w-[420px]">
          <CardHeader>
            <label>Seleccionar audiencia</label>
          </CardHeader>
          <CardBody>
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
          </CardBody>
        </Card>

        {/*  MODULO AUDIENCIA */}
        <Spacer y={3} />

        {/*  MODULO ICONO */}
        <Card className="max-w-[420px]">
          <CardHeader>
            <label>Selecciona un ícono para acompañar la misión</label>
          </CardHeader>
          <CardBody>
            <Controller
              name={NameInputs.MODULO_ICONO}
              control={control}
              render={({ field }) => (
                <div>
                  <RadioGroup
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
                            'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
                            'data-[selected=true]:border-blue-600 data-[selected=true]:bg-blue-100',
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
          </CardBody>
        </Card>

        {/*  MODULO ICONO */}

        <Spacer y={3} />

        {/*  MODULO PREMIO */}
        <Card className="max-w-[420px]">
          <CardHeader>
            <label>Premio</label>
          </CardHeader>
          <CardBody>
            <Select
              label="Selecciona"
              placeholder="Tipo de premio"
              className="max-w-xs"
              items={optionsModuloPremio}
              isInvalid={!!errors?.[NameInputs.MODULO_PREMIO]}
              errorMessage={errors?.[NameInputs.MODULO_PREMIO]?.message}
              {...register(NameInputs.MODULO_PREMIO)}
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
              option={findOption(optionsModuloPremio, optionModuloPremio)}
            />
          </CardBody>
        </Card>

        {/*  MODULO PREMIO */}

        <Spacer y={3} />

        <Button type="submit" color="primary" isDisabled={disabledButton}>
          {isSubmitting ? <Spinner size="sm" color="secondary" /> : 'Search'}
        </Button>
      </form>
    </div>
  );
};
