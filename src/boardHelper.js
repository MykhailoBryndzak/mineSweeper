export const createEmptyBoard = (height, width) => {
  let board = [];

  for (let i = 0; i < height; i++) {
    board.push([]);
    for (let j = 0; j < width; j++) {
      board[i][j] = {
        x: i,
        y: j,
        isCellBomb: false,
        countBombsNear: 0,
        isCellOpen: false,
        isCellEmpty: false,
      };
    }
  }
  return board;
};

export const getRandomNumber = (dimension) => {
  // random not bigger that dimension or returns 0
  return Math.floor(Math.random() * 1000 + 1) % dimension;
};

const plantBombs = (board, height, width, bombs) => {
  let bombsPlanted = 0;

  while (bombsPlanted < bombs) {
    let randomX = getRandomNumber(height);
    let randomY = getRandomNumber(width);

    if (!board[randomX][randomY].isCellBomb) {
      board[randomX][randomY].isCellBomb = true;
      bombsPlanted++;
    }
  }

  return board;
};

// looks for neighboring cells and returns them
export const getNeighborCells = (x, y, board, height, width) => {
  const neighborCells = [];

  //up
  if (x > 0) {
    neighborCells.push(board[x - 1][y]);
  }

  //down
  if (x < height - 1) {
    neighborCells.push(board[x + 1][y]);
  }

  //left
  if (y > 0) {
    neighborCells.push(board[x][y - 1]);
  }

  //right
  if (y < width - 1) {
    neighborCells.push(board[x][y + 1]);
  }

  // top left
  if (x > 0 && y > 0) {
    neighborCells.push(board[x - 1][y - 1]);
  }

  // top right
  if (x > 0 && y < width - 1) {
    neighborCells.push(board[x - 1][y + 1]);
  }

  // bottom right
  if (x < height - 1 && y < width - 1) {
    neighborCells.push(board[x + 1][y + 1]);
  }

  // bottom left
  if (x < height - 1 && y > 0) {
    neighborCells.push(board[x + 1][y - 1]);
  }

  return neighborCells;
};

// get number of neighboring bombs for each board cell
export const getNeighbors = (board, height, width) => {
  const updatedBoard = [...board];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (!board[i][j].isCellBomb) {
        let bombs = 0;
        const areaAroundCell = getNeighborCells(
          board[i][j].x,
          board[i][j].y,
          board,
          height,
          width
        );
        areaAroundCell.forEach((value) => {
          if (value.isCellBomb) {
            bombs++;
          }
        });
        if (bombs === 0) {
          updatedBoard[i][j].isCellEmpty = true;
        }
        updatedBoard[i][j].countBombsNear = bombs;
      }
    }
  }

  return updatedBoard;
};

export const findEmpty = (x, y, board, height, width) => {
  const areaAroundCell = getNeighborCells(x, y, board, height, width);

  areaAroundCell.forEach((cell) => {
    if (!cell.isCellOpen && (cell.isCellEmpty || !cell.isCellBomb)) {
      board[cell.x][cell.y].isCellOpen = true;
      if (cell.isCellEmpty) {
        findEmpty(cell.x, cell.y, board, height, width);
      }
    }
  });

  return board;
};

export const initializeBoard = (height, width, bombs) => {
  let board = createEmptyBoard(height, width);
  board = plantBombs(board, height, width, bombs);
  board = getNeighbors(board, height, width);
  return board;
};
