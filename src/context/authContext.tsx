import React, { ReactNode, useContext } from "react";
import { User, UserParams } from "types";
import * as Auth from "utils/auth";
import { request } from "utils/request";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { FullPageLoading, FullPageError } from "components/FullPage";

interface Injected {
  user: User | null;
  register: (form: UserParams) => Promise<void>;
  login: (form: UserParams) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<Injected>({} as Injected);

const userDefaults = async () => {
  let user = null;
  const token = Auth.getToken();

  if (token) {
    const data = await request("me", { token });
    user = data.user;
  }

  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    isLoading,
    isIdle,
    error,
    isError,
    setData: setUser,
    run,
  } = useAsync<User | null>();
  const login = (params: UserParams) => Auth.login(params).then(setUser);
  const register = (params: UserParams) => Auth.register(params).then(setUser);
  const logout = () => Auth.logout().then(() => setUser(null));

  useMount(() => {
    run(userDefaults());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth必须在AuthProvider中使用`);
  }

  return context;
};
