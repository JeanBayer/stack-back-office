import { FormPost } from '@/components';
import { usePost, useSelectId } from '@/hooks';
import { Post } from '@/types';

export const PostEdit = () => {
  const { postQuery, postUpdate } = usePost();
  const { id } = useSelectId();

  if (!id) return <div>Empty data</div>;

  if (postQuery.isPending || postQuery.isFetching) return <div>Loading...</div>;
  if (postQuery.isError) return <div>Error: {postQuery.error?.message}</div>;
  if (!postQuery.data) return <div>No data</div>;

  /* 
  ! la unica forma que encontré para que no muestré el post anterior si ambos están en caché
  ! el anterior y el nuevo. revisar como se puede mejorar
  ! intenté con: 
    ! reset de react-hook-form pero no funcionó
    ! usar los metodos de useQuery de react-query pero no funcionó como (isLoading, isFetching y demas) debido a que al estar en caché no se actualizan
  */
  if (id !== postQuery?.data?.id) return null;

  const handleSubmit = (data: Post) => {
    console.log('data', data);
    postUpdate.mutate(data);
  };

  return (
    <div>
      {/* // TODO: crear componente que reciba el isPending, isError, isEmpty y que renderice */}
      <FormPost post={postQuery.data!} onSubmit={handleSubmit} />
    </div>
  );
};
