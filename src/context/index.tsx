import React, { ReactNode, useState, useContext, Dispatch } from "react";

interface Injected {
  authToken: string | null;
  setAuthToken: Dispatch<any>;
}

const AuthContext = React.createContext<Injected>({} as Injected);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState(null);
  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken }}
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
