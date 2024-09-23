// mutationHelpers.ts
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { NavigateFunction } from 'react-router-dom';

// Definimos un tipo genérico para las claves de las queries
// Aquí nos aseguramos de que siempre sea un array
type QueryKey = readonly unknown[];

// Definimos un tipo genérico para los callbacks de las mutaciones
export interface MutationCallbacks {
  onSuccess: () => void;
  onError: () => void;
}

// Helper para manejar los callbacks de las mutaciones de forma genérica
export const handleMutationCallbacks = (
  queryClient: ReturnType<typeof useQueryClient>, // Obtener el tipo de useQueryClient
  navigate: NavigateFunction,
  onSuccessMessage: string,
  invalidateQueries: QueryKey[],  // Usamos readonly unknown[] para QueryKeys
  redirectTo?: string
): MutationCallbacks => ({
  onSuccess: () => {
    toast.success(onSuccessMessage);
    invalidateQueries.forEach(queryKey => queryClient.invalidateQueries({ queryKey }));
    if (redirectTo) navigate(redirectTo);
  },
  onError: () => {
    toast.error('Error al procesar la operación');
  }
});