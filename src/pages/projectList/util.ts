import { useMemo } from "react";
import { useUrlSearchParam } from "utils/url";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlSearchParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};
