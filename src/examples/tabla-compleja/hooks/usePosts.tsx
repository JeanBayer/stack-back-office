import { PostService } from '@tabla-compleja/services';
import { useStore } from '@tabla-compleja/store';
import { Constants } from '@tabla-compleja/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

export const usePosts = () => {
  const { page, perPage, previousPage, changePage, filterPost } = useStore(
    useShallow((state) => ({
      page: state.page,
      perPage: state.perPage,
      changePage: state.setPage,
      previousPage: state.previousPage,
      filterPost: state.filterPost,
    })),
  );

  const postsQuery = useQuery({
    queryKey: ['posts', page, perPage, filterPost],
    queryFn: async () => {
      try {
        const response = await PostService.getPosts({
          page,
          perPage,
          filter: filterPost,
        });
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
    staleTime:  Constants.CACHE_TIME_GET_LIST_POST,
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
