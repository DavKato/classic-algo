export const defaultComparator = (a: any, b: any) => {
  if (typeof a !== "number" && typeof b !== "number") {
    throw new Error(
      "Comparator needs to be specified when the array includes non-numeric value",
    );
  }
  return a - b;
};
