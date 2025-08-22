import Node from './node';

export default class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(value) {
    const newNode = new Node(value);
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

  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  size() {
    return this.size;
  }

  head() {
    return this.head;
  }

  tail() {
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

  contains(value) {
    let current = this.head;
    for (let i = 0; i < this.size; i++) {
      if (current.value == value) return true;
      else current = current.next;
    }
    return false;
  }

  find(value) {
    let current = this.head;
    let index = 0;
    for (let i = 0; i < this.size; i++) {
      if (current.value == value) return index;
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
      string += `( ${current.value} ) -> `;
      current = current.next;
    }
    string += 'null';
    return string;
  }

  insertAt(value, index) {
    if (this.head == null) this.append(value);
    let current = this.head;
    let previous = null;
    const newNode = new Node(value);
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

    for (let i = 0; i < index; i++) {
      previous = current;
      current = current.next;
      if (current == null) return 'there is no item at this index';
    }
    previous.next = current.next;
    this.size--;
  }
}
