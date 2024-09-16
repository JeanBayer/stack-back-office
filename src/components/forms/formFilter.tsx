import { Filter, FilterSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select, SelectItem, Spacer, Spinner } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

interface FormFilterProps {
  filter?: Filter;
  onSubmit: (updatedPost: Filter) => void;
  isDisabledButton?: boolean;
  isSubmitting?: boolean;
}

const estados = [
  { key: '', label: 'Todos' },
  { key: 'disponible', label: 'Disponible' },
  { key: 'archivado', label: 'Archivado' },
];

export const FormFilter = ({
  filter,
  onSubmit,
  isDisabledButton = false,
  isSubmitting,
}: FormFilterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Filter>({
    resolver: zodResolver(FilterSchema),
    mode: 'all', // muestre los errores en onchange, blur y submit
    criteriaMode: 'all', // muestre todos los inputs con error
    defaultValues: filter,
  });

  const disabledButton = isDisabledButton || Object.keys(errors).length > 0;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900">
        <Select
          items={estados}
          label="State"
          placeholder="Select an State"
          className="max-w-xs"
          {...register('estado')}
        >
          {(estado) => <SelectItem key={estado.key}>{estado.label}</SelectItem>}
        </Select>
        <Spacer y={1} />

        <Button type="submit" color="primary" isDisabled={disabledButton}>
          Search
          {isSubmitting && <Spinner size="sm" color="secondary" />}
        </Button>
      </form>
    </div>
  );
};
