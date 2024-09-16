import {
  Fallback,
  PostTable,
  TableSkeleton,
  WrapperStateContent,
} from '@/components';
import { usePost, usePosts } from '@/hooks';
import { useStore } from '@/store';
import { Link } from '@nextui-org/react';
import { useShallow } from 'zustand/react/shallow';

export const PostsPage = () => {
  const { postsQuery } = usePosts();
  const { postDelete } = usePost();

  const { page, changePage } = useStore(
    useShallow((state) => ({
      page: state.page,
      changePage: state.setPage,
    })),
  );

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-4 px-4">
        <h1 className="text-2xl font-bold">Listado de ofertas</h1>
        <Link href="/posts/create" className="text-blue-500 hover:underline">
          Crear oferta
        </Link>
      </div>

      <Fallback
        isLoading={postsQuery?.isPending}
        fallbackLoading={<TableSkeleton />}
      >
        <PostTable
          data={postsQuery.data || []}
          paginator={{
            changePage,
            page,
            maxPages: postsQuery.maxPages,
          }}
          emptyContent={
            <WrapperStateContent
              isError={postsQuery.isError}
              errorMessage={postsQuery.error?.message || 'Error'}
              refetch={postsQuery.refetch}
              isEmpty={!postsQuery.data?.length}
              emptyMessage="No hay Posts"
            />
          }
          onDelete={postDelete.mutate}
        />
      </Fallback>
    </div>
  );
};
