import Node from './node';

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(key, value) {
    const newNode = new Node(key, value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  prepend(key, value) {
    const newNode = new Node(key, value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  sizeOfList() {
    return this.size;
  }

  headNode() {
    return this.head;
  }

  tailNode() {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    this.tail = current;
    return this.tail;
  }

  at(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  pop() {
    const newTail = this.at(this.size - 2);
    newTail.next = null;
    this.size--;
  }

  contains(key) {
    let current = this.head;
    for (let i = 0; i < this.size; i++) {
      if (current.key == key) return true;
      else current = current.next;
    }
    return false;
  }

  find(key) {
    let current = this.head;
    let index = 0;
    for (let i = 0; i < this.size; i++) {
      if (current.key == key) return index;
      else {
        current = current.next;
        index++;
      }
    }
    return null;
  }

  toString() {
    let current = this.head;
    let string = '';
    for (let i = 0; i < this.size; i++) {
      string += `( ${current.key} ) -> `;
      current = current.next;
    }
    string += 'null';
    return string;
  }

  insertAt(key, value, index) {
    if (this.head == null) this.append(key, value);
    let current = this.head;
    let previous = null;
    const newNode = new Node(key, value);
    if (index <= 0 || index >= this.size - 1) {
      console.log('please enter a correct index');
      return null;
    }
    for (let i = 0; i < index; i++) {
      previous = current;
      current = current.next;
    }
    previous.next = newNode;
    newNode.next = current;
  }

  removeAt(index) {
    if (this.head == null) return 'this is already empty';

    let current = this.head;
    let previous = null;

    if (index == 0) {
      this.head = current.next;
      this.size--;
      return;
    }

    for (let i = 0; i < index; i++) {
      previous = current;
      current = current.next;
      if (current == null) return 'there is no item at this index';
    }
    previous.next = current.next;
    this.size--;
  }
}
