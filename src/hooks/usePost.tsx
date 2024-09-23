// usePost.ts
import { PostService } from '@/services';
import { useStore } from '@/store';
import { Post } from '@/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useGenericMutation } from '@/hooks/useFormMutations';

const POST_QUERY_KEY = (id: string | undefined) => ['post', id]; // Siempre retorna un array
const POSTS_QUERY_KEY: readonly unknown[] = ['posts']; // Es un array readonly

// Hook principal para manejar los posts
export const usePost = () => {
  const { selectedPostId } = useStore(state => ({ selectedPostId: state.selectedPostId ?? undefined }));
  const navigate = useNavigate();

  // Consulta para obtener el post
  const postQuery: UseQueryResult<Post, Error> = useQuery({
    queryKey: POST_QUERY_KEY(selectedPostId),
    queryFn: (): Promise<Post> => {
      if (!selectedPostId) return Promise.reject(new Error('No post selected'));
      return PostService.getPostById(selectedPostId);
    },
    enabled: !!selectedPostId,
  });

  // Crear un nuevo post
  const postCreate = useGenericMutation(navigate, {
    mutationKey: ['post', 'create'],
    mutationFn: async (post: Omit<Post, 'id'>) => PostService.createPost(post),
    successMessage: 'Post creado correctamente',
    invalidateQueries: [POSTS_QUERY_KEY],
    redirectTo: '/posts',
  });

  // Actualizar un post existente
  const postUpdate = useGenericMutation(navigate, {
    mutationKey: POST_QUERY_KEY(selectedPostId),
    mutationFn: async (post: Partial<Post>) => PostService.updatePost(post),
    successMessage: 'Post actualizado correctamente',
    invalidateQueries: [POST_QUERY_KEY(selectedPostId), POSTS_QUERY_KEY],
    redirectTo: '/posts',
  });

  // Eliminar un post existente
  const postDelete = useGenericMutation(navigate, {
    mutationKey: ['post', 'delete'],
    mutationFn: async (postId: string) => PostService.deletePost(postId),
    successMessage: 'Post eliminado correctamente',
    invalidateQueries: [POSTS_QUERY_KEY],
    redirectTo: '/posts',
  });

  return {
    postQuery,
    postCreate,
    postUpdate,
    postDelete,
  };
};
