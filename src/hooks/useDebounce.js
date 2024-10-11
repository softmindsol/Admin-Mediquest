import { useEffect } from "react";

const useDebouncedEffect = (callback, dependencies, delay = 1000) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler);
  }, dependencies);
};
export default useDebouncedEffect;
