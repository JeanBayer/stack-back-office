import { Fallback, PostTable, TableSkeleton } from '@/components';
import { WrapperStateContent } from '@/components/wrapperStateContent';
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

  // const ContentComponent = getComponentState({
  //   error: {
  //     isError: postQuery.isError,
  //     component: (
  //       <ErrorCard
  //         errorMessage={postQuery?.error?.message || 'Error'}
  //         onRetry={postQuery?.refetch}
  //       />
  //     ),
  //   },
  //   empty: {
  //     isEmpty: !postQuery.data?.length,
  //     component: <p>No hay ofertas</p>,
  //   },
  // });

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-4 px-4">
        <h1 className="text-2xl font-bold">Listado de ofertas</h1>
        <Link href="/posts/create" className="text-blue-500 hover:underline">
          Crear oferta
        </Link>
      </div>

      <Fallback
        isLoading={postQuery?.isPending}
        fallbackLoading={<TableSkeleton />}
      >
        <PostTable
          data={postQuery.data || []}
          paginator={{
            changePage,
            page,
            maxPages: postQuery.maxPages,
          }}
          emptyContent={
            <WrapperStateContent
              isError={postQuery.isError}
              errorMessage={postQuery.error?.message || 'Error'}
              refetch={postQuery.refetch}
              isEmpty={!postQuery.data?.length}
              emptyMessage="No hay Posts"
            />
          }
        />
      </Fallback>
    </div>
  );
};
