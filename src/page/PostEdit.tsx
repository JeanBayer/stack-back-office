import { FormEditPost } from '../components/FormEditPost';
import { usePost } from '../hooks/usePost';
import { useSelectId } from '../hooks/useSelectId';
import { Post } from '../types/post';
import styles from './PostDetail.module.css';

export const PostEdit = () => {
  const { postQuery } = usePost();
  const { id } = useSelectId();

  if (!id) return <div>Empty data</div>;

  if (postQuery.isPending) return <div>Loading...</div>;
  if (postQuery.isError) return <div>Error: {postQuery.error?.message}</div>;
  if (!postQuery.data) return <div>No data</div>;

  const handleSubmit = (data: Post) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      {/* // TODO: crear componente que reciba el isPending, isError, isEmpty y que renderice */}
      <FormEditPost
        post={postQuery.data!}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
