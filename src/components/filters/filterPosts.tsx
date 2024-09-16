import { FormFilter } from '@/components';
import { useStore } from '@/store';
import { Filter } from '@/types';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const FilterPosts = () => {
  const filterPost = useStore((state) => state.filterPost);
  const setFilterPost = useStore((state) => state.setFilterPost);
  const [searchParams, setSearchParams] = useSearchParams();

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

  console.log({ filterPost });

  return (
    <div>
      <FormFilter
        key={JSON.stringify(filterPost)}
        filter={filterPost}
        onSubmit={handleSubmit}
        isDisabledButton={false}
        isSubmitting={false}
      />
    </div>
  );
};
