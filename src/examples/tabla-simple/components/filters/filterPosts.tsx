import {
  ErrorCard,
  Fallback,
  FilterSkeleton,
  FormFilter,
} from '@tabla-simple/components';
import { useFilter, useStatus } from '@tabla-simple/hooks';
import { useStore } from '@tabla-simple/store';

export const FilterPosts = () => {
  const { statusQuery } = useStatus();
  const { handleSubmit } = useFilter();
  const filterPost = useStore((state) => state.filterPost);

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
          isDisabledButton={statusQuery?.isLoading}
          isSubmitting={statusQuery?.isLoading}
        />
      </Fallback>
    </div>
  );
};
