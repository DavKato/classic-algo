import { assertEquals, assertThrows } from "./dependencies.ts";
import {
  mixed,
  orderedNumbers,
  orderedStrings,
  stringComparator,
  unOrderedNumbers,
  unOrderedStrings,
} from "./utils.ts";
import {
  bubbleSort,
  insertionSort,
  quickSort,
  selectionSort,
} from "../src/index.ts";

[bubbleSort, selectionSort, insertionSort, quickSort].map((sort) =>
  Deno.test(`${sort.name}`, async (t) => {
    await t.step("default comparison for array with numbers", () => {
      const actual = sort(structuredClone(unOrderedNumbers));
      const expected = orderedNumbers;

      assertEquals(actual, expected);
    });

    await t.step("can provide a custom comparator", () => {
      const expected = orderedStrings;
      const actual = sort(structuredClone(unOrderedStrings), stringComparator);

      assertEquals(actual, expected);
    });
  })
);

Deno.test(
  "custom comparator should be provided if the array includes non-numeric value",
  () => {
    assertThrows(
      () => bubbleSort(mixed),
      undefined,
      "Comparator needs to be specified when the array includes non-numeric value",
    );
  },
);
