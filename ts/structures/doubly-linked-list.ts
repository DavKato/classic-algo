class Node<T = any> {
  public prev: Node | undefined;
  public next: Node | undefined;

  constructor(public value: T) {}
}

class DoublyLinkedList<T = any> {
  private first: Node<T> | undefined;
  private last: Node<T> | undefined;

  constructor() {}

  public unshift<P extends T>(value: P) {
    const node = new Node(value);

    if (this.first) {
      node.next = this.first;
      this.first.prev = node;
    } else {
      this.last = node;
    }

    this.first = node;
  }

  public shift() {
    if (!this.first) return undefined;

    const node = this.first;

    if (this.first.next) {
      this.replaceHeadWith(this.first.next);
    } else {
      this.clear();
    }

    return node.value;
  }

  public push<P extends T>(value: P) {
    const node = new Node(value);

    if (this.last) {
      node.prev = this.last;
      this.last.next = node;
    } else {
      this.first = node;
    }

    this.last = node;
  }

  public pop() {
    if (!this.last) return undefined;

    const node = this.last;

    if (this.last.prev) {
      this.replaceTailWith(this.last.prev);
    } else {
      this.clear();
    }

    return node.value;
  }

  private clear() {
    this.first = this.last = undefined;
  }

  private replaceHeadWith(newHead: Node) {
    newHead.prev = undefined;
    this.first = newHead;
  }

  private replaceTailWith(newTail: Node) {
    newTail.next = undefined;
    this.last = newTail;
  }
}

export class Queue<T = any> {
  private list = new DoublyLinkedList<T>();
  constructor() {
  }

  add<P extends T>(value: P) {
    this.list.push(value);
  }

  next() {
    return this.list.shift();
  }
}
