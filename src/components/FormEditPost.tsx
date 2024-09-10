import { type Post, PostSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Spacer } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

// Componente para editar el post
interface EditPostFormProps {
  post: Post;
  onSubmit: (updatedPost: Post) => void;
}

export const FormEditPost = ({ post, onSubmit }: EditPostFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>({
    resolver: zodResolver(PostSchema),
    mode: 'all', // muestre los errores en onchange, blur y submit
    criteriaMode: 'all', // muestre todos los inputs con error
    defaultValues: post,
  });

  // ejecutar la validación de los campos al cargar el formulario, opcional
  // useEffect(() => {
  //   trigger();
  // }, [trigger]);

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
        <Spacer y={1} />
        <Button
          type="submit"
          color="primary"
          isDisabled={Object.keys(errors).length > 0}
        >
          Save
        </Button>
      </form>
    </div>
  );
};
