import { useState, useEffect, useCallback } from "react";

/**
  * useIterator is a hook to iterate over an array of items.
  * @param items - The array of items to iterate over.
  * @returns val - The current item in the array.
  * @returns next - A function to move to the next item in the array.
  * @example
  * const items = ["a", "b", "c"];
  * const { val, next } = useIterator(items);
  * console.log(val); // "a"
  * next();
  * console.log(val); // "b"
  * next();
  * console.log(val); // "c"
  * next();
  * console.log(val); // undefined
  * next();
  */
const useIterator = <T>(items: T[] | undefined): { val: T | undefined, next: () => void } => {
  const [index, setIndex] = useState<number>(0);
  const [val, setVal] = useState<T | undefined>(undefined);

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, items?.length || 0));
  }, [items?.length]);

  // Reset the index when the items change
  useEffect(() => {
    setIndex(0);
  }, [items]);

  // Update the current item when the index changes or the items change
  useEffect(() => {
    if(items && index < items.length) {
      setVal(items[index]);
    } else {
      setVal(undefined);
    }
  }, [index, items]);

  return { val, next};
}

export default useIterator;
