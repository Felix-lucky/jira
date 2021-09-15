export const localStorageKey = "__auth_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const setToken = (token: string) =>
  window.localStorage.setItem(localStorageKey, token);

export const logout = () => window.localStorage.removeItem(localStorageKey);
