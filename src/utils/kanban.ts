import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban, SortProps } from "types";
import { cleanObj } from "utils";
import { useRequest } from "./request";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from "./useOptimisticOptions";

export const useKanbans = (param?: Partial<Kanban>) => {
  const request = useRequest();
  return useQuery<Kanban[]>(["kanbans", cleanObj(param)], () =>
    request("kanbans", { data: param })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const request = useRequest();
  return useMutation(
    (params: Partial<Kanban>) =>
      request(`kanbans`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const request = useRequest();
  return useMutation(
    (id: number) =>
      request(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useRequest();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
};
