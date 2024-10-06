import { InputImage } from '@form-simple/components';
import { type Post, PostSchema, Status } from '@form-simple/types';
import { Constants } from '@form-simple/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spacer,
  Spinner,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface formPostProps {
  post?: Post;
  status: Status[];
  onSubmit: (updatedPost: Post) => void;
  isDisabledButton?: boolean;
  isSubmitting?: boolean;
  isDisabledForm?: boolean;
}

export const FormPost = ({
  post,
  status,
  onSubmit,
  isDisabledButton = false,
  isSubmitting,
  isDisabledForm = false,
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
          disabled={isDisabledForm}
        />
        <Spacer y={1} />
        <Input
          type="text"
          label="Author"
          {...register('author')}
          isInvalid={!!errors.author}
          errorMessage={errors.author?.message}
          fullWidth
          disabled={isDisabledForm}
        />
        <Spacer y={1} />
        <Input
          type="number"
          label="Views"
          {...register('views', { valueAsNumber: true })}
          isInvalid={!!errors.views}
          errorMessage={errors.views?.message}
          fullWidth
          disabled={isDisabledForm}
        />
        <Spacer y={1} />
        <Input
          label="Date"
          type="date"
          {...register('date')}
          isInvalid={!!errors.date}
          errorMessage={errors.date?.message}
          fullWidth
          disabled={isDisabledForm}
        />
        <Spacer y={1} />
        <Select
          items={status}
          label="State"
          placeholder="Select an State"
          {...register('estado')}
          isInvalid={!!errors.estado}
          errorMessage={errors.estado?.message}
          fullWidth
          disabled={isDisabledForm}
        >
          {(estado) => (
            <SelectItem key={estado.key} isReadOnly={isDisabledForm}>
              {estado.label}
            </SelectItem>
          )}
        </Select>
        <Spacer y={1} />

        <InputImage
          error={errors.imageUrl}
          label="Post Image"
          name="imageUrl"
          register={register}
          image={{
            url: post?.imageUrl || '',
            alt: 'Image',
            width: 200,
            height: 113,
            className: 'mt-2',
          }}
          disabled={isDisabledForm}
        />
        <Spacer y={1} />
        {isDisabledForm ? (
          <Link
            to={Constants.ROUTES.POSTS_FORM_EDIT.replace(':id', post?.id || '')}
            className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover"
          >
            Edit
          </Link>
        ) : (
          <Button type="submit" color="primary" isDisabled={disabledButton}>
            Save
            {isSubmitting && <Spinner size="sm" color="secondary" />}
          </Button>
        )}
      </form>
    </div>
  );
};
