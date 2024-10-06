import {
  ErrorCard,
  Fallback,
  FormPost,
  FormSkeleton,
} from '@form-simple/components';
import { usePost, useSelectId, useStatus } from '@form-simple/hooks';

export const PostDetail = () => {
  const { postQuery } = usePost();
  const { statusQuery } = useStatus();

  const { id } = useSelectId();

  if (!id) return <div>Empty data</div>;

  return (
    <div>
      <Fallback
        isLoading={postQuery?.isLoading || statusQuery?.isLoading}
        fallbackLoading={<FormSkeleton />}
        isError={postQuery?.isError || statusQuery?.isError}
        fallbackError={
          <ErrorCard
            onRetry={() => {
              postQuery?.refetch();
              statusQuery?.refetch();
            }}
            errorMessage={
              postQuery?.error?.message ||
              statusQuery?.error?.message ||
              'Error'
            }
          />
        }
        isChildrenEnabled={id === postQuery?.data?.id}
      >
        <FormPost
          post={postQuery.data!}
          status={statusQuery.data || []}
          onSubmit={() => {}}
          isDisabledForm={true}
        />
      </Fallback>
    </div>
  );
};
