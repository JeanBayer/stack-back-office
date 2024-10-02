import { usePost, useSelectId } from '@form-simple/hooks';
import { Card, CardBody, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

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
          <div>
            <Image
              src={`https://picsum.photos/400/200?random=${id}`}
              width={400}
              height={200}
              alt={postQuery.data?.title}
            />
            <h1>{postQuery.data?.title}</h1>
            <p>Views: {postQuery.data?.views}</p>
            <Link to={`/posts/${id}/edit`}>Edit Post</Link>
          </div>
          <div>
            <p>
              This is a detailed view of the post. You can add additional
              content, such as the post body, author information, or any other
              relevant details.
            </p>
          </div>
          <div>
            <Link to="/posts">Back to Posts</Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
