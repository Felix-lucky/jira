import { useEffect, useCallback } from "react";
import { cleanObj } from "utils";
import { useAsync } from "utils/useAsync";
import { useRequest } from "utils/request";
import { Project } from "types";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const request = useRequest();
  const fetchProjects = useCallback(
    () => request("projects", { data: cleanObj(param) }),
    [param, request]
  );
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [param, fetchProjects, run]);

  return result;
};

export const useEditProject = () => {
  const { run, ...result } = useAsync();
  const request = useRequest();
  const mutate = (params: Partial<Project>) => {
    return run(
      request(`projects/${params.id}`, { method: "PATCH", data: params })
    );
  };
  return {
    mutate,
    ...result,
  };
};

export const useAddProject = () => {
  const { run, ...result } = useAsync();
  const request = useRequest();
  const mutate = (params: Partial<Project>) => {
    return run(request(`projects`, { method: "POST", data: params }));
  };
  return {
    mutate,
    ...result,
  };
};
