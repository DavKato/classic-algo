import { orderedArr1 } from "./utils.ts";
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import binarySearch from "../binary-search.ts";

Deno.test("binary search", async (t) => {
  await t.step("with contained value #1", () => {
    const actual = binarySearch(11, orderedArr1);
    const expected = 3;
    assertEquals(actual, expected);
  });

  await t.step("with contained value #2", () => {
    const actual = binarySearch(123, orderedArr1);
    const expected = 7;
    assertEquals(actual, expected);
  });

  await t.step("with un-contained value #1", () => {
    const actual = binarySearch(12, orderedArr1);
    const expected = undefined;
    assertEquals(actual, expected);
  });

  await t.step("with un-contained value #2", () => {
    const actual = binarySearch(1000, orderedArr1);
    const expected = undefined;
    assertEquals(actual, expected);
  });
});
