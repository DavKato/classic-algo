import { assertEquals } from "./dependencies.ts";

import { Trie } from "../structures/trie.ts";

Deno.test("Autocomplete using trie", () => {
  const trie = new Trie();

  const items: [string, number?][] = [
    ["apple", 40],
    ["alloy", 70],
    ["banana", 90],
    ["bamboo"],
  ];
  items.forEach((item) => trie.insert(item[0], item[1]));

  assertEquals(trie.autocomplete("a"), ["alloy", "apple"]);
  assertEquals(trie.autocomplete("a", 1), ["alloy"]);
  assertEquals(trie.autocomplete("all"), ["alloy"]);
  assertEquals(trie.autocomplete("b"), ["banana", "bamboo"]);
});
