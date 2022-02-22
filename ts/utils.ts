const isNum = (val: any) =>
  val === undefined || val === null || typeof val === "number";

export type Comparator<T> = (a: T, b: T) => number;

export const defaultComparator = (a: any, b: any) => {
  if (!isNum(a) || !isNum(b)) {
    throw new Error(
      "Comparator needs to be specified when the array includes non-numeric value",
    );
  }
  return a - b;
};
