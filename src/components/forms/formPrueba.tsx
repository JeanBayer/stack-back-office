import { Filter, FilterSchema, Status } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spacer,
  Spinner,
} from '@nextui-org/react';
import { useForm, UseFormRegister } from 'react-hook-form';

interface FormFilterProps {
  filter?: Filter;
  status: Status[];
  onSubmit: (updatedPost: Filter) => void;
  isDisabledButton?: boolean;
  isSubmitting?: boolean;
}

type Props = {
  register: UseFormRegister<Filter>;
  id: keyof Filter;
};
const Monto = ({ register, id }: Props) => {
  return (
    <Input
      label="Monto"
      placeholder="Search by monto"
      className="max-w-xs"
      {...register(id)}
    />
  );
};

const PercentageInput = ({ register, id }: Props) => {
  return (
    <Input
      type="date"
      label="Monto"
      placeholder="Search by monto"
      className="max-w-xs"
      {...register(id)}
    />
  );
};

interface Option {
  label: string;
  id: string;
  tipo: string;
  properties: {
    message: string;
    placeholder: string;
    tipo: {
      id:
        | 'monto-mision-instruccion-monto-mision'
        | 'instruccion-input-instruccion';
      placeholder: string;
    };
  };
}

export const Factory = ({
  register,
  tipo,
  option,
}: {
  register: UseFormRegister<Filter>;
  tipo: string;
  option: Option | undefined;
}) => {
  console.log('option', option);
  // const DICT: { [key: string]: JSX.Element } = {
  //   monto: <Monto register={register} />,
  // };
  if (!tipo) return null;
  if (!option) return null;

  if (option.tipo === 'instruccion-monto') {
    const subProperties = option.properties.tipo;

    return <Monto register={register} id={subProperties.id} />;
  }

  if (option.tipo === 'instruccion-input') {
    const subProperties = option.properties.tipo;

    return <PercentageInput register={register} id={subProperties.id} />;
  }

  // if (!DICT[tipo]) return null;

  // return DICT[tipo];
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

export const FormPrueba = ({
  filter,
  status,
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
    mode: 'all', // muestre los errores en onchange, blur y submit
    criteriaMode: 'all', // muestre todos los inputs con error
    defaultValues: filter,
  });

  const disabledButton = isDisabledButton || Object.keys(errors).length > 0;

  const optionEstado = watch('estado');
  console.log('optionEstado', optionEstado);

  const calculateOption = (optionIdSeleccionado: string, options: Option[]) => {
    const optionEncontrado = options.find(
      (option) => option.id === optionIdSeleccionado,
    );
    return optionEncontrado;
  };

  const optionModuloMision = calculateOption(optionEstado, optionsModuloMision);
  console.log('optionModuloMision', optionModuloMision);

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
        {/* NUEVO COMPONENTE */}
        {Factory({
          register,
          tipo: optionEstado,
          option: optionModuloMision,
        })}
        {/* NUEVO COMPONENTE */}

        <Spacer y={1} />
        <Input
          label="Title"
          placeholder="Search by title"
          className="max-w-xs"
          {...register('title')}
          isInvalid={!!errors.title}
          errorMessage={errors.title?.message}
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
