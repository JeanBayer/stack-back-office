import { useHandleImageFile } from '@/hooks';
import { Image, Input } from '@nextui-org/react';
import { useMemo } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

type Image = {
  url: string;
  alt: string;
  height: number;
  width: number;
  fallbackSrc?: string;
  className?: string;
};

type InputImageProps = {
  label: string;
  name: string;
  image: Image;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error: FieldError | undefined;
};

export const InputImage = ({
  label,
  name,
  image,
  register,
  error,
}: InputImageProps) => {
  const { previewImagenURL, hiddenInputRef, handleUploadedFile } =
    useHandleImageFile({ url: image.url });

  const { ref: registerRef, ...rest } = useMemo(
    () =>
      register(name, {
        onChange: (e) => {
          handleUploadedFile(e);
        },
      }),
    [name, register, handleUploadedFile],
  );

  return (
    <>
      <Input
        label={label}
        type="file"
        {...rest}
        ref={(e) => {
          registerRef(e);
          hiddenInputRef.current = e;
        }}
        isInvalid={!!error}
        errorMessage={error?.message}
        fullWidth
        className="hidden"
      />
      <Image
        src={previewImagenURL || ''}
        alt={image.alt}
        width={image.width}
        height={image.height}
        fallbackSrc={image.fallbackSrc}
        onClick={() => {
          hiddenInputRef?.current?.click();
        }}
        style={{ cursor: 'pointer' }}
      />
    </>
  );
};
