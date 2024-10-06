import { PostService } from '@tabla-simple/services';
import { useStore } from '@tabla-simple/store';
import { Constants } from '@tabla-simple/utils';
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
    queryKey: [Constants.KEYS.POSTS, page, perPage, filterPost],
    queryFn: async () => {
      try {
        const response = await PostService.getPosts({
          page,
          perPage,
          filter: filterPost,
        });
        const currentPageAPI = response.pagination.currentPage;
        if (currentPageAPI !== page) changePage(currentPageAPI);
        return response;
      } catch (error) {
        toast.error(`Error al cargar los posts de la pagina ${page}`);
        changePage(previousPage);
        throw error;
      }
    },
    placeholderData: keepPreviousData,
    staleTime: Constants.CACHE_TIME_GET_LIST_POST,
  });

  const maxPages = postsQuery.data?.pagination?.totalPages || 1;

  return {
    postsQuery: {
      isPending: postsQuery.isPending,
      isError: postsQuery.isError,
      error: postsQuery.error,
      data: postsQuery.data?.items,
      isFetching: postsQuery.isFetching,
      isPlaceholderData: postsQuery.isPlaceholderData,
      maxPages,
      refetch: postsQuery.refetch,
    },
  };
};
