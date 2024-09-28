import { useState, useEffect, useCallback } from 'react';
import { FormComponentProps } from '@/types';
import { Input } from '@nextui-org/react';

export const CSVForm = ({ register, option }: FormComponentProps) => {
  const [csvContent, setCsvContent] = useState('');

  const { placeholder = '', id = '' } = option?.properties || {};

  useEffect(() => {
    if (id && csvContent) {
      register(id, { value: csvContent });
    }
  }, [csvContent, id, register]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) setCsvContent(content.trim());
      };
      reader.onerror = () => {
        console.error('Error  bb');
      };
      reader.readAsText(file);
    }
  }, []);

  return (
    <Input
      type="file"
      placeholder={placeholder}
      className="max-w-xs"
      accept=".csv"
      onChange={handleFileChange}
    />
  );
};
