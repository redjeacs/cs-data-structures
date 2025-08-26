class Node {
  constructor(row, column, moves = []) {
    this.row = row;
    this.column = column;
    this.moves = moves;
  }
}

function possibleMoves(node) {
  const moves = [
    [2, 1],
    [2, -1],
    [1, 2],
    [1, -2],
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
  ];
  node.moves = moves
    .map(([x, y]) => [x + node.row, y + node.column])
    .filter(([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7);
}

const test = new Node(0, 0);

class Graph {
  constructor() {
    this.board = [];
  }
}

export { Node, possibleMoves };
