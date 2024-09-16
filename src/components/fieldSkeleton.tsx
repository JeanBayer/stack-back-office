import { Skeleton } from '@nextui-org/react';

const Input = () => (
  <Skeleton className="w-full rounded-lg h-14">
    <div className="h-full w-full rounded-lg  bg-default-200"></div>
  </Skeleton>
);

const Button = () => (
  <Skeleton className="w-20 rounded-lg h-10">
    <div className="h-full w-full rounded-lg  bg-default-200"></div>
  </Skeleton>
);

const Image = () => (
  <Skeleton className="w-[200px] rounded-lg h-[113px]">
    <div className="h-full w-full rounded-lg  bg-default-200"></div>
  </Skeleton>
);

export const FieldSkeleton = {
  Input,
  Button,
  Image,
};
