import { Comparator, defaultComparator } from "../utils.ts";

/**
 * Best: O(N)
 * Average: O(N^2)
 * Worst: O(N^2)
 */
export const insertionSort = <T>(
  arr: T[],
  compare: Comparator<T> = defaultComparator,
): T[] => {
  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i];
    let pointer = i - 1;

    while (pointer >= 0) {
      if (compare(arr[pointer], temp) < 0) {
        break;
      }

      arr[pointer + 1] = arr[pointer];
      pointer--;
    }

    arr[pointer + 1] = temp;
  }

  return arr;
};
