import { ErrorCard, Fallback, FilterSkeleton, FormFilter } from '@/components';
import { useStatus } from '@/hooks';
import { useStore } from '@/store';
import { Filter } from '@/types';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const FilterPosts = () => {
  const filterPost = useStore((state) => state.filterPost);
  const setFilterPost = useStore((state) => state.setFilterPost);
  const [searchParams, setSearchParams] = useSearchParams();
  const { statusQuery } = useStatus();

  useEffect(() => {
    const params: Partial<Filter> = {};
    searchParams.forEach((value, key) => {
      params[key as keyof Filter] = value;
    });
    setFilterPost(params as Filter);
  }, [searchParams, setFilterPost]);

  const handleSubmit = async (data: Filter) => {
    console.log(data);

    setFilterPost(data);
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    // Actualiza los parámetros de búsqueda en la URL
    setSearchParams(params);
  };

  return (
    <div>
      <Fallback
        isLoading={statusQuery?.isLoading}
        fallbackLoading={<FilterSkeleton />}
        isError={statusQuery?.isError}
        fallbackError={
          <ErrorCard
            onRetry={statusQuery?.refetch}
            errorMessage={statusQuery?.error?.message || 'Error'}
          />
        }
      >
        <FormFilter
          key={JSON.stringify(filterPost)}
          filter={filterPost}
          status={statusQuery.data || []}
          onSubmit={handleSubmit}
          isDisabledButton={false}
          isSubmitting={false}
        />
      </Fallback>
    </div>
  );
};
