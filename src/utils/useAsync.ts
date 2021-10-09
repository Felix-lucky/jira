import { useState, useCallback } from "react";
import { useMountedRef } from "utils";

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
  const [retry, setRetry] = useState(() => () => {});
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };
  const mountedRef = useMountedRef();

  const setData = useCallback(
    (data: T) =>
      setState((stat: State<T>) => ({ ...stat, data, status: "success" })),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState((stat: State<T>) => ({ ...stat, error, status: "error" })),
    []
  );

  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      if (!promise || !promise.then) {
        throw new Error(`请传入Promise数据类型`);
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      setState((prevState) => ({ ...prevState, status: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) {
            setData(data);
          }
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, setError, setData, mountedRef]
  );

  return {
    ...state,
    run,
    setData,
    setError,
    retry,
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
  };
};
