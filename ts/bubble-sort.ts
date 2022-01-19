import { defaultComparator } from "./utils.ts";

export default <T>(
  arr: T[],
  compare = defaultComparator,
): T[] => {
  for (let concreteIdx = arr.length - 1; concreteIdx > 1; concreteIdx--) {
    for (let i = 0; i < concreteIdx; i++) {
      const current = arr[i];
      const next = arr[i + 1];
      if (compare(current, next) > 0) {
        arr[i] = next;
        arr[i + 1] = current;
      }
    }
  }

  return arr;
};
