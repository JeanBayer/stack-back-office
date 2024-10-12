import { Input } from '@nextui-org/react';
import { FormComponentProps } from '@/types';

export const SimpleForm = ({ register }: FormComponentProps) => (
  <Input
    label="Simple Field"
    placeholder="Enter some value"
    {...register('simple')}
  />
);

