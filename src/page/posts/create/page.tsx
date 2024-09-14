import { FormPost } from '@/components';
import { usePost } from '@/hooks';
import { type Post } from '@/types';

export const PostCreate = () => {
  const { postCreate } = usePost();

  const handleSubmit = (data: Omit<Post, 'id'>) => {
    postCreate.mutate(data);
  };

  return (
    <div>
      {/* // TODO: crear componente que reciba el isPending, isError, isEmpty y que renderice */}
      <FormPost onSubmit={handleSubmit} />
    </div>
  );
};
