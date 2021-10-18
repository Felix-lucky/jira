import { QueryKey, useMutation, useQuery } from "react-query";
import { SortProps, Task } from "types";
import { cleanObj, useDebounce } from "utils";
import { useRequest } from "./request";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
} from "./useOptimisticOptions";

export const useTasks = (param?: Partial<Task>) => {
  const request = useRequest();
  const debounceParam = { ...param, name: useDebounce(param?.name, 200) };
  return useQuery<Task[]>(["tasks", cleanObj(debounceParam)], () =>
    request("tasks", { data: param })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const request = useRequest();
  return useMutation(
    (params: Partial<Task>) =>
      request(`tasks`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const request = useRequest();
  return useQuery(["tasks", { id }], () => request(`tasks/${id}`), {
    enabled: !!id,
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const request = useRequest();
  return useMutation(
    (params: Partial<Task>) =>
      request(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const request = useRequest();
  return useMutation(
    (id: number) =>
      request(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useRequest();
  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};
