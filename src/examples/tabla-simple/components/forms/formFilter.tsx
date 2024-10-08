import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spacer,
  Spinner,
} from '@nextui-org/react';
import { Filter, FilterSchema, Status } from '@tabla-simple/types';
import { useForm } from 'react-hook-form';

interface FormFilterProps {
  filter?: Partial<Filter>;
  status: Status[];
  onSubmit: (updatedPost: Filter) => void;
  isDisabledButton?: boolean;
  isSubmitting?: boolean;
}

export const FormFilter = ({
  filter,
  status,
  onSubmit,
  isDisabledButton = false,
  isSubmitting,
}: FormFilterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Filter>({
    resolver: zodResolver(FilterSchema),
    mode: 'all', // muestre los errores en onchange, blur y submit
    criteriaMode: 'all', // muestre todos los inputs con error
    defaultValues: filter,
  });

  const disabledButton =
    isDisabledButton || Object.keys(errors).length > 0 || !isDirty;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900">
        <Select
          items={status}
          label="State"
          placeholder="Select an State"
          className="max-w-xs"
          {...register('estado')}
        >
          {(estado) => <SelectItem key={estado.key}>{estado.label}</SelectItem>}
        </Select>
        <Spacer y={1} />
        <Input
          label="Views"
          type="number"
          placeholder="Search by views"
          className="max-w-xs"
          {...register('views')}
          isInvalid={!!errors.views}
          errorMessage={errors.views?.message}
        />
        <Spacer y={1} />
        <Button type="submit" color="primary" isDisabled={disabledButton}>
          Search
          {isSubmitting && <Spinner size="sm" color="secondary" />}
        </Button>
      </form>
    </div>
  );
};
