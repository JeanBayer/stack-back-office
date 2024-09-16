import { Skeleton, Spacer } from '@nextui-org/react';

export const FormSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-full rounded-lg h-14">
        <div className="h-full w-full rounded-lg  bg-default-200"></div>
      </Skeleton>
      <Spacer y={1} />
      <Skeleton className="w-full rounded-lg h-14">
        <div className="h-full w-full rounded-lg  bg-default-200"></div>
      </Skeleton>
      <Spacer y={1} />
      <Skeleton className="w-full rounded-lg h-14">
        <div className="h-full w-full rounded-lg  bg-default-200"></div>
      </Skeleton>
      <Spacer y={1} />
      <Skeleton className="w-full rounded-lg h-14">
        <div className="h-full w-full rounded-lg  bg-default-200"></div>
      </Skeleton>
      <Spacer y={1} />
      <Skeleton className="w-[200px] rounded-lg h-[113px]">
        <div className="h-full w-full rounded-lg  bg-default-200"></div>
      </Skeleton>
      <Spacer y={1} />
      <Skeleton className="w-20 rounded-lg h-10">
        <div className="h-full w-full rounded-lg  bg-default-200"></div>
      </Skeleton>
    </div>
  );
};
