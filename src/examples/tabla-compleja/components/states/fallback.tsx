type FallbackProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  fallbackLoading?: React.ReactNode;
  fallbackError?: React.ReactNode;
  fallbackEmpty?: React.ReactNode;
  isChildrenEnabled?: boolean;
};

export const Fallback = ({
  children,
  isLoading = false,
  isError = false,
  isEmpty = false,
  fallbackLoading = null,
  fallbackError = null,
  fallbackEmpty = null,
  isChildrenEnabled = true,
}: FallbackProps) => {
  if (isLoading) return fallbackLoading;
  if (isError) return fallbackError;
  if (isEmpty) return fallbackEmpty;
  if (!isChildrenEnabled) return fallbackLoading;
  return children;
};
