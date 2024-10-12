import { MisionesService } from '@form-dinamico-back/services';
// import { Constants } from '@form-dinamico-back/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useMisiones = () => {
  const misionesQuery = useQuery({
    queryKey: ['misiones'],
    queryFn: async () => {
      try {
        const response = await MisionesService.getMisiones();
        return response;
      } catch (error) {
        toast.error(`Error al cargar las misiones`);
        throw error;
      }
    },
    placeholderData: keepPreviousData,
  });

  return {
    misioneQuery: {
      isPending: misionesQuery.isPending,
      isError: misionesQuery.isError,
      error: misionesQuery.error,
      data: misionesQuery.data,
      isFetching: misionesQuery.isFetching,
      isPlaceholderData: misionesQuery.isPlaceholderData,
      refetch: misionesQuery.refetch,
    },
  };
};
