import { cleanObj, useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { useRequest } from "utils/request";
import { User } from "types";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const request = useRequest();

  useMount(() => {
    run(request("users", { data: cleanObj(param) }));
  });

  return result;
};
