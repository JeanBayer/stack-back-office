import { useShallow } from 'zustand/react/shallow';
import '../App.css';
import { PostTable } from '../components/PostTable';
import { usePosts } from '../hooks/usePosts';
import { useStore } from '../store/useStore';

export const PostsPage = () => {
  const { postQuery } = usePosts();
  const { page, changePage } = useStore(
    useShallow((state) => ({
      page: state.page,
      changePage: state.setPage,
    })),
  );

  return (
    <div className="content">
      <h1>Listado de ofertas</h1>
      <div className="bg-gray-700">
        {postQuery.isPending ? (
          <p>Loading...</p>
        ) : postQuery.isError ? (
          <p>Error: </p>
        ) : (
          <PostTable
            data={postQuery.data || []}
            paginator={{
              changePage,
              page,
              maxPages: postQuery.maxPages,
            }}
          />
        )}
      </div>
    </div>
  );
};
