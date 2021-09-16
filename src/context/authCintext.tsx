import React, { ReactNode, useState, useContext } from "react";
import { User, UserParams } from "types";
import * as Auth from "utils/auth";
import { request } from "utils/request";
import { useMount } from "utils";

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
  const [user, setUser] = useState<User | null>(null);
  const login = (params: UserParams) => Auth.login(params).then(setUser);
  const register = (params: UserParams) => Auth.register(params).then(setUser);
  const logout = () => Auth.logout().then(() => setUser(null));

  useMount(() => {
    userDefaults().then(setUser);
  });

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
