import {
  ErrorCard,
  Fallback,
  FilterSkeleton,
  FormFilter,
} from '@form-simple/components';
import { useHandleChangeURLParams, useStatus } from '@form-simple/hooks';
import { useStore } from '@form-simple/store';
import { Filter, FilterSchema } from '@form-simple/types';
import { ObjectUtil } from '@form-simple/utils';

export const FilterPosts = () => {
  const filterPost = useStore((state) => state.filterPost);
  const setFilterPost = useStore((state) => state.setFilterPost);
  const { statusQuery } = useStatus();
  const { updateSearchParams } = useHandleChangeURLParams({
    handleChangeParams,
  });

  function handleChangeParams(params: Record<string, string>) {
    const exactFields = ObjectUtil.extractExactFields(
      params,
      Object.keys(FilterSchema.shape),
    );
    const validParams = FilterSchema.safeParse(exactFields);
    if (validParams.error) return;
    setFilterPost(validParams.data);
  }

  async function handleSubmit(data: Filter) {
    setFilterPost(data);
    updateSearchParams(data);
  }

  const statusWithAll = [
    { key: '', label: 'Todos' },
    ...(statusQuery?.data || []),
  ];

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
          status={statusWithAll}
          onSubmit={handleSubmit}
          isDisabledButton={statusQuery?.isLoading}
          isSubmitting={statusQuery?.isLoading}
        />
      </Fallback>
    </div>
  );
};
