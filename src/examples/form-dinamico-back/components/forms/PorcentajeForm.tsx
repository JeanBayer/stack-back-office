import { FormComponentProps } from '@/types';
import { Input } from '@nextui-org/react';
import { useState } from 'react';

export const PorcentajeForm = ({ register, option }: FormComponentProps) => {
  const [messageModified, setMessageModified] = useState<string | undefined>(
    option?.properties?.message,
  );
  if (!option || !option?.properties?.id) return null;
  const { placeholder, id, message } = option.properties;

  function replaceText(text: string) {
    if (!message) return undefined;
    if (!text) return message;
    return message.replace('[XX]', text);
  }

  return (
    <>
      <Input
        label="Porcentaje"
        placeholder={placeholder}
        endContent="%"
        {...register(id, {
          onChange: (e) => {
            const message = replaceText(e.target.value);
            setMessageModified(message);
          },
        })}
      />
      <p className="text-xs text-gray-500">{messageModified}</p>
    </>
  );
};
