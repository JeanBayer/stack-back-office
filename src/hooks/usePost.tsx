import { PostService } from '@/services';
import { useStore } from '@/store';
import { Post } from '@/types';
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

  const postQuery = useQuery({
    queryKey: ['post', selectedPostId],
    queryFn: () => {
      if (!selectedPostId) return Promise.reject('No post selected');
      return PostService.getPostById(selectedPostId);
    },
    enabled: !!selectedPostId,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const postUpdate = useMutation({
    mutationKey: ['post', 'update', selectedPostId],
    mutationFn: async (post: Post) => {
      toast.info('Actualizando post...');
      return await PostService.updatePost(post);
    },
    onSuccess: () => {
      toast.success('Post actualizado correctamente');
      queryClient.invalidateQueries({ queryKey: ['post', selectedPostId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/posts');
    },
    onError: () => {
      toast.error('Error al actualizar el post');
    },
  });

  const postCreate = useMutation({
    mutationKey: ['post', 'create'],
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
      toast.error('Error al crear el post');
    },
  });

  return {
    postQuery: {
      isPending: postQuery.isPending,
      isError: postQuery.isError,
      error: postQuery.error,
      data: postQuery.data,
      isFetching: postQuery.isFetching,
      isPlaceholderData: postQuery.isPlaceholderData,
    },
    postUpdate: {
      mutate: postUpdate.mutate,
      isPending: postUpdate.isPending,
      isError: postUpdate.isError,
      error: postUpdate.error,
      isSuccess: postUpdate.isSuccess,
    },
    postCreate: {
      mutate: postCreate.mutate,
      isPending: postCreate.isPending,
      isError: postCreate.isError,
      error: postCreate.error,
      isSuccess: postCreate.isSuccess,
    },
  };
};
