import { Card, CardBody, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import { useSelectId } from '../hooks/useSelectId';
import styles from './PostDetail.module.css';

export const PostDetail = () => {
  const { postQuery } = usePost();
  const { id } = useSelectId();

  if (!id) return <div>Empty data</div>;
  return (
    <div className="flex items-center justify-center h-full p-4">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[400px]"
        shadow="sm"
      >
        <CardBody>
          <div className={styles.header}>
            <Image
              src={`https://picsum.photos/400/200?random=${id}`}
              width={400}
              height={200}
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
              This is a detailed view of the post. You can add additional
              content, such as the post body, author information, or any other
              relevant details.
            </p>
          </div>
          <div className={styles.footer}>
            <Link to="/posts" className={styles.button}>
              Back to Posts
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
