import { PostService } from '@/services';
import { useStore } from '@/store';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

export const usePosts = () => {
  const { page, perPage, previousPage, changePage } = useStore(
    useShallow((state) => ({
      page: state.page,
      perPage: state.perPage,
      changePage: state.setPage,
      previousPage: state.previousPage,
    })),
  );

  const postsQuery = useQuery({
    queryKey: ['posts', page, perPage],
    queryFn: async () => {
      try {
        const response = await PostService.getPosts({ page, perPage });
        const currentPageAPI = response.pagination.currentPage;
        if (currentPageAPI !== page)
          changePage(response.pagination.currentPage);
        return response;
      } catch (error) {
        toast.error(`Error al cargar los posts de la pagina ${page}`);
        changePage(previousPage);
        throw error;
      }
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const pagination = postsQuery.data?.pagination;

  const maxPages = pagination?.totalPages || 1;
  const currentPage = pagination?.currentPage || 1;

  const haveNextPage = currentPage < maxPages ? true : false;
  const havePrevPage = currentPage > 1 ? true : false;

  return {
    postsQuery: {
      isPending: postsQuery.isPending,
      isError: postsQuery.isError,
      error: postsQuery.error,
      data: postsQuery.data?.items,
      isFetching: postsQuery.isFetching,
      isPlaceholderData: postsQuery.isPlaceholderData,
      maxPages,
      haveNextPage,
      havePrevPage,
      refetch: postsQuery.refetch,
    },
  };
};
