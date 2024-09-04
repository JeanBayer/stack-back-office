import { useShallow } from 'zustand/react/shallow';
import '../App.css';
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

  return (
    <div className="content">
      <h1>Listado</h1>
      <div>
        {postQuery?.data?.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.author}</p>
          </div>
        ))}
      </div>
      <div>
        <p>
          Page {page} / {postQuery.maxPages}
        </p>
      </div>
      <div>
        <button
          onClick={() => {
            if (postQuery.havePrevPage) decrementPage();
          }}
          disabled={!postQuery.havePrevPage}
        >
          back
        </button>
        <button
          disabled={!postQuery.haveNextPage}
          onClick={() => {
            if (postQuery.haveNextPage) incrementPage();
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};
