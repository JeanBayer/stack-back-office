import { useRef, useState } from 'react';

type UseHandleImageFile = {
  url: string;
};

export const useHandleImageFile = ({ url }: UseHandleImageFile) => {
  const [previewImagenURL, setPreviewImagenURL] = useState<string | null>(
    url || null,
  );
  const hiddenInputRef = useRef<HTMLInputElement | null>();

  const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const urlImage = URL.createObjectURL(file);

    setPreviewImagenURL(urlImage);
  };

  return { previewImagenURL, hiddenInputRef, handleUploadedFile };
};
