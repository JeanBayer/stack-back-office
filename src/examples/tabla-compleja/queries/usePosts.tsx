import { PostService } from '@tabla-compleja/services';
import { useStore } from '@tabla-compleja/store';
import { ActionMode } from '@tabla-compleja/types';
import { Constants } from '@tabla-compleja/utils';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

export const usePosts = () => {
  const queryClient = useQueryClient();
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

  const statusMutation = useMutation({
    mutationKey: [Constants.KEYS.POSTS],
    mutationFn: async ({
      postsId,
      status,
    }: {
      postsId: string[];
      status: ActionMode;
    }) => {
      toast.info('Cambiando Posts...');
      return await PostService.changePostStatus(postsId, status);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(
        (error?.response?.data?.error as string) || 'An error occurred',
      );
    },
    onSuccess: () => {
      toast.success('Estados de los posts cambiados correctamente');
      queryClient.invalidateQueries({
        queryKey: [Constants.KEYS.POSTS],
      });
    },
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
    statusMutation,
  };
};
