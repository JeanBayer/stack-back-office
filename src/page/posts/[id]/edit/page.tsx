import { ErrorCard, Fallback, FormPost, FormSkeleton } from '@/components';
import { usePost, useSelectId } from '@/hooks';
import { Post } from '@/types';
import { Constants, FileUtil, ObjectUtil } from '@/utils';

export const PostEdit = () => {
  const { postQuery, postUpdate } = usePost();
  const { id } = useSelectId();

  if (!id) return <div>Empty data</div>;

  const handleSubmit = async (data: Post) => {
    const changedFields = ObjectUtil.getChangedFields(postQuery.data!, data);
    changedFields.id = postQuery.data!.id;

    const changeFieldsWithImage = await FileUtil.convertFilesListToBase64(
      changedFields,
      Constants.FIELDS_POST_WITH_IMAGE as string[],
    );

    postUpdate.mutate(changeFieldsWithImage);
  };

  return (
    <div>
      <Fallback
        isLoading={postQuery?.isLoading}
        fallbackLoading={<FormSkeleton />}
        isError={postQuery?.isError}
        fallbackError={
          <ErrorCard
            onRetry={postQuery?.refetch}
            errorMessage={postQuery?.error?.message || 'Error'}
          />
        }
        isChildrenEnabled={id === postQuery?.data?.id}
      >
        <FormPost
          post={postQuery.data!}
          onSubmit={handleSubmit}
          isDisabledButton={postUpdate.isPending || postUpdate.isSuccess}
          isSubmitting={postUpdate.isPending}
        />
      </Fallback>
    </div>
  );
};
