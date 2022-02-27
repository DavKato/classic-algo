import { assertEquals } from "./dependencies.ts";

import { Comparator } from "../utils.ts";
import {
  BinarySearchTree,
  Node,
  TraverseCb,
} from "../structures/binary-search-tree.ts";
import {
  orderedNumbers,
  orderedStrings,
  stringComparator,
  unOrderedNumbers,
  unOrderedStrings,
} from "./utils.ts";

const setupSetup = <T>(comparator?: Comparator<T>) =>
  (values: T[]): BinarySearchTree<T> => {
    const bst = new BinarySearchTree<T>(comparator);
    values.forEach((v) => bst.insert(v));
    return bst;
  };

const runWith = <T extends string | number>(
  dataset: T[],
  comparator?: Comparator<T>,
) =>
  async (t: Deno.TestContext) => {
    const setup = setupSetup(comparator);

    await t.step("inserting", async (t2) => {
      await t2.step("an existing value", () => {
        const bst = setup(dataset);

        const before = bst.length;
        const inserted = bst.insert(dataset[4]);
        const after = bst.length;

        assertEquals(after - before, 0, "length shouldn't change");
        assertEquals(inserted, false, "insert() should return false");
      });

      await t2.step("an unique value", () => {
        const bst = setup(dataset);
        const uniqueVal = unique(dataset[0]);

        const before = bst.length;
        const inserted = bst.insert(uniqueVal);
        const after = bst.length;

        assertEquals(after - before, 1, "tree's length should be increased");
        assertEquals(inserted, true, "insert() should return true");
      });
    });

    await t.step("length is correct", () => {
      const bst = setup([...dataset, dataset[4]]);

      const actual = bst.length;
      const expected = dataset.length;
      assertEquals(actual, expected);
    });

    await t.step("searching", async (t2) => {
      const bst = setup(dataset);

      await t2.step("an existing value", () => {
        const searchVal = dataset[4];
        const node = bst.search(searchVal);

        assertEquals(
          node instanceof Node,
          true,
          "returned value should be a Node instance.",
        );
        assertEquals(
          node?.value,
          searchVal,
          "returned value should be equal to the search value",
        );
      });

      await t2.step("an non existing value", () => {
        const searchVal = unique(dataset[4]);

        const actual = bst.search(searchVal);
        const expected = undefined;
        assertEquals(actual, expected, "returned value should be undefined");
      });
    });

    await t.step("traversing", () => {
      const bst = setup(dataset);
      const cb: TraverseCb<T, T[]> = (node, data) => {
        data.push(node.value);
      };

      const actual = bst.traverse(cb, []);
      const expected = typeof dataset[0] === "string"
        ? orderedStrings
        : orderedNumbers;

      assertEquals(actual, expected);
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
