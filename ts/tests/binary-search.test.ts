import { orderedNumbers } from "./utils.ts";
import { assertEquals } from "./dependencies.ts";
import { binarySearch } from "../src/index.ts";

Deno.test("binary search", async (t) => {
  await t.step("with contained value #1", () => {
    const actual = binarySearch(11, orderedNumbers);
    const expected = 4;
    assertEquals(actual, expected);
  });

  await t.step("with contained value #2", () => {
    const actual = binarySearch(123, orderedNumbers);
    const expected = 9;
    assertEquals(actual, expected);
  });

  await t.step("with un-contained value #1", () => {
    const actual = binarySearch(12, orderedNumbers);
    const expected = undefined;
    assertEquals(actual, expected);
  });

  await t.step("with un-contained value #2", () => {
    const actual = binarySearch(1000, orderedNumbers);
    const expected = undefined;
    assertEquals(actual, expected);
  });
});
