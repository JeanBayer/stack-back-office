import { Generic } from '@/examples/form-dinamico-back/types';
import { ErrorCard, Fallback, DynamicModule, FormSkeleton } from '@form-dinamico-back/components';
import { useMisione, useSelectId } from '@form-dinamico-back/hooks';

export const MisionEdit = () => {
  const { postQuery, postUpdate } = useMisione();
  const { id } = useSelectId();

  if (!id) return <div>Empty data</div>;

  const handleSubmit = async (data: Generic) => {
    data = { ...data, id: postQuery.data?.id ?? '' };
    postUpdate.mutate(data);
  };

  return (
    <div>
      <Fallback
        isLoading={postQuery?.isLoading}
        fallbackLoading={<FormSkeleton />}
        isError={postQuery?.isError}
        fallbackError={
          <ErrorCard
            onRetry={() => {
              postQuery?.refetch();
            }}
            errorMessage={
              postQuery?.error?.message || 'Unknown error'
            }
          />
        }
        isChildrenEnabled={id === postQuery?.data?.id}
      >
        <DynamicModule
          post={postQuery.data ?? {} as Generic}
          onSubmit={handleSubmit}
          isDisabledButton={postUpdate.isPending || postUpdate.isSuccess}
          isSubmitting={postUpdate.isPending}
        />
      </Fallback>
    </div>
  );
};