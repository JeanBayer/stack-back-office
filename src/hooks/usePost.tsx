import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { PostService } from '../services/postService';
import { useStore } from '../store/useStore';

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

  return {
    postQuery: {
      isPending: postQuery.isPending,
      isError: postQuery.isError,
      error: postQuery.error,
      data: postQuery.data,
      isFetching: postQuery.isFetching,
      isPlaceholderData: postQuery.isPlaceholderData,
    },
  };
};
