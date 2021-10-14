import { useQuery } from "react-query";
import { Task } from "types";
import { cleanObj } from "utils";
import { useRequest } from "./request";

export const useTasks = (param?: Partial<Task>) => {
  const request = useRequest();
  return useQuery<Task[]>(["tasks", cleanObj(param)], () =>
    request("tasks", { data: param })
  );
};
