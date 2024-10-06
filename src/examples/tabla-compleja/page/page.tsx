import { Link, Spacer } from '@nextui-org/react';
import {
  Fallback,
  FilterPosts,
  PostTable,
  TableSkeleton,
  WrapperStateContent,
} from '@tabla-compleja/components';
import { usePost, usePosts } from '@tabla-compleja/hooks';
import { useStore } from '@tabla-compleja/store';
import { Constants } from '@tabla-compleja/utils';
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
    <div className="content p-4">
      <div className="flex justify-between items-center mb-4 px-4">
        <h1 className="text-2xl font-bold">Listado de Posts</h1>
        <Link
          href={Constants.ROUTES.POSTS_FORM_CREATE}
          className="text-blue-500 hover:underline"
        >
          Crear Post
        </Link>
      </div>

      <FilterPosts />
      <Spacer y={10} />
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
