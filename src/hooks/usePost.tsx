import { PostService } from '@/services';
import { useStore } from '@/store';
import { Post, PostResponse } from '@/types';
import { Constants } from '@/utils';
import { keepPreviousData, QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { toast } from 'sonner';

const rollbackOptimisticUpdate = (
  queryClient: QueryClient,
  queryKey: readonly unknown[],
  context: { previousData: PostResponse | null | undefined }
) => {
  if (context?.previousData) {
    queryClient.setQueryData(queryKey, context.previousData);
  } else {
    handleError('Rollback fallido: No se encontró previousData en el contexto.');
  }
};

// Función auxiliar para manejar errores
const handleError = (message: string): void => {
  console.error(message);
  toast.error(message);
};

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
    mutationFn: (post: Omit<Post, 'id'>) => PostService.createPost(post),
    onSuccess: () => {
      toast.success('Post creado correctamente');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/posts');
    },
    onError: () => handleError('Error al crear el post'),
  });

  // Actualizar un post existente con renderizado optimista
  const postUpdate = useMutation({
    mutationFn: (post: Partial<Post>) => PostService.updatePost(post),
    onMutate: async (updatedPost) => {
      if (selectedPostId) {
        const previousPost = queryClient.getQueryData<PostResponse>(['post', selectedPostId]);
        queryClient.setQueryData(['post', selectedPostId], {
          ...previousPost,
          ...updatedPost,
        });
        return { previousData: previousPost };
      }
      return { previousData: null }; // Aseguramos que el contexto tenga un valor
    },
    onError: (__err, __updatedPost, context) => {
      if (context?.previousData) {
        rollbackOptimisticUpdate(queryClient, ['post', selectedPostId], context);
      }
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
    mutationFn: (postId: string) => PostService.deletePost(postId),
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Captura el estado anterior
      const previousPosts = queryClient.getQueryData<PostResponse>(['posts']);
      if (previousPosts) {
        // Filtra el post eliminado optimistamente
        queryClient.setQueryData(['posts'], {
          ...previousPosts,
          items: previousPosts.items.filter((post) => post.id !== postId),
        });
      }

      return { previousData: previousPosts };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        rollbackOptimisticUpdate(queryClient, ['posts'], context);
      } else {
        handleError('Error en la eliminación: No se pudo realizar el rollback.');
      }
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