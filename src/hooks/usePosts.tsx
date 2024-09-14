import { PostService } from '@/services';
import { useStore } from '@/store';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

export const usePosts = () => {
  const { page, perPage } = useStore(
    useShallow((state) => ({
      page: state.page,
      perPage: state.perPage,
    })),
  );

  const postsQuery = useQuery({
    queryKey: ['posts', page, perPage],
    queryFn: () => PostService.getPosts({ page, perPage }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const maxPages = postsQuery.data?.pages || 1;

  const haveNextPage = postsQuery.data?.next ? true : false;
  const havePrevPage = postsQuery.data?.prev ? true : false;

  return {
    postsQuery: {
      isPending: postsQuery.isPending,
      isError: postsQuery.isError,
      error: postsQuery.error,
      data: postsQuery.data?.data,
      isFetching: postsQuery.isFetching,
      isPlaceholderData: postsQuery.isPlaceholderData,
      maxPages,
      haveNextPage,
      havePrevPage,
      refetch: postsQuery.refetch,
    },
  };
};
