import { useQuery } from "react-query";
import { TaskType } from "types";
import { useRequest } from "./request";

export const useTaskTypes = () => {
  const request = useRequest();
  return useQuery<TaskType[]>("taskTypes", () => request("taskTypes"));
};
