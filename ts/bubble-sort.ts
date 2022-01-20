import { defaultComparator } from "./utils.ts";

/**
 * O(N^2)
 * comparisons: N^2/2
 * swaps: N^2/2
 *
 * Always: N^2
 */
export const bubbleSort = <T>(
  arr: T[],
  compare = defaultComparator,
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
