import { PostService } from '@/services';
import { useStore } from '@/store';
import { Post, PostResponse } from '@/types';
import { Constants, ErrorUtil, QueryClientUtil } from '@/utils';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

export const usePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { selectedPostId } = useStore(
    useShallow((state) => ({
      selectedPostId: state.selectedPostId,
    })),
  );

  // Consulta para obtener un post
  const postQuery = useQuery({
    queryKey: ['post', selectedPostId],
    queryFn: async () => {
      if (!selectedPostId) throw new Error('No post selected');
      return await PostService.getPostById(selectedPostId);
    },
    enabled: !!selectedPostId,
    placeholderData: keepPreviousData,
    staleTime: Constants?.CACHE_TIME_GET_POST,
  });

  // Crear un nuevo post
  const postCreate = useMutation({
    mutationFn: async (post: Omit<Post, 'id'>) => {
      toast.info('Creando post...');
      return await PostService.createPost(post);
    },
    onSuccess: () => {
      toast.success('Post creado correctamente');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/posts');
    },
    onError: () => {
      ErrorUtil.handleError(`Error al crear el post`);
    },
  });

  // Actualizar un post existente con renderizado optimista
  const postUpdate = useMutation({
    mutationFn: async (post: Partial<Post>) => {
      toast.info('Actualizando post...');
      return await PostService.updatePost(post);
    },
    onMutate: async (updatedPost) => {
      if (selectedPostId) {
        const previousPost = queryClient.getQueryData<PostResponse>([
          'post',
          selectedPostId,
        ]);
        queryClient.setQueryData(['post', selectedPostId], {
          ...previousPost,
          ...updatedPost,
        });
        return { previousData: previousPost };
      }
      return { previousData: null }; // Aseguramos que el contexto tenga un valor
    },
    onError: (__err, __updatedPost, context) => {
      QueryClientUtil.rollbackOptimisticUpdate(
        queryClient,
        ['post', selectedPostId!],
        context,
      );
      toast.error('Error al actualizar el post');
    },
    onSuccess: () => {
      toast.success('Post actualizado correctamente');
      queryClient.invalidateQueries({ queryKey: ['post', selectedPostId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/posts');
    },
  });

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
    postQuery,
    postCreate,
    postUpdate,
    postDelete,
  };
};
