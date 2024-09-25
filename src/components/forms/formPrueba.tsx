import React from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem, Spacer, Spinner } from '@nextui-org/react';
import { Filter, FilterSchema, Status } from '@/types';

interface FormFilterProps {
  filter?: Filter;
  status: Status[];
  onSubmit: (updatedPost: Filter) => void;
  isDisabledButton?: boolean;
  isSubmitting?: boolean;
}

interface Option {
  label: string;
  id: string;
  tipo: string;
  properties: {
    message: string;
    placeholder: string;
    tipo: {
      id: 'monto-mision-instruccion-monto-mision' | 'instruccion-input-instruccion';
      placeholder: string;
    };
  };
}

const Monto = ({ register, id }: { register: UseFormRegister<Filter>; id: keyof Filter }) => (
  <Input
    label="Monto"
    placeholder="Search by monto"
    className="max-w-xs"
    {...register(id)}
  />
);

const PercentageInput = ({ register, id }: { register: UseFormRegister<Filter>; id: keyof Filter }) => (
  <Input
    type="date"
    label="Fecha"
    placeholder="Select date"
    className="max-w-xs"
    {...register(id)}
  />
);

const Factory = ({ register, option }: { register: UseFormRegister<Filter>; option: Option | undefined }) => {
  if (!option) return null;

  const subProperties = option.properties.tipo;
  const componentMap: Record<string, JSX.Element> = {
    'instruccion-monto': <Monto register={register} id={subProperties.id} />,
    'instruccion-input': <PercentageInput register={register} id={subProperties.id} />,
  };

  return componentMap[option.tipo] || null;
};

const optionsModuloMision: Option[] = [
  {
    label: 'Misión con meta de compra (llegar a un monto de compra)',
    id: 'disponible',
    tipo: 'instruccion-monto',
    properties: {
      message: 'title ...',
      placeholder: 'Instrucción',
      tipo: {
        id: 'monto-mision-instruccion-monto-mision',
        placeholder: 'Monto de compra',
      },
    },
  },
  {
    label: 'Misión con meta de compra (llegar a un monto de compra)',
    id: 'archivado',
    tipo: 'instruccion-input',
    properties: {
      message: 'title ...',
      placeholder: 'Instrucción',
      tipo: {
        id: 'instruccion-input-instruccion',
        placeholder: 'Monto de compra',
      },
    },
  },
];

export const FormPrueba: React.FC<FormFilterProps> = ({
  filter,
  status,
  onSubmit,
  isDisabledButton = false,
  isSubmitting,
}) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Filter>({
    resolver: zodResolver(FilterSchema),
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: filter,
  });

  const disabledButton = isDisabledButton || Object.keys(errors).length > 0;

  const optionEstado = watch('estado');

  const optionModuloMision = optionsModuloMision.find((option) => option.id === optionEstado);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900">
        <Select
          label="State"
          placeholder="Select a State"
          className="max-w-xs"
          {...register('estado', { required: 'Seleccione una opción' })}
        >
          {status.map((estado) => (
            <SelectItem key={estado.key} value={estado.key}>
              {estado.label}
            </SelectItem>
          ))}
        </Select>
        {errors.estado && <p className="text-red-500">{errors.estado.message}</p>}

        <Spacer y={1} />
        <Factory register={register} option={optionModuloMision} />
        
        <Spacer y={1} />
        <Input
          label="Title"
          placeholder="Search by title"
          className="max-w-xs"
          {...register('title', { required: 'El título es obligatorio' })}
          isInvalid={!!errors.title}
          errorMessage={errors.title?.message}
        />

        <Spacer y={1} />
        <Button type="submit" color="primary" isDisabled={disabledButton}>
          {isSubmitting ? (
            <Spinner size="sm" color="secondary" />
          ) : (
            'Search'
          )}
        </Button>
      </form>
    </div>
  );
};
