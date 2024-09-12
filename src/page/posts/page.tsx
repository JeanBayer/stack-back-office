import { PostTable } from '@/components';
import { usePosts } from '@/hooks';
import { useStore } from '@/store';
import { Link } from '@nextui-org/react';
import { useShallow } from 'zustand/react/shallow';

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
      <Link href="/posts/create">Crear oferta</Link>
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
