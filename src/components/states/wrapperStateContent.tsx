import { ErrorCard } from '@/components';

type WrapperStateContentProps = {
  isError: boolean;
  errorMessage: string;
  refetch: () => void;
  isEmpty: boolean;
  emptyMessage: string;
};

export const WrapperStateContent = ({
  isError,
  errorMessage,
  refetch,
  isEmpty,
  emptyMessage,
}: WrapperStateContentProps) => {
  if (isError) {
    return <ErrorCard errorMessage={errorMessage} onRetry={refetch} />;
  }

  if (isEmpty) {
    return <p>{emptyMessage}</p>;
  }

  return null;
};
