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

  const postQuery = useQuery({
    queryKey: ['posts', page, perPage],
    queryFn: () => PostService.getPosts({ page, perPage }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const maxPages = postQuery.data?.pages || 1;

  const haveNextPage = postQuery.data?.next ? true : false;
  const havePrevPage = postQuery.data?.prev ? true : false;

  return {
    postQuery: {
      isPending: postQuery.isPending,
      isError: postQuery.isError,
      error: postQuery.error,
      data: postQuery.data?.data,
      isFetching: postQuery.isFetching,
      isPlaceholderData: postQuery.isPlaceholderData,
      maxPages,
      haveNextPage,
      havePrevPage,
    },
  };
};
