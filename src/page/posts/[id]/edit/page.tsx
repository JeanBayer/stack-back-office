import { FormEditPost } from '@/components';
import { usePost, useSelectId } from '@/hooks';
import { Post } from '@/types';

export const PostEdit = () => {
  const { postQuery, postUpdate } = usePost();
  const { id } = useSelectId();

  if (!id) return <div>Empty data</div>;

  if (postQuery.isPending) return <div>Loading...</div>;
  if (postQuery.isError) return <div>Error: {postQuery.error?.message}</div>;
  if (!postQuery.data) return <div>No data</div>;

  console.log({ postUpdate });

  const handleSubmit = (data: Post) => {
    postUpdate.mutate(data);
  };

  return (
    <div>
      {/* // TODO: crear componente que reciba el isPending, isError, isEmpty y que renderice */}
      <FormEditPost post={postQuery.data!} onSubmit={handleSubmit} />
    </div>
  );
};
