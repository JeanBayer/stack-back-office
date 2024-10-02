import { ObjectUtil } from '@form-simple/utils';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type UseHandleChangeURLParams = {
  handleChangeParams: (params: Record<string, string>) => void;
};

export const useHandleChangeURLParams = ({
  handleChangeParams,
}: UseHandleChangeURLParams) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = ObjectUtil.URLSearchParamsToObject(searchParams);
    handleChangeParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function updateSearchParams(param: object) {
    const urlSearchParam = ObjectUtil.toURLSearchParams(param);
    setSearchParams(urlSearchParam);
  }

  return {
    updateSearchParams,
  };
};
