import { useRef, useEffect } from 'react';
import { Input } from '@nextui-org/react';
import { FaFileCsv } from 'react-icons/fa';
import { UseFormRegister } from 'react-hook-form';
import { useFileUpload } from '../../hooks';
import { useStore } from '../../store';

type CSVFormProps = {
  register: UseFormRegister<File>;
  option: { properties: { placeholder?: string; id: string } };
  csv?: string;
};


export const CSVForm = ({ register, option }: CSVFormProps) => {
  const csv = useStore((state) => state.csvUrl);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const { placeholder = '', id } = option?.properties || {};
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const { fileName: previewFileName, error, handleFileChange } = useFileUpload(MAX_FILE_SIZE);
  const { ref: registerRef, onChange: registerOnChange, ...registerProps } = register(id as keyof File);

  useEffect(() => {
    return () => {
      hiddenInputRef.current = null;
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
    registerOnChange({
      target: {
        name: id,
        value: e.target.files?.[0] || null,
      },
    });
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept=".csv"
        {...registerProps}
        ref={(e) => {
          registerRef(e);
          hiddenInputRef.current = e;
        }}
        onChange={handleInputChange}
        className="hidden"
      />

      <div
        className="p-4 border border-dashed rounded-lg cursor-pointer transition-all hover:bg-gray-100"
        onClick={() => hiddenInputRef.current?.click()}
      >
        <p className="text-gray-400">
          {previewFileName ? `${previewFileName}` : placeholder}
        </p>
      </div>
      {!previewFileName && csv && (
        <div className="flex items-center space-x-2 mt-2">
          <FaFileCsv className="text-green-500" />
          <a
            href={csv}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 underline hover:text-gray-900"
          >
            View
          </a>
        </div>
      )}
      {error && (
        <div role="alert" aria-live="assertive" className="text-red-500 mt-2">
          {error}
        </div>
      )}
    </div>
  );
};
