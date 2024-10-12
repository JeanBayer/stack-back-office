import { MisionesService } from '@form-dinamico-back/services';
import {
  Constants,
  ErrorUtil,
  QueryClientUtil,
} from '@form-dinamico-back/utils';
import { useStore } from '@form-dinamico-back/store';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { PostMisione } from '../types';


export const useMisione = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const { selectedPostId } = useStore(
    useShallow((state) => ({
      selectedPostId: state.selectedPostId,
    })),
  );


  const postQuery = useQuery({
    queryKey: ['misiones', selectedPostId],
    queryFn: async () => {
      if (!selectedPostId) throw new Error('No post selected');
      return await MisionesService.getMissionById(selectedPostId);
    },
    enabled: !!selectedPostId,
    placeholderData: keepPreviousData,
    staleTime: Constants?.CACHE_TIME_GET_POST,
  });


  const postCreate = useMutation({
    mutationFn: async (post: Omit<PostMisione, 'id'>) => {
      toast.info('Creando form-dinamico-back...');
      return await MisionesService.createMission(post);
    },
    onSuccess: () => {
      toast.success('form-dinamico-back creado correctamente');
      queryClient.invalidateQueries({ queryKey: ['misiones'] });
      navigate('/form-dinamico-back');
    },
    onError: () => {
      ErrorUtil.handleError(`Error al crear el form-dinamico-back`);
    },
  });


  const postUpdate = useMutation({
    mutationFn: async (post: Partial<PostMisione>) => {
      toast.info('Actualizando misiones...');
      return await MisionesService.updateMission(post);
    },
    onMutate: async (updatedPost) => {
      if (selectedPostId) {
        const previousPost = queryClient.getQueryData<PostMisione>([
          'misiones',
          selectedPostId,
        ]);
        queryClient.setQueryData(['misiones', selectedPostId], {
          ...previousPost,
          ...updatedPost,
        });

        return { previousData: previousPost };
      }
      return { previousData: null };
    },
    onError: (__err, __updatedPost, context) => {
      QueryClientUtil.rollbackOptimisticUpdate(
        queryClient,
        ['misiones', selectedPostId!],
        context,
      );
      toast.error('Error al actualizar el post');
    },
    onSuccess: () => {
      toast.success('Post actualizado correctamente');
      queryClient.invalidateQueries({ queryKey: ['misiones', selectedPostId] });
      navigate('/form-dinamico-back');
    },
  });

  const postDelete = useMutation({
    mutationFn: async (id: string) => {
      toast.info('Eliminando misiones...');
      return await MisionesService.deleteMission(id);
    },
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ['misiones'] });

      const previousPosts = QueryClientUtil.getQueryData<PostMisione[]>(
        queryClient,
        ['misiones'],
      );
      if (previousPosts) {
        QueryClientUtil.setQueryData(queryClient, ['misiones'], previousPosts.filter((post) => post.id !== postId));
      }

      return { previousData: previousPosts };
    },
    onError: (_, __, context) => {
      QueryClientUtil.rollbackOptimisticUpdate(queryClient, ['misiones'], context);
    },

    onSuccess: () => {
      toast.success('misiones eliminado correctamente');
      queryClient.invalidateQueries({ queryKey: ['misiones'] });
      navigate('/form-dinamico-back');
    },
  });

  return {
    postCreate,
    postUpdate,
    postQuery,
    postDelete
  };
};
