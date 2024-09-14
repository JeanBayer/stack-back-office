type FallbackProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  fallbackLoading?: React.ReactNode;
  fallbackError?: React.ReactNode;
  fallbackEmpty?: React.ReactNode;
};

export const Fallback = ({
  children,
  isLoading = false,
  isError = false,
  isEmpty = false,
  fallbackLoading = null,
  fallbackError = null,
  fallbackEmpty = null,
}: FallbackProps) => {
  if (isLoading) {
    return fallbackLoading;
  }

  if (isError) {
    return fallbackError;
  }

  if (isEmpty) {
    return fallbackEmpty;
  }

  return children;
};
