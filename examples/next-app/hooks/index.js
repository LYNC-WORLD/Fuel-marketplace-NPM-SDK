import { useState, useEffect } from "react";

export const useDebounce = (queryValue, debounceTime = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(queryValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(queryValue);
    }, debounceTime);

    return () => clearTimeout(timeoutId);
  }, [queryValue, debounceTime]);

  return debouncedValue;
};

export const useLocalStorage = () => {
  const getItem = (key) => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      return item;
    }
  };

  const setItem = (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  };

  return { getItem, setItem };
};
