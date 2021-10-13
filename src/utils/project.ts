import { cleanObj } from "utils";
import { useRequest } from "utils/request";
import { Project } from "types";
import { useQuery, useMutation, QueryKey } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./useOptimisticOptions";

export const useProjects = (param?: Partial<Project>) => {
  const request = useRequest();
  return useQuery<Project[]>(["projects", cleanObj(param)], () =>
    request("projects", { data: param })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const request = useRequest();
  return useMutation(
    (params: Partial<Project>) =>
      request(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const request = useRequest();
  return useMutation(
    (params: Partial<Project>) =>
      request(`projects`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const request = useRequest();
  return useQuery(["project", { id }], () => request(`projects/${id}`), {
    enabled: !!id,
  });
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const request = useRequest();
  return useMutation(
    (id: number) =>
      request(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
