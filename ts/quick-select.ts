import { defaultComparator } from "./utils.ts";
import { getPartitioner } from "./quick-sort.ts";

const getSelector = <T>(
  targetIdx: number,
  arr: T[],
  compare = defaultComparator,
) => {
  const partition = getPartitioner(arr, compare);

  const select = (leftIndex = 0, rightIndex = arr.length - 1): T => {
    const pivot = partition(leftIndex, rightIndex);

    if (targetIdx === pivot) return arr[pivot];

    if (targetIdx > pivot) return select(pivot + 1, rightIndex);

    return select(leftIndex, pivot - 1);
  };

  return select;
};

export const quickSelect = <T>(
  targetIdx: number,
  arr: T[],
  compare = defaultComparator,
): T | undefined => {
  if (targetIdx >= arr.length) return undefined;
  return getSelector(targetIdx, arr, compare)();
};
