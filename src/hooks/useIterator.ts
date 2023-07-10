import { useState, useEffect, useCallback } from "react";

/**
  * useIterator is a hook to iterate over an array of items.
  * @param items - The array of items to iterate over.
  * @returns A tuple containing the current item and a function to move to the next item.
  * @example const [currentItem, nextItem] = useIterator([1, 2, 3]); // currentItem = 1, after a nextItem() call, currentItem = 2
  */
const useIterator = <T>(items: T[] | undefined): [T | undefined, () => void] => {
  const [index, setIndex] = useState<number>(0);
  const [currentItem, setCurrentItem] = useState<T | undefined>(undefined);

  const nextItem = useCallback(() => {
    setIndex((i) => Math.min(i + 1, items?.length || 0));
  }, [items?.length]);

  useEffect(() => {
    if(items && index < items.length) {
      setCurrentItem(items[index]);
    } else {
      setCurrentItem(undefined);
    }
  }, [index, items]);

  return [currentItem, nextItem];
}

export default useIterator;
