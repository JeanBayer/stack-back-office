import { Button, Spacer, Spinner } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { ModuloMision, ModuloAudiencia, ModuloIcono, ModuloPremio } from './';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MisionModuleSchema, PostMisione } from '../../types';

type Generic = Record<string, string>;
type Props = {
  post: Generic | PostMisione;
  isDisabledButton?: boolean;
  isSubmitting: boolean;
  onSubmit: (data: Generic) => void
}

export const DynamicModule = ({
  post,
  isDisabledButton = false,
  isSubmitting,
  onSubmit
}: Props) => {
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid } } = useForm<Generic>({
      mode: 'all',
      criteriaMode: 'all',
      defaultValues: Object.fromEntries(Object.entries(post).map(([key, value]) => [key, String(value)])),
      resolver: zodResolver(MisionModuleSchema),
    });

  const [selected, setSelected] = useState<string | null>(post && post["modulo-icono"] ? post["modulo-icono"] : null);

  const disabledButton = isDisabledButton || Object.keys(errors).length > 0 || !isDirty || !isValid;

  return (
    <div className="m-0 mx-auto w-fit p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900 w-fit">
        <ModuloMision register={register} watch={watch} errors={errors} />
        <Spacer y={3} />
        <ModuloAudiencia register={register} watch={watch} errors={errors} csv={post && post['modulo-audiencia-dynamic'] ? String(post['modulo-audiencia-dynamic']) : ''} />
        <Spacer y={3} />
        <ModuloIcono control={control} errors={errors} selected={selected} setSelected={setSelected} />
        <Spacer y={3} />
        <ModuloPremio register={register} watch={watch} errors={errors} />
        <Spacer y={5} />

        <Button type="submit" color="primary" isDisabled={disabledButton} >
          {isSubmitting ? <Spinner size="sm" color="secondary" /> : 'Save'}
        </Button>
      </form>
    </div>
  );
};
