class Node {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.moves = this.possibleMoves();
  }

  possibleMoves() {
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
    return moves
      .map(([x, y]) => [x + this.row, y + this.column])
      .filter(([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7);
  }
}

class Graph {
  constructor() {
    this.board = this.populateBoard();
  }

  populateBoard() {
    const board = [];
    for (let i = 0; i < 8; i++) {
      board[i] = [];
      for (let j = 0; j < 8; j++) {
        const newNode = new Node(i, j);
        board[i][j] = newNode;
      }
    }
    return board;
  }

  knightMoves(start, end) {
    const startNode = this.board[(start[0], start[1])];
    const endNode = this.board[(end[0], end[1])];
    if (!startNode || !endNode) throw new Error('Please enter a valid square');
  }
}

export { Node, Graph };
