import { useHandleChangeURLParams } from '@tabla-simple/hooks';
import { useStore } from '@tabla-simple/store';
import { type Filter, FilterSchema } from '@tabla-simple/types';
import { SchemaUtil } from '@tabla-simple/utils';

export const useFilter = () => {
  const setFilterPost = useStore((state) => state.setFilterPost);
  const { updateSearchParams } = useHandleChangeURLParams({
    handleChangeParams,
  });

  function handleChangeParams(params: Record<string, string>) {
    const validParams = FilterSchema.safeParse(params);
    if (validParams.success) return setFilterPost(validParams.data);

    const validFields = SchemaUtil.filterValidFields<Filter>(
      params,
      validParams.error,
    );
    const validResult = FilterSchema.safeParse(validFields);
    if (validResult.error) return;

    setFilterPost(validResult.data);
  }

  async function handleSubmit(data: Filter) {
    setFilterPost(data);
    updateSearchParams(data);
  }

  return {
    handleSubmit,
  };
};
