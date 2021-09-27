import { useState } from "react";

interface State<T> {
  error: Error | null;
  data: T | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  status: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };

  const setData = (data: T) =>
    setState((stat: State<T>) => ({ ...stat, data, status: "success" }));

  const setError = (error: Error) =>
    setState((stat: State<T>) => ({ ...stat, error, status: "error" }));

  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error(`请传入Promise数据类型`);
    }
    setState({ ...state, status: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        }
        return error;
      });
  };

  return {
    ...state,
    run,
    setData,
    setError,
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
  };
};
