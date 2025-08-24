class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default class BinarySortTree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(this.array);
  }

  buildTree(array) {
    if (array.length == 0) return null;
    const uniqueArray = [...new Set(array)].sort((a, b) => a - b);

    const mid = Math.floor(uniqueArray.length / 2);
    const node = new Node(uniqueArray[mid]);
    node.left = this.buildTree(uniqueArray.slice(0, mid));
    node.right = this.buildTree(uniqueArray.slice(mid + 1));
    return node;
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insert(value, currentNode = this.root) {
    if (currentNode == null) return new Node(value);
    if (currentNode.value === value) return this.root;
    if (value < currentNode.value) {
      currentNode.left = this.insert(value, currentNode.left);
    } else if (value > currentNode.value) {
      currentNode.right = this.insert(value, currentNode.right);
    }
    return currentNode;
  }
}
