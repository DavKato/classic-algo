import { Comparator, defaultComparator } from "../utils.ts";

/**
 * Always: O(N^2)
 */
export const bubbleSort = <T>(
  arr: T[],
  compare: Comparator<T> = defaultComparator,
): T[] => {
  for (let concreteIdx = arr.length - 1; concreteIdx > 1; concreteIdx--) {
    for (let i = 0; i < concreteIdx; i++) {
      if (compare(arr[i], arr[i + 1]) > 0) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }

  return arr;
};
