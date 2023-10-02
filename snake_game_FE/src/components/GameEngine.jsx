import { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import Board from "./Board";
import { Snake, handleKeyPress } from "../utils/snake";
import { generateFood, initialBoardValue, updateBoard } from "../utils/board";
import { useDispatch, useSelector } from "react-redux";
import { setCreateFood, setFoodPosition } from "../store/food";
import { setIsPaused, setScore } from "../store/game";

let intervalId = null;

function Game() {
  const [board, setBoard] = useState(initialBoardValue);

  const { position: foodPosition, createFood } = useSelector((state) => state.food);
  const { dirX, dirY, body } = useSelector((state) => state.snake);
  const { isPaused, level } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const snake = new Snake(dirX, dirY, cloneDeep(body), dispatch);

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        dispatch(setIsPaused(true));
      }
      if (event.code === "Enter") {
        dispatch(setIsPaused(false));
      }
      handleKeyPress(event, snake);
    });
  }, [isPaused]);

  useEffect(() => {
    updateBoard(cloneDeep(initialBoardValue), snake.body, foodPosition, setBoard);

    if (!isPaused) {
      intervalId = setInterval(() => {

        if (createFood) {
          dispatch(setFoodPosition(generateFood(snake.body)));
          dispatch(setCreateFood(false));
        }

        const ateFood = snake.eat(foodPosition);

        if (ateFood) {
          dispatch(setCreateFood(true));
          dispatch(setScore((snake.body.length - 1) * level));
        } else {
          snake.updatePosition();
        }

        updateBoard(cloneDeep(initialBoardValue), snake.body, foodPosition, setBoard);
      }, Math.floor(250 / level));
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [foodPosition, createFood, dirX, dirY, body, isPaused]);

  return (
    <>
      <Board board={board} />
    </>
  );
}

export default Game;
