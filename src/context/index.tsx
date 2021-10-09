import React, { ReactNode } from "react";
import { AuthProvider } from "./authContext";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children} </AuthProvider>
);
