import { useQuery } from "react-query";
import { Kanban } from "types";
import { cleanObj } from "utils";
import { useRequest } from "./request";

export const useKanbans = (param?: Partial<Kanban>) => {
  const request = useRequest();
  return useQuery<Kanban[]>(["kanbans", cleanObj(param)], () =>
    request("kanbans", { data: param })
  );
};
