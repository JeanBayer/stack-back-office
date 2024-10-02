import { PostService } from '@form-dinamico-estatico/services';
import { Constants } from '@form-dinamico-estatico/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useStatus = () => {
  const statusQuery = useQuery({
    queryKey: ['status'],
    queryFn: PostService.getStatus,
    placeholderData: keepPreviousData,
    staleTime: Constants.CACHE_TIME_GET_LIST_STATUS,
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
