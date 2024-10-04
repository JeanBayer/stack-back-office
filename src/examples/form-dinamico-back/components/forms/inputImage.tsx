import { Label } from '@form-dinamico-back/components';
import { useHandleImageFile } from '@form-dinamico-back/hooks';
import { type ImageInput } from '@form-dinamico-back/types';
import { Image, Input } from '@nextui-org/react';
import { useMemo } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

type InputImageProps = {
  label: string;
  name: string;
  image: ImageInput;
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
          console.log('e', e);
          handleUploadedFile(e);
        },
      }),
    [name, register, handleUploadedFile],
  );

  return (
    <>
      <Label
        label={label}
        htmlFor={`file-${name}`}
        value="Image Selected"
        isExpand={!!previewImagenURL}
      >
        <Input
          label={label}
          type="file"
          id={`file-${name}`}
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
      </Label>
      {previewImagenURL && (
        <Image
          src={previewImagenURL || ''}
          alt={image.alt}
          isBlurred
          width={image.width}
          height={image.height}
          onClick={() => {
            hiddenInputRef?.current?.click();
          }}
          style={{ cursor: 'pointer' }}
          className={image?.className}
        />
      )}
    </>
  );
};
