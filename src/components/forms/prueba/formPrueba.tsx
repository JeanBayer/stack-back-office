import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select, SelectItem, Spacer, Spinner } from '@nextui-org/react';
import { Filter, FilterSchema, FormFilterProps } from '@/types';
import { FormFactory } from './FormFactory';
import { optionsModuloMision } from './dummy';

const status = [
  {
    "id": "mlX0AYexSh4NPKZqtE4e",
    "label": "Disponible",
    "key": "disponible"
  },
  {
    "id": "ujV4nR5tQqWGN9nYu3gV",
    "label": "Archivado",
    "key": "archivado"
  },
  {
    "id": "xxxnR5tQqWGN9nYu3gV",
    "label": "Pasos",
    "key": "pasos"
  },
  {
    "id": "aaanR5tQqWGN9nYu3gV",
    "label": "Simple",
    "key": "simple"
  }
]

export const FormPrueba = ({
  filter,
  onSubmit,
  isDisabledButton = false,
  isSubmitting,
}: FormFilterProps) => {
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

  const optionModuloMision = () => optionsModuloMision.find((option) => option.id === optionEstado);



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

        <FormFactory register={register} option={optionModuloMision()} />

        <Spacer y={1} />
        <Button type="submit" color="primary" isDisabled={disabledButton}>
          {isSubmitting ? <Spinner size="sm" color="secondary" /> : 'Search'}
        </Button>
      </form>
    </div>
  );
};

