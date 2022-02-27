import { assertEquals } from "./dependencies.ts";
import {
  stringComparator,
  unOrderedNumbers,
  unOrderedStrings,
} from "./utils.ts";
import { quickSelect } from "../index.ts";

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
    const actual = quickSelect(1, unOrderedStrings, stringComparator);
    const expected = "Jude";

    assertEquals(actual, expected);
  });
});
