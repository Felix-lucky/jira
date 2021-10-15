import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types";
import { cleanObj } from "utils";
import { useRequest } from "./request";
import { useAddConfig, useDeleteConfig } from "./useOptimisticOptions";

export const useEpics = (param?: Partial<Epic>) => {
  const request = useRequest();
  return useQuery<Epic[]>(["epics", cleanObj(param)], () =>
    request("epics", { data: param })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const request = useRequest();
  return useMutation(
    (params: Partial<Epic>) =>
      request(`epics`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const request = useRequest();
  return useMutation(
    (id: number) =>
      request(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
