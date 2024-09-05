import { Button } from '@nextui-org/button';
import { useShallow } from 'zustand/react/shallow';
import '../App.css';
import { PostTable } from '../components/PostTable';
import { usePosts } from '../hooks/usePosts';
import { useStore } from '../store/useStore';

export const PostsPage = () => {
  const { postQuery } = usePosts();
  const { page, incrementPage, decrementPage } = useStore(
    useShallow((state) => ({
      page: state.page,
      incrementPage: state.incrementPage,
      decrementPage: state.decrementPage,
    })),
  );

  console.log('page', page);
  console.log('incrementPage', incrementPage);
  console.log('decrementPage', decrementPage);

  return (
    <div className="content">
      <h1>Listado</h1>
      <div className="bg-gray-700">
        {postQuery.isPending ? (
          <p>Loading...</p>
        ) : postQuery.isError ? (
          <p>Error: </p>
        ) : (
          <PostTable
            data={postQuery.data || []}
            paginator={{
              incrementPage,
              decrementPage,
              page,
              maxPages: postQuery.maxPages,
            }}
          />
        )}
      </div>
      <Button>Press me</Button>
    </div>
  );
};
