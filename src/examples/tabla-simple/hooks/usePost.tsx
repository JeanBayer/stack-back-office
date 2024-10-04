import { PostService } from '@tabla-simple/services';
import { PostResponse } from '@tabla-simple/types';
import { Constants, QueryClientUtil } from '@tabla-simple/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const usePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Eliminar un post con renderizado optimista
  const postDelete = useMutation({
    mutationFn: async (postId: string) => {
      toast.info('Eliminando post...');
      return await PostService.deletePost(postId);
    },
    onMutate: async (postId: string) => {
      const previousData =
        await QueryClientUtil.updateOptimisticData<PostResponse>(
          queryClient,
          [Constants.KEYS.POSTS],
          (data) => ({
            ...data,
            items: data.items.filter((post) => post.id !== postId),
          }),
        );

      return { previousData };
    },
    onError: (_, __, context) => {
      QueryClientUtil.rollbackOptimisticUpdate(
        queryClient,
        [Constants.KEYS.POSTS],
        context,
      );
    },

    onSuccess: () => {
      toast.success('Post eliminado correctamente');
      queryClient.invalidateQueries({ queryKey: [Constants.KEYS.POSTS] });
      navigate({
        pathname: Constants.ROUTES.POSTS,
        search: new URLSearchParams(window.location.search).toString(),
      });
    },
  });

  return {
    postDelete,
  };
};
