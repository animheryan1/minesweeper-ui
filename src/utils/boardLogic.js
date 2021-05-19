function getEmptyBoard(row, col) {
  let board = [];
  for (let i = 0; i < row; i++) {
    let boardRow = [];
    for (let j = 0; j < col; j++) {
      boardRow.push({
        x: i,
        y: j,
        isBomb: false,
        neighbourCount: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false,
      });
    }
    board.push(boardRow);
  }
  return board;
}

function setBombs(board, bombCount, row, col) {
  let count = 0;
  while (count < bombCount) {
    let x = Math.floor(Math.random() * row);
    let y = Math.floor(Math.random() * col);

    if (!board[x][y].isBomb) {
      board[x][y].isBomb = true;
      count++;
    }
  }
}

function setNeighbourCount(board, row, col) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j].isBomb) {
        continue;
      }
      let neighbourCount = 0;
      const neighbours = getNeighbourCells(board, i, j);

      neighbours.forEach((neighbour) => {
        if (neighbour.isBomb) {
          neighbourCount++;
        }
      });
      if (neighbourCount === 0) {
        board[i][j].isEmpty = true;
      }
      board[i][j].neighbourCount = neighbourCount;
    }
  }
}

function getNeighbourCells(board, x, y) {
  const neighbours = [];
  const row = board.length;
  const col = board[0].length;

  //top
  if (x > 0) {
    neighbours.push(board[x - 1][y]);
  }

  //top right
  if (x > 0 && y < col - 1) {
    neighbours.push(board[x - 1][y + 1]);
  }

  //right
  if (y < col - 1) {
    neighbours.push(board[x][y + 1]);
  }

  //bottom right
  if (x < row - 1 && y < col - 1) {
    neighbours.push(board[x + 1][y + 1]);
  }

  //bottom
  if (x < row - 1) {
    neighbours.push(board[x + 1][y]);
  }

  //bottom left
  if (x < row - 1 && y > 0) {
    neighbours.push(board[x + 1][y - 1]);
  }

  //left
  if (y > 0) {
    neighbours.push(board[x][y - 1]);
  }

  //top left
  if (x > 0 && y > 0) {
    neighbours.push(board[x - 1][y - 1]);
  }
  return neighbours;
}

export function createBoard({ bombCount, row, col }) {
  const board = getEmptyBoard(row, col);
  setBombs(board, bombCount, row, col);
  setNeighbourCount(board, row, col);
  return board;
}

export function openCells(board, x, y) {
  const neighbors = getNeighbourCells(board, x, y);
  neighbors.forEach((neighbor) => {
    if (
      !neighbor.isFlagged &&
      !neighbor.isRevealed &&
      (neighbor.isEmpty || !neighbor.isBomb)
    ) {
      board[neighbor.x][neighbor.y].isRevealed = true;

      if (neighbor.isEmpty) {
        openCells(board, neighbor.x, neighbor.y);
      }
    }
  });
}

export function openBoard(board) {
  board.forEach((boardRow) => {
    boardRow.forEach((item) => {
      item.isRevealed = true;
    });
  });
}

export function getHiddenCount(board) {
  let hiddenCount = 0;
  board.forEach((boardRow) => {
    boardRow.forEach((item) => {
      if (!item.isRevealed) {
        hiddenCount++;
      }
    });
  });
  return hiddenCount;
}
