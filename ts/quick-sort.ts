import { defaultComparator } from "./utils.ts";

const getPartitioner = <T>(arr: T[], compare = defaultComparator) =>
  (leftIndex: number, rightIndex: number): number => {
    const pivotIndex = rightIndex;
    const pivot = arr[rightIndex];
    rightIndex--;

    while (true) {
      while (compare(arr[leftIndex], pivot) < 0) {
        leftIndex++;
      }

      while (compare(arr[rightIndex], pivot) > 0) {
        rightIndex--;
      }

      if (leftIndex >= rightIndex) break;

      [arr[leftIndex], arr[rightIndex]] = [arr[rightIndex], arr[leftIndex]];

      leftIndex++;
    }

    [arr[leftIndex], arr[pivotIndex]] = [arr[pivotIndex], arr[leftIndex]];

    return leftIndex;
  };

const getSorter = <T>(arr: T[], compare = defaultComparator) => {
  const partition = getPartitioner(arr, compare);

  const sort = (leftIndex = 0, rightIndex = arr.length - 1) => {
    if (leftIndex >= rightIndex) return;

    const pivot = partition(leftIndex, rightIndex);

    sort(pivot + 1, rightIndex);
    sort(leftIndex, pivot - 1);
  };

  return sort;
};

/**
 * Best: O(N log N)
 * Average: O(N log N)
 * Worst: O(N^2)
 */
export const quickSort = <T>(arr: T[], compare = defaultComparator): T[] => {
  getSorter(arr, compare)();
  return arr;
};
