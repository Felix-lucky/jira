import { useEffect, useState, useRef } from "react";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export const isVoid = (value: unknown): boolean =>
  value === null || value === undefined || value === "";

export const cleanObj = (obj?: { [key: string]: unknown }) => {
  if (!obj) {
    return {};
  }
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const val = result[key];
    if (isVoid(val)) {
      delete result[key];
    }
  });
  return result;
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
