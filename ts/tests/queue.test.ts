import { assertEquals } from "./dependencies.ts";

import { Queue } from "../src/index.ts";

Deno.test("queue with doubly linked list", () => {
  const queue = new Queue();

  assertEquals(
    queue.next(),
    undefined,
    "calling next() on empty queue should return undefined",
  );

  queue.add("test");
  queue.add(1);

  assertEquals(queue.next(), "test");
  assertEquals(queue.next(), 1);
  assertEquals(queue.next(), undefined);
});
