import { defaultComparator } from "./utils.ts";

export default <T>(arr: T[], compare = defaultComparator): T[] => {
  const len = arr.length;

  for (let floor = 0; floor < len - 1; floor++) {
    let lowestIdx = floor;

    for (let i = floor + 1; i < len; i++) {
      if (compare(arr[lowestIdx], arr[i]) > 0) {
        lowestIdx = i;
      }
    }

    const lowest = arr[lowestIdx];
    arr[lowestIdx] = arr[floor];
    arr[floor] = lowest;
  }

  return arr;
};
