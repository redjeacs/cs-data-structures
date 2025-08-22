export default class Node {
  constructor(key = null, value = null) {
    this.next = null;
    this.key = key;
    this.value = value;
  }
}
