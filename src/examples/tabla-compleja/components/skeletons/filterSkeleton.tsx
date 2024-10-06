import { Spacer } from '@nextui-org/react';
import { FieldSkeleton } from '@tabla-compleja/components';

export const FilterSkeleton = () => {
  return (
    <div>
      <FieldSkeleton.Input className="w-[320px]" />
      <Spacer y={1} />
      <FieldSkeleton.Button />
    </div>
  );
};
