import { FieldSkeleton } from '@tabla-compleja/components';
import { Spacer } from '@nextui-org/react';

export const FilterSkeleton = () => {
  return (
    <div>
      <FieldSkeleton.Input className="w-[320px]" />
      <Spacer y={1} />
      <FieldSkeleton.Button />
    </div>
  );
};
