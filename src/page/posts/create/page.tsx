import { ErrorCard, Fallback, FormPost, FormSkeleton } from '@/components';
import { usePost, useStatus } from '@/hooks';
import { type Post } from '@/types';
import { Constants, FileUtil } from '@/utils';

export const PostCreate = () => {
  const { postCreate } = usePost();
  const { statusQuery } = useStatus();

  const handleSubmit = async (data: Omit<Post, 'id'>) => {
    const dataWithImage = await FileUtil.convertFilesListToFile(
      data,
      Constants.FIELDS_POST_WITH_IMAGE as string[],
    );
    postCreate.mutate(dataWithImage);
  };

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
        <FormPost
          status={statusQuery.data || []}
          onSubmit={handleSubmit}
          isDisabledButton={postCreate.isPending || postCreate.isSuccess}
          isSubmitting={postCreate.isPending}
        />
      </Fallback>
    </div>
  );
};
