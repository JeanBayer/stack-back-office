import {
  ErrorCard,
  Fallback,
  FilterSkeleton,
  FormFilter,
} from '@tabla-compleja/components';
import { useFilter } from '@tabla-compleja/hooks';
import { useStatus } from '@tabla-compleja/queries';
import { useStore } from '@tabla-compleja/store';

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
