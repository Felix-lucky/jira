import React, { ReactNode } from "react";
import { AuthProvider } from "./authCintext";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children} </AuthProvider>
);
