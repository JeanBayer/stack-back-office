import { FormPost } from '@/components';
import { usePost } from '@/hooks';
import { type Post } from '@/types';
import { FileUtil } from '@/utils';

export const PostCreate = () => {
  const { postCreate } = usePost();

  const handleSubmit = async (data: Omit<Post, 'id'>) => {
    const dataWithImage = await FileUtil.convertFilesListToBase64(data, [
      'imagenURL',
    ]);
    postCreate.mutate(dataWithImage);
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
