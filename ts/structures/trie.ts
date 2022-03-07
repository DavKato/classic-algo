import { BinaryHeap } from "./binary-heap.ts";

type Node = Map<string, Node> & Map<"*", number>;
type Weighted = { value: string; weight: number };

const FIN = "*";
export class Trie {
  private root: Node = new Map();

  constructor() {}

  insert(word: string, weight = 50): void {
    let currentNode = this.root;

    for (const char of word) {
      if (!currentNode.has(char)) {
        currentNode.set(char, new Map());
      }
      currentNode = currentNode.get(char)!;
    }

    currentNode.set(FIN, weight);
  }

  autocomplete(prefix: string, max = Infinity): string[] {
    const node = this.search(prefix);

    if (!node) return [];

    const heap = new BinaryHeap<Weighted>((a, b) => b.weight - a.weight);
    this.collect(node, prefix, heap);

    const results: string[] = [];
    const ceil = Math.min(max, heap.length);
    for (let i = 0; i < ceil; i++) {
      results.push(heap.consume()?.value!);
    }

    return results;
  }

  private search(word: string): Node | undefined {
    let currentNode = this.root;

    for (const char of word) {
      if (!currentNode.has(char)) {
        return undefined;
      }

      currentNode = currentNode.get(char)!;
    }

    return currentNode;
  }

  private collect<T extends BinaryHeap<Weighted>>(
    node: Node,
    word: string,
    words: T,
  ): T {
    for (const [char, childNode] of node.entries()) {
      if (isFin(char, childNode)) {
        words.insert({ value: word, weight: childNode });
      } else {
        this.collect(childNode, `${word}${char}`, words);
      }
    }

    return words;
  }
}

const isFin = (char: string, _node: unknown): _node is number => char === FIN;
