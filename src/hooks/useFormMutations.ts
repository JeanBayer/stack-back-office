import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { handleMutationCallbacks } from '@/utils/mutationUtils';
import { NavigateFunction } from 'react-router-dom';

type QueryKey = readonly unknown[];  // Aseguramos que QueryKey sea un array

// Tipo genérico para los hooks de mutación
interface UseMutationOptions<TData, TVariables> {
  mutationKey: QueryKey;
  mutationFn: (variables: TVariables) => Promise<TData>;
  successMessage: string;
  invalidateQueries: QueryKey[];
  redirectTo?: string;
}

export const useGenericMutation = <TData, TVariables>(
  navigate: NavigateFunction,
  options: UseMutationOptions<TData, TVariables>
): UseMutationResult<TData, Error, TVariables> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: options.mutationKey,
    mutationFn: options.mutationFn,
    ...handleMutationCallbacks(
      queryClient,
      navigate,
      options.successMessage,
      options.invalidateQueries,
      options.redirectTo
    ),
  });
};
