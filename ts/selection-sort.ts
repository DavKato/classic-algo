import { defaultComparator } from "./utils.ts";

/**
 * O(N^2)
 * comparisons: N^2/2
 * swaps: N-1
 * Total: N^2/2+N-1
 */
export const selectionSort = <T>(
  arr: T[],
  compare = defaultComparator,
): T[] => {
  const len = arr.length;

  for (let floor = 0; floor < len - 1; floor++) {
    let lowestIdx = floor;

    for (let i = floor + 1; i < len; i++) {
      if (compare(arr[lowestIdx], arr[i]) > 0) {
        lowestIdx = i;
      }
    }

    [arr[floor], arr[lowestIdx]] = [arr[lowestIdx], arr[floor]];
  }

  return arr;
};
