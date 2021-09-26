/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { cleanObj } from "utils";
import { useAsync } from "utils/useAsync";
import { useRequest } from "utils/request";
import { Project } from "types";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const request = useRequest();

  useEffect(() => {
    run(request("projects", { data: cleanObj(param) }));
  }, [param]);

  return result;
};
