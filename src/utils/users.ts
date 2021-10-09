import { useEffect } from "react";
import { cleanObj } from "utils";
import { useAsync } from "utils/useAsync";
import { useRequest } from "utils/request";
import { User } from "types";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const request = useRequest();

  useEffect(() => {
    run(request("users", { data: cleanObj(param || {}) }));
  }, [param, request, run]);

  return result;
};
