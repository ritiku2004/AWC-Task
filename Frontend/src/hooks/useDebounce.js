import { useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash.debounce';

export const useDebounce = (callback, delay) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };
    return debounce(func, delay);
  }, [delay]);

  return debouncedCallback;
};