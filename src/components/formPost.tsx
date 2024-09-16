import { type Post, PostSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Image, Input, Spacer, Spinner } from '@nextui-org/react';
import { useRef, useState } from 'react';
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

  const [previewImagenURL, setPreviewImagenURL] = useState<string | null>(
    post?.imageUrl || null,
  );
  const hiddenInputRef = useRef<HTMLInputElement | null>();
  const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const urlImage = URL.createObjectURL(file);

    setPreviewImagenURL(urlImage);
  };

  const { ref: registerRef, ...rest } = register('imageUrl', {
    onChange: (e) => {
      handleUploadedFile(e);
    },
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
          {...rest}
          // onChange={handleUploadedFile}
          ref={(e) => {
            registerRef(e);
            hiddenInputRef.current = e;
          }}
          isInvalid={!!errors.imageUrl}
          errorMessage={errors.imageUrl?.message}
          fullWidth
          className="hidden"
        />
        <Image
          src={previewImagenURL || ''}
          alt="Imagen"
          width={600}
          height={300}
          fallbackSrc="https://via.placeholder.com/300x200"
          onClick={() => {
            hiddenInputRef?.current?.click();
          }}
          style={{ cursor: 'pointer' }}
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
