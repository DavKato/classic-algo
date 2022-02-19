import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import { orderedStrings, unOrderedNumbers, unOrderedStrings } from "./utils.ts";
import { quickSelect } from "../quick-select.ts";

Deno.test("quickSelect", async (t) => {
  await t.step("default comparison for array with numbers", () => {
    const actual = quickSelect(3, unOrderedNumbers);
    const expected = 7;

    assertEquals(actual, expected);
  });

  await t.step("returns undefined when targetIdx is out of range", () => {
    const actual = quickSelect(12, unOrderedNumbers);
    const expected = undefined;

    assertEquals(actual, expected);
  });

  await t.step("can provide a custom comparator", () => {
    const pred = (a: string, b: string): number =>
      orderedStrings.indexOf(a) - orderedStrings.indexOf(b);

    const actual = quickSelect(1, unOrderedStrings, pred);
    const expected = "Jude";

    assertEquals(actual, expected);
  });
});
