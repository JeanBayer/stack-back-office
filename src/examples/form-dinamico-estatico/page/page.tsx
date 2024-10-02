import {
  ErrorCard,
  Fallback,
  FilterSkeleton,
  FormPrueba,
} from '@form-dinamico-estatico/components';
import {
  //  useHandleChangeURLParams,
  useStatus,
} from '@form-dinamico-estatico/hooks';
import { useStore } from '@form-dinamico-estatico/store';
// import { ObjectUtil } from '@/utils';

export const FormDinamicoEstaticoPage = () => {
  const filterPost = useStore((state) => state.filterPost);
  // const setFilterPost = useStore((state) => state.setFilterPost);
  const { statusQuery } = useStatus();
  // const { updateSearchParams } = useHandleChangeURLParams({
  //   handleChangeParams,
  // });

  // function handleChangeParams(params: Record<string, string>) {
  //   const exactFields = ObjectUtil.extractExactFields(
  //     params,
  //     Object.keys(FilterSchema.shape),
  //   );
  //   const validParams = FilterSchema.safeParse(exactFields);
  //   if (validParams.error) return;
  //   setFilterPost(validParams.data);
  // }

  async function handleSubmit(data: Record<string, string>) {
    console.log('data:::', data);
    // setFilterPost(data);
    // updateSearchParams(data);
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
        <FormPrueba
          key={JSON.stringify(filterPost)}
          // filter={filterPost}
          status={statusWithAll}
          onSubmit={handleSubmit}
          isDisabledButton={statusQuery?.isLoading}
          isSubmitting={statusQuery?.isLoading}
        />
      </Fallback>
    </div>
  );
};
