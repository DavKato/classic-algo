import { Comparator, defaultComparator } from "../utils.ts";

export class BinaryHeap<T> {
  private array: T[] = [];
  private compare: (idx1: number, idx2: number) => number;

  constructor(compare: Comparator<T> = defaultComparator) {
    this.compare = (idx1: number, idx2: number) =>
      compare(this.array[idx1], this.array[idx2]);
  }

  public consume(): T | undefined {
    if (this.length < 2) return this.array.pop();

    const current = this.array[0];

    this.array[0] = this.array.pop()!;

    this.trickleDown(0);

    return current;
  }

  public insert(value: T) {
    this.array.push(value);
    this.trickleUp(this.length - 1);
  }

  public read(): T | undefined {
    return this.array[0];
  }

  public get length(): number {
    return this.array.length;
  }

  private trickleUp(idx: number) {
    if (idx === 0) return;

    const parentIndex = this.parentIndex(idx);

    if (this.compare(idx, parentIndex) < 0) {
      this.swap(idx, parentIndex);
      this.trickleUp(parentIndex);
    }
  }

  private trickleDown(idx: number) {
    const nextIdx = this.nextIdx(idx);

    if (nextIdx && this.compare(idx, nextIdx) > 0) {
      this.swap(idx, nextIdx);
      this.trickleDown(nextIdx);
    }
  }

  private parentIndex(idx: number) {
    return Math.floor((idx - 1) / 2);
  }

  private leftChildIndex(idx: number) {
    return (idx * 2) + 1;
  }

  private rightChildIndex(idx: number) {
    return (idx * 2) + 2;
  }

  private nextIdx(idx: number): number | undefined {
    const leftIdx = this.leftChildIndex(idx);
    const rightIdx = this.rightChildIndex(idx);

    if (this.array[leftIdx] == null) return;
    if (this.array[rightIdx] == null) return leftIdx;

    return this.compare(leftIdx, rightIdx) > 0 ? rightIdx : leftIdx;
  }

  private swap(idx1: number, idx2: number) {
    [this.array[idx1], this.array[idx2]] = [this.array[idx2], this.array[idx1]];
  }
}
