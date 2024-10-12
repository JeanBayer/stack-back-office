import { useStatus } from '@/hooks';
import { Fallback,  DynamicModule, ErrorCard, FormSkeleton } from '@form-dinamico-back/components';
import { useMisione } from '@form-dinamico-back/hooks';

export const MisionCreate = () => {
  const { postCreate } = useMisione();
  const { statusQuery } = useStatus();

  async function handleSubmit(data: Record<string, string>) {
    try {
      await postCreate.mutate(data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }


  return (
    <div>
      <Fallback 
        isLoading={statusQuery?.isLoading}
        fallbackLoading={<FormSkeleton />}
        isError={statusQuery?.isError}
        fallbackError={
          <ErrorCard
            onRetry={statusQuery?.refetch}
            errorMessage={statusQuery?.error?.message || 'Error'}
          />
        }
      >
        <DynamicModule
          post={{}}
          onSubmit={handleSubmit}
          isDisabledButton={postCreate.isPending || postCreate.isSuccess}
          isSubmitting={postCreate.isPending}
        />
      </Fallback>
    </div>
  );
};
