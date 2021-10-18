import { cleanObj } from "utils";
import { useRequest } from "utils/request";
import { User } from "types";
import { useQuery } from "react-query";

export const useUsers = (param?: Partial<User>) => {
  const request = useRequest();
  return useQuery<User[]>(["users", cleanObj(param)], () =>
    request("users", { data: param })
  );
};
