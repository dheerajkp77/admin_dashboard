import { useEffect, useState } from "react";

/**
 * Debounce hook will provide delay b/w request
 * @param {String} value
 * @param {Number} delay
 * @returns
 */

export const useDebounceEffect = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    let timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);
  return debouncedValue;
};