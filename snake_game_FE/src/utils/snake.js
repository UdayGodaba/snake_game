import { setGameOver, setIsPaused } from "../store/game";
import { setBody, setDirection } from "../store/snake";
import { isValidPosition } from "./board";

export class Snake {
  constructor(dirX, dirY, body, dispatch) {
    this.dirX = dirX;
    this.dirY = dirY;
    this.body = body;
    this.dispatch = dispatch;
  }
  
  eat(foodPosition) {
    if (foodPosition.length !== 2) return false;

    const currPos = this.getCurrPosition();

    if (currPos[0] !== foodPosition[0] || currPos[1] !== foodPosition[1])
      return false;

    this.body.push([currPos[0] + this.dirX, currPos[1] + this.dirY]);
    this.dispatch(setBody(this.body));
    return true;
  }

  getCurrPosition() {
    return [...this.body[this.body.length - 1]];
  }

  updateDirection(dirX, dirY) {
    if (this.dirX == -dirX && this.dirY == -dirY) return;

    this.dirX = dirX;
    this.dirY = dirY;

    this.dispatch(setDirection({
      dirX: this.dirX,
      dirY: this.dirY,
    }));
  }

  updatePosition() {
    const [currX, currY] = this.getCurrPosition();

    if (!isValidPosition(currX + this.dirX, currY + this.dirY, this.body)) {
      this.dispatch(setIsPaused(true));
      this.dispatch(setGameOver(true));
      return;
    }

    for (let i = 0; i < this.body.length - 1; i++) {
      this.body[i][0] = this.body[i + 1][0];
      this.body[i][1] = this.body[i + 1][1];
    }

    this.body[this.body.length - 1][0] += this.dirX;
    this.body[this.body.length - 1][1] += this.dirY;

    this.dispatch(setBody(this.body));
  }

}

export const handleKeyPress = (event, snake) => {
  switch (event.code) {
    case "ArrowUp":
      snake.updateDirection(-1, 0);
      break;
    case "ArrowDown":
      snake.updateDirection(1, 0);
      break;
    case "ArrowLeft":
      snake.updateDirection(0, -1);
      break;
    case "ArrowRight":
      snake.updateDirection(0, 1);
      break;
    default:
      event.preventDefault();
  }
};
