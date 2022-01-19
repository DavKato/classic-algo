import {
  mixed,
  orderedNumbers,
  orderedStrings,
  unOrderedNumbers,
  unOrderedStrings,
} from "./utils.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
import bubbleSort from "../bubble-sort.ts";

Deno.test("bubble sort", async (t) => {
  await t.step("default comparison for array with numbers", () => {
    const actual = bubbleSort(unOrderedNumbers);
    const expected = orderedNumbers;

    assertEquals(actual, expected);
  });

  await t.step("can provide a custom comparator", () => {
    const pred = (a: string, b: string): number =>
      orderedStrings.indexOf(a) - orderedStrings.indexOf(b);

    const expected = orderedStrings;
    const actual = bubbleSort(unOrderedStrings, pred);

    assertEquals(actual, expected);
  });

  await t.step(
    "custom comparator should be provided if the array includes non-numeric value",
    () => {
      assertThrows(
        () => bubbleSort(mixed),
        undefined,
        "Comparator needs to be specified when the array includes non-numeric value",
      );
    },
  );
});
