import { assertEquals } from "./dependencies.ts";

import {
  countChars,
  retainEvens,
  shortestPath,
  trianguler,
  xIndex,
} from "../index.ts";

Deno.test("recursive functions", async (t) => {
  await t.step("count strings", () => {
    const actual = countChars(["af", "d", "", "rec23"]);
    const expected = 8;
    assertEquals(actual, expected);
  });

  await t.step("retainEvens", () => {
    const actual = retainEvens([9, 3, 9, 5, 4, 8, 5, 6, 0]);
    const expected = [4, 8, 6, 0];
    assertEquals(actual, expected);
  });

  await t.step("triangular", () => {
    const actual = trianguler(7);
    const expected = 28;
    assertEquals(actual, expected);
  });

  await t.step("xIndex", () => {
    const actual = xIndex("supersexy exception");
    const expected = 7;
    assertEquals(actual, expected);
  });

  await t.step("shortestPath", () => {
    const grid = { row: 3, col: 4 };
    const actual = shortestPath(grid);
    const expected = 10;
    assertEquals(actual, expected);
  });
});
