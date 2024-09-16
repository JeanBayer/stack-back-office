import { FormPost } from '@/components';
import { usePost } from '@/hooks';
import { type Post } from '@/types';

export const PostCreate = () => {
  const { postCreate } = usePost();

  const handleSubmit = (data: Omit<Post, 'id'>) => {
    console.log(data);
    // postCreate.mutate(data);
  };

  return (
    <div>
      <FormPost
        onSubmit={handleSubmit}
        isDisabledButton={postCreate.isPending || postCreate.isSuccess}
        isSubmitting={postCreate.isPending}
      />
    </div>
  );
};
