class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class BinarySortTree {
  constructor(array) {
    this.array = array;
    this.root = root;
  }
  buildTree(array) {
    const sortedArray = this.array.sort((a, b) => a - b);
    return sortedArray;
  }
}
