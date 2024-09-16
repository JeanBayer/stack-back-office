import { type Post, PostSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Spacer, Spinner } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

interface formPostProps {
  post?: Post;
  onSubmit: (updatedPost: Post) => void;
  isDisabledButton?: boolean;
  isSubmitting?: boolean;
}

export const FormPost = ({
  post,
  onSubmit,
  isDisabledButton = false,
  isSubmitting,
}: formPostProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Post>({
    resolver: zodResolver(PostSchema),
    mode: 'all', // muestre los errores en onchange, blur y submit
    criteriaMode: 'all', // muestre todos los inputs con error
    defaultValues: post,
  });

  const disabledButton =
    isDisabledButton || Object.keys(errors).length > 0 || !isDirty;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900">
        <Input
          label="Title"
          type="text"
          {...register('title')}
          isInvalid={!!errors.title}
          errorMessage={errors.title?.message}
          fullWidth
        />
        <Spacer y={1} />
        <Input
          type="text"
          label="Author"
          {...register('author')}
          isInvalid={!!errors.author}
          errorMessage={errors.author?.message}
          fullWidth
        />
        <Spacer y={1} />
        <Input
          type="number"
          label="Views"
          {...register('views', { valueAsNumber: true })}
          isInvalid={!!errors.views}
          errorMessage={errors.views?.message}
          fullWidth
        />
        <Spacer y={1} />
        <Input
          label="Date"
          type="date"
          {...register('date')}
          isInvalid={!!errors.date}
          errorMessage={errors.date?.message}
          fullWidth
        />
        <Input
          label="Imagen"
          type="file"
          {...register('imagenURL')}
          isInvalid={!!errors.imagenURL}
          errorMessage={errors.imagenURL?.message}
          fullWidth
        />
        <Spacer y={1} />
        <Button type="submit" color="primary" isDisabled={disabledButton}>
          Save
          {isSubmitting && <Spinner size="sm" color="secondary" />}
        </Button>
      </form>
    </div>
  );
};
