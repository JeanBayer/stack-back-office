import { PostService } from '@/services';
import { useStore } from '@/store';
import { Post, PostResponse } from '@/types';
import { Constants, QueryClientUtil } from '@/utils';
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
    staleTime: Constants.CACHE_TIME_GET_POST,
  });

  const postUpdate = useMutation({
    mutationKey: ['post', 'update', selectedPostId],
    mutationFn: async (post: Partial<Post>) => {
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

  const postDelete = useMutation({
    mutationKey: ['post', 'delete'],
    mutationFn: async (postId: string) => {
      toast.info('Eliminando post...');
      return await PostService.deletePost(postId);
    },
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = QueryClientUtil.getQueryData<PostResponse>(
        queryClient,
        ['posts'],
      );
      if (!previousPosts) return { previousPosts: undefined };
      QueryClientUtil.setQueryData<PostResponse>(queryClient, ['posts'], {
        ...previousPosts,
        items: previousPosts.items.filter((post) => post.id !== postId),
      });

      return { previousPosts };
    },
    onSuccess: () => {
      toast.success('Post eliminado correctamente');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/posts');
    },

    onError: (_, __, context) => {
      toast.error('Error al eliminar el post');
      if (!context?.previousPosts) return;
      QueryClientUtil.setQueryData(
        queryClient,
        ['posts'],
        context.previousPosts,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return {
    postQuery: {
      isPending: postQuery.isPending,
      isError: postQuery.isError,
      isLoading: postQuery.isLoading,
      error: postQuery.error,
      data: postQuery.data,
      isFetching: postQuery.isFetching,
      isPlaceholderData: postQuery.isPlaceholderData,
      refetch: postQuery.refetch,
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
    postDelete: {
      mutate: postDelete.mutate,
      isPending: postDelete.isPending,
      isError: postDelete.isError,
      error: postDelete.error,
      isSuccess: postDelete.isSuccess,
    },
  };
};
