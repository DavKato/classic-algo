import { Comparator, defaultComparator } from "../utils.ts";
type Destination = "left" | "right";

export class Node<T> {
  public left: Node<T> | undefined;
  public right: Node<T> | undefined;

  constructor(public value: T) {}
}

export class BinarySearchTree<T> {
  private root: Node<T> | undefined;
  private count = 0;

  constructor(private compare: Comparator<T> = defaultComparator) {}

  search(value: T, node = this.root): Node<T> | undefined {
    if (!node || value === node.value) return node;

    const destination = this.compare(value, node.value) > 0
      ? node.right
      : node.left;
    if (!destination) return;

    return this.search(value, destination);
  }

  insert(value: T, node = this.root): boolean {
    if (!node) {
      this.root = new Node(value);
      this.count++;
      return true;
    }

    if (value === node.value) return false;

    const destination: Destination = this.compare(value, node.value) > 0
      ? "right"
      : "left";

    if (node[destination]) {
      return this.insert(value, node[destination]);
    }

    node[destination] = new Node(value);
    this.count++;
    return true;
  }

  delete(value: T): boolean {
    if (!this.root) return false;

    let deleted = false;

    const _delete = (node: Node<T> | undefined): Node<T> | undefined => {
      if (!node) {
        return;
      }

      const comparison = this.compare(value, node.value);

      if (comparison > 0) {
        node.right = _delete(node.right);
        return;
      }

      if (comparison < 0) {
        node.left = _delete(node.left);
        return;
      }

      deleted = true;
      this.count--;

      if (!node.right) {
        return node.left;
      }

      if (!node.left) {
        return node.right;
      }

      node.right = this.lift(node.right, node);
    };

    _delete(this.root);

    return deleted;
  }

  private lift(node: Node<T>, nodeToDelete: Node<T>): Node<T> | undefined {
    if (node.left) {
      return this.lift(node.left, node);
    }

    nodeToDelete.value = node.value;
    return node.right;
  }

  get length(): number {
    return this.count;
  }

  /**
   * In order traversal.
   * Optional payload will be returned at the end of the traversal.
   */
  traverse<P>(
    cb: TraverseCb<T, P>,
    payload?: P,
    node = this.root,
  ) {
    if (node) {
      node.left && this.traverse(cb, payload, node.left);
      cb(node, payload!);
      node.right && this.traverse(cb, payload, node.right);

      return payload;
    }
  }
}

export type TraverseCb<T, P> = (node: Node<T>, payload: P) => void;
