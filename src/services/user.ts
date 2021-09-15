import request from "utils/request";

export interface UserParams {
  username: string;
  password: string;
}

export function queryLogin(params: UserParams) {
  return request({
    url: "/login",
    method: "POST",
    data: params,
  });
}
