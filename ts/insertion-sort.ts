import { defaultComparator } from "./utils.ts";

/**
 * O(N^2)
 * comparisons: N^2/2
 * shifts: N^2/2
 * removals: N-1
 * insertions: N-1
 * Total: N^2 + 2N - 2
 */
export const insertionSort = <T>(
  arr: T[],
  compare = defaultComparator,
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
