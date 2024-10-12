import { Control, FieldErrors, Controller } from 'react-hook-form';
import { Card, CardBody, CardHeader, Image, RadioGroup } from '@nextui-org/react';
import { cn } from '@nextui-org/react';
import { NameInputs } from '@/utils';
import { optionsModuloIcono } from '../../data/dummy';
import { Generic } from '@/types';

type ModuloIconoProps = {
  control: Control<Generic>;
  errors: FieldErrors;
  selected: string | null;
  setSelected: (value: string) => void;
}

export const ModuloIcono = ({ control, errors, selected, setSelected }: ModuloIconoProps) => (
  <Card className="max-w-[420px]">
    <CardHeader>
      <label>Selecciona un ícono para acompañar la misión</label>
    </CardHeader>
    <CardBody>
      <Controller
        name={NameInputs.MODULO_ICONO}
        control={control}
        render={({ field }) => (
          <RadioGroup
            orientation="horizontal"
            isInvalid={!!errors?.[NameInputs.MODULO_ICONO]}
            errorMessage={errors?.[NameInputs.MODULO_ICONO]?.message?.toString()}
            {...field}
            onChange={(event) => {
              const value = event.target.value;
              setSelected(value);
              field.onChange(value);
            }}
            className="border-blue-600"
          >
            {optionsModuloIcono?.map((option) => (
              <div
                key={option.id}
                className={cn(
                  'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
                  'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2',
                  selected === option.id ? 'border-blue-600 bg-blue-100' : 'border-transparent'
                )}
                onClick={() => {
                  setSelected(option.id);
                  field.onChange(option.id);
                }}
              >
                <input
                  type="radio"
                  name="custom-radio"
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => setSelected(option.id)}
                  className="hidden"
                />
                
                <Image
                  src={option.properties?.values as string}
                  width={50}
                  height={50}
                  alt={option.label}
                />
                <span>{option?.label}</span>
              </div>
            ))}
          </RadioGroup>
        )}
      />
    </CardBody>
  </Card>
);
