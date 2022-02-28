import { assertEquals } from "./dependencies.ts";

import { Comparator } from "../utils.ts";
import {
  orderedNumbers,
  orderedStrings,
  stringComparator,
  unOrderedNumbers,
  unOrderedStrings,
} from "./utils.ts";
import { BinaryHeap } from "../structures/binary-heap.ts";

const setupSetup = <T>(comparator?: Comparator<T>) =>
  (values: T[]): BinaryHeap<T> => {
    const heap = new BinaryHeap<T>(comparator);
    values.forEach((v) => heap.insert(v));
    return heap;
  };

const runWith = <T extends string | number>(
  dataset: T[],
  comparator?: Comparator<T>,
) =>
  async (t: Deno.TestContext) => {
    const setup = setupSetup(comparator);

    await t.step("inserting", async (t2) => {
      await t2.step("an existing value", () => {
        const heap = setup(dataset);

        const before = heap.length;
        heap.insert(dataset[4]);
        const after = heap.length;

        assertEquals(after - before, 1);
      });

      await t2.step("an unique value", () => {
        const heap = setup(dataset);
        const uniqueVal = unique(dataset[0]);

        const before = heap.length;
        heap.insert(uniqueVal);
        const after = heap.length;

        assertEquals(after - before, 1);
      });
    });

    await t.step("length is correct", () => {
      const heap = setup(dataset);

      const actual = heap.length;
      const expected = dataset.length;
      assertEquals(actual, expected);
    });

    await t.step("consuming", () => {
      const heap = setup(dataset);

      const actual: T[] = [];

      while (heap.read() != null) {
        actual.push(heap.consume()!);
      }

      const expected = typeof dataset[0] === "string"
        ? orderedStrings
        : orderedNumbers;

      assertEquals(actual, expected);
      assertEquals(heap.length, 0);
    });

    await t.step("reading", () => {
      const heap = setup(dataset);

      const actual = heap.read();

      const expected = typeof dataset[0] === "string"
        ? orderedStrings[0]
        : orderedNumbers[0];

      assertEquals(actual, expected);
      assertEquals(heap.length, dataset.length);
    });
  };

Deno.test("binary search tree", async (t) => {
  await t.step(
    "with default comparator and array of numbers",
    runWith(unOrderedNumbers),
  );
  await t.step(
    "with custom comparator and array of strings",
    runWith(unOrderedStrings, stringComparator),
  );
});

// @ts-ignore
const unique = <T extends string | number>(base: T): T => base + 777;
