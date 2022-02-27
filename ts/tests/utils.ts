export const orderedNumbers = [2, 3, 4, 7, 11, 42, 53, 55, 90, 123, 453];
export const unOrderedNumbers = [4, 55, 123, 2, 7, 53, 90, 11, 453, 3, 42];

export const orderedStrings = ["hey", "Jude", "don't", "be", "afraid"];
export const unOrderedStrings = ["Jude", "afraid", "be", "hey", "don't"];

export const mixed = [45, "hahaha", { id: "unique?", value: 999 }];

export const stringComparator = (
  a: string,
  b: string,
): number => orderedStrings.indexOf(a) - orderedStrings.indexOf(b);
