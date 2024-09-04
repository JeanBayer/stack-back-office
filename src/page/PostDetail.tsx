import { Link } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import { useSelectId } from '../hooks/useSelectId';
import styles from './PostDetail.module.css';

export const PostDetail = () => {
  const { postQuery } = usePost();
  const { id } = useSelectId();

  if (!id) return <div>Empty data</div>;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={`https://via.placeholder.com/800x400?text=${encodeURIComponent(postQuery.data?.title || '')}`}
          width={800}
          height={400}
          alt={postQuery.data?.title}
          className={styles.image}
        />
        <h1 className={styles.title}>{postQuery.data?.title}</h1>
        <p className={styles.views}>Views: {postQuery.data?.views}</p>
        <Link to={`/posts/${id}/edit`} className={styles.editButton}>
          Edit Post
        </Link>
      </div>
      <div className={styles.content}>
        <p>
          This is a detailed view of the post. You can add additional content,
          such as the post body, author information, or any other relevant
          details.
        </p>
      </div>
      <div className={styles.footer}>
        <Link to="/posts" className={styles.button}>
          Back to Posts
        </Link>
      </div>
    </div>
  );
};
