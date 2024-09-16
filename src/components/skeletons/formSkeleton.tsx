import { Spacer } from '@nextui-org/react';
import { FieldSkeleton } from './fieldSkeleton';

export const FormSkeleton = () => {
  return (
    <div>
      <FieldSkeleton.Input />
      <Spacer y={1} />
      <FieldSkeleton.Input />
      <Spacer y={1} />
      <FieldSkeleton.Input />
      <Spacer y={1} />
      <FieldSkeleton.Input />
      <Spacer y={1} />
      <FieldSkeleton.Input />
      <Spacer y={1} />
      <FieldSkeleton.Image />
      <Spacer y={1} />
      <FieldSkeleton.Button />
    </div>
  );
};
