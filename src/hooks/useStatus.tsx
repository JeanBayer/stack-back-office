import { PostService } from '@/services';
import { Constants } from '@/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useStatus = () => {
  const statusQuery = useQuery({
    queryKey: ['status'],
    queryFn: PostService.getStatus,
    placeholderData: keepPreviousData,
    staleTime: Constants.CACHE_TIME_GET_POST,
  });

  return {
    statusQuery: {
      isPending: statusQuery.isPending,
      isError: statusQuery.isError,
      isLoading: statusQuery.isLoading,
      error: statusQuery.error,
      data: statusQuery.data,
      isFetching: statusQuery.isFetching,
      isPlaceholderData: statusQuery.isPlaceholderData,
      refetch: statusQuery.refetch,
    },
  };
};
