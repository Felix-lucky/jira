import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { useMemo, useState } from "react";
import { cleanObj, subset } from "utils";

export const useUrlSearchParam = <T extends string>(keys: T[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in T]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in T]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObj({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
