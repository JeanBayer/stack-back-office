import { PostService } from '@tabla-simple/services';
import { PostResponse } from '@tabla-simple/types';
import { QueryClientUtil } from '@tabla-simple/utils';
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
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Captura el estado anterior
      const previousPosts = QueryClientUtil.getQueryData<PostResponse>(
        queryClient,
        ['posts'],
      );
      if (previousPosts) {
        // Filtra el post eliminado optimistamente
        const data = {
          ...previousPosts,
          items: previousPosts.items.filter((post) => post.id !== postId),
        };
        QueryClientUtil.setQueryData(queryClient, ['posts'], data);
      }

      return { previousData: previousPosts };
    },
    onError: (_, __, context) => {
      QueryClientUtil.rollbackOptimisticUpdate(queryClient, ['posts'], context);
    },

    onSuccess: () => {
      toast.success('Post eliminado correctamente');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/posts');
    },
  });

  return {
    postDelete,
  };
};
