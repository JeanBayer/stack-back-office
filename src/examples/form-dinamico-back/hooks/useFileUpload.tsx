import { useCallback, useState } from "react";

export const useFileUpload = (maxFileSize: number) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > maxFileSize) {
        setError('El archivo es demasiado grande. El tamaño máximo permitido es 5MB.');
        setFileName(null);
        return;
      }

      setFileName(file.name);
      setError(null);
    }
  }, [maxFileSize]);

  return { fileName, error, handleFileChange };
};
