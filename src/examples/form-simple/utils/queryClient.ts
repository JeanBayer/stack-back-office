import { ErrorUtil } from '@form-simple/utils';
import { QueryClient } from '@tanstack/react-query';
interface ContextWithPreviousData {
  previousData: unknown;
}

export class QueryClientUtil {
  public static extractQueryKeys(queryClient: QueryClient, key: string[]) {
    const queryKeys = queryClient
      .getQueryCache()
      .findAll({ queryKey: key })
      .map((query) => query.queryKey);

    return queryKeys[0];
  }

  public static getQueryData<T>(queryClient: QueryClient, key: string[]) {
    const queryKeyPosts = this.extractQueryKeys(queryClient, key);
    const query = queryClient.getQueryData<T>(queryKeyPosts);
    return query;
  }

  public static setQueryData<T>(
    queryClient: QueryClient,
    key: string[],
    data: T,
  ) {
    const queryKeyPosts = this.extractQueryKeys(queryClient, key);
    const query = queryClient.setQueryData<T>(queryKeyPosts, data);
    return query;
  }

  public static rollbackOptimisticUpdate<T extends ContextWithPreviousData>(
    queryClient: QueryClient,
    key: string[],
    context: T | undefined,
  ) {
    const queryKeyPosts = this.extractQueryKeys(queryClient, key);
    if (context?.previousData) {
      queryClient.setQueryData(queryKeyPosts, context.previousData);
    } else {
      ErrorUtil.handleError(
        'Rollback fallido: No se encontró previousData en el contexto.',
      );
    }
  }
}
