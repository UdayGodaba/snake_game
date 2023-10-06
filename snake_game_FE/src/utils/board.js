export const boardSize = 15;

export const initialBoardValue = [
  ...Array(boardSize * boardSize)
    .fill(0)
    .map(() => ({
      color: "#B5CB99",
    })),
];

export const updateBoard = (board, snakeBody, foodPosition, setBoard) => {
  if (foodPosition.length == 2) {
    const foodPositionOnBoard = foodPosition[0] * boardSize + foodPosition[1];
    board[foodPositionOnBoard].color = "#B2533E";
  }

  for (let i = 0; i < snakeBody.length; i++) {
    const pos = snakeBody[i][0] * boardSize + snakeBody[i][1];
    if (pos >= 0 & pos < boardSize*boardSize) {
      board[pos].color = "#186F65";
    }
  }

  setBoard(board);
};

export const isValidPosition = (x, y, body) => {
  if (!(0 <= x && 0 <= y && x < boardSize && y < boardSize)) return false;

  for (let i = 0; i < body.length; i++) {
    const [row, col] = body[i];
    if (row == x && col == y) return false;
  }

  return true;
};

export const generateFood = (visited) => {
  while (true) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    let notVisited = true;

    for (let i = 0; i < visited.length; i++) {
      if (visited[i][0] == x && visited[i][1] == y) {
        notVisited = false;
        break;
      }
    }

    if (notVisited) return [x, y];
  }
};
