import { ErrorCard, Fallback, WrapperStateContent, PostTable, TableSkeleton } from '@form-dinamico-back/components';
import { useMisiones, useMisione } from '../hooks';
import { Link } from 'react-router-dom';


export const FormDinamicoBackPage = () => {
  const { misioneQuery } = useMisiones();
const { postDelete } = useMisione();
  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-4 px-4">
        <h1 className="text-2xl text-blue-500 font-bold">Listado de Misiones</h1>
        <Link to="/form-dinamico-back/create" className="text-blue-500 hover:underline">
          Crear Mision
        </Link>
      </div>

      <Fallback
        isLoading={misioneQuery?.isPending}
        isError={misioneQuery?.isError}
        fallbackLoading={<TableSkeleton />}
        fallbackError={
          <ErrorCard
            onRetry={misioneQuery?.refetch}
            errorMessage={misioneQuery?.error?.message || 'Error'}
          />
        }
      >
        <PostTable
          data={misioneQuery.data || []}
          emptyContent={
            <WrapperStateContent
              isError={misioneQuery.isError}
              errorMessage={misioneQuery.error?.message || 'Error'}
              refetch={misioneQuery.refetch}
              isEmpty={!misioneQuery.data?.length}
              emptyMessage="No hay Posts"
            />
          }
          onDelete={postDelete.mutate}
        />
      </Fallback>
    </div>
  );
};
