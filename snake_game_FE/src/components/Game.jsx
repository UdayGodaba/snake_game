import { Alert, Box, Button, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import GameEngine from "./GameEngine";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCreateFood, setFoodPosition } from '../store/food';
import game, { setGameOver, setIsPaused, setLevel, setScore } from '../store/game';
import { setBody, setDirection } from '../store/snake';
import axios from 'axios';


const Game = () => {

  const API_URL = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { dirX, dirY, body } = useSelector((state) => state.snake);
  const { level: difficulty, IsPaused, score, gameOver } = useSelector((state) => state.game);
  const { position } = useSelector((state) => state.food);

  const handleSaveGame = async () => {
    dispatch(setIsPaused(true));

    try {
      const reponse = await axios.post(`${API_URL}/api/game`, {
        dirX, dirY, body, position, level: difficulty, IsPaused, score
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      navigate("/home");
    } catch (error) {
      console.log("Save game error");
    }

  };

  const handleResetGame = () => {
    setGameState(0, 1, [[0, 0]], [], difficulty, 0);
    dispatch(setGameOver(false));
  };

  const handleExitGame = () => {
    dispatch(setGameOver(false));
    navigate("/home");
  };

  // To handle overall state of game
  const setGameState = (dirX, dirY, body, position, level, score) => {
    dispatch(setFoodPosition(position));
    let food = true;
    if (position.length) {
      food = false;
    }
    dispatch(setCreateFood(food));
    dispatch(setLevel(level));
    dispatch(setIsPaused(true));
    dispatch(setScore(score));
    dispatch(setDirection({ dirX: dirX, dirY: dirY }));
    dispatch(setBody(body));
  };

  return (
    <Box
      p={3}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "5%",
      }}>

      <Paper elevation={3} style={{ padding: '10px', marginBottom: "2%" }}>
        <Typography variant="h6">Score: <span id="score-display">{score}</span></Typography>
      </Paper>

      <GameEngine />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "3%"
        }}
      >
        <Button variant="contained" color="primary" onClick={handleResetGame} style={{ marginRight: '30%' }}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveGame} style={{ marginRight: '30%' }}>
          Save
        </Button>
        <Button variant="contained" color="primary" onClick={handleExitGame}>
          Exit
        </Button>
      </Box>
      {gameOver &&
        <Alert severity="info">Game Over!</Alert>
      }
    </Box >
  )
};

export default Game;