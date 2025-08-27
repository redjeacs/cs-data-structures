class Node {
  constructor([row, column], parent = null) {
    this.row = row;
    this.column = column;
    this.parent = parent;
  }
}

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

function possibleMoves(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

export default function knightMoves(start, end) {
  const startNode = new Node(start);
  const queue = [startNode];
  const visited = new Set();
  visited.add(`${start[0]}, ${start[1]}`);

  while (queue) {
    const currentNode = queue.shift();

    if (currentNode.row == end[0] && currentNode.column == end[1]) {
      const path = [];
      let temp = currentNode;
      while (temp !== null) {
        path.unshift([temp.row, temp.column]);
        temp = temp.parent;
      }
      console.log(
        `You made it in ${path.length - 1} moves! Here's your path: `,
      );
      for (const move in path) console.log(path[move]);
      return path;
    }

    for (const [dx, dy] of moves) {
      const newX = currentNode.row + dx;
      const newY = currentNode.column + dy;
      const newMove = `${newX}, ${newY}`;

      if (possibleMoves(newX, newY) && !visited.has(newMove)) {
        visited.add(newMove);
        queue.push(new Node([newX, newY], currentNode));
      }
    }
  }
  return null;
}
