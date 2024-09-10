import { PostService } from '@/services';
import { useStore } from '@/store';
import { Post } from '@/types';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

export const usePost = () => {
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
    mutationFn: (post: Post) => PostService.updatePost(post),
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
    },
  };
};
