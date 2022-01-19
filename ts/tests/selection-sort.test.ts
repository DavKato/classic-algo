import {
  orderedNumbers,
  orderedStrings,
  unOrderedNumbers,
  unOrderedStrings,
} from "./utils.ts";
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import selectionSort from "../selection-sort.ts";

Deno.test("bubble sort", async (t) => {
  await t.step("default comparison for array with numbers", () => {
    const actual = selectionSort(unOrderedNumbers);
    const expected = orderedNumbers;

    assertEquals(actual, expected);
  });

  await t.step("can provide a custom comparator", () => {
    const pred = (a: string, b: string): number =>
      orderedStrings.indexOf(a) - orderedStrings.indexOf(b);

    const expected = orderedStrings;
    const actual = selectionSort(unOrderedStrings, pred);

    assertEquals(actual, expected);
  });
});
