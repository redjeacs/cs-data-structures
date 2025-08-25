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

  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(value, currentNode = this.root) {
    if (currentNode == null) return currentNode;
    if (currentNode.value > value) {
      currentNode.left = this.deleteItem(value, currentNode.left);
    } else if (currentNode.value < value) {
      currentNode.right = this.deleteItem(value, currentNode.right);
    } else {
      if (currentNode.left == null) return currentNode.right;
      if (currentNode.right == null) return currentNode.left;

      let succ = this.getSuccessor(currentNode);
      currentNode.value = succ.value;
      currentNode.right = this.deleteItem(succ.value, currentNode.right);
    }
    return currentNode;
  }

  find(value, currentNode = this.root) {
    if (currentNode == null || currentNode.value == value) return currentNode;
    if (currentNode.value > value) return this.find(value, currentNode.left);
    if (currentNode.value < value) return this.find(value, currentNode.right);
  }

  levelOrderForEach(callback, root = this.root) {
    if (callback == null || typeof callback !== 'function')
      throw new Error('Callback function required');
    if (root == null) return null;
    let queue = [root];
    let visitedNode = 0;
    while (queue.length > visitedNode) {
      const current = queue[visitedNode];
      callback(current);
      visitedNode++;
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  preOrderForEach(callback, root = this.root) {
    if (callback == null || typeof callback !== 'function')
      throw new Error('Callback function required');
    if (root == null) return null;
    callback(root);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  postOrderForEach(callback, root = this.root) {
    if (callback == null || typeof callback !== 'function')
      throw new Error('Callback function required');
    if (root == null) return null;
    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);
    callback(root);
  }

  inOrderForEach(callback, root = this.root) {
    if (callback == null || typeof callback !== 'function')
      throw new Error('Callback function required');
    if (root == null) return null;
    this.inOrderForEach(callback, root.left);
    callback(root);
    this.inOrderForEach(callback, root.right);
  }

  height(value, currentNode = this.find(value)) {
    if (currentNode == null) return 0;
    const leftHeight = this.height(value, currentNode.left);
    const rightHeight = this.height(value, currentNode.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, currentNode = this.root) {
    if (currentNode == null) return 0;
    if (currentNode.value > value) {
      return 1 + this.depth(value, currentNode.left);
    }
    if (currentNode.value < value) {
      return 1 + this.depth(value, currentNode.right);
    } else {
      return 0;
    }
  }

  isBalanced() {
    return this.isBalancedHelper(this.root) > 0 ? 'True' : false;
  }

  isBalancedHelper(root) {
    if (root == null) return 0;
    let leftHeight = this.isBalancedHelper(root.left);
    let rightHeight = this.isBalancedHelper(root.right);

    if (
      leftHeight == -1 ||
      rightHeight == -1 ||
      Math.abs(leftHeight - rightHeight) > 1
    )
      return -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  reBalance() {
    const array = [];
    this.inOrderForEach((node) => {
      array.push(node.value);
    });
    this.root = this.buildTree(array);
  }
}
