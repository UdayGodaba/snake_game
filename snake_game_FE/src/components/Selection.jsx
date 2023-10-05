import React, { useState } from 'react';
import { Alert, Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { setCreateFood, setFoodPosition } from '../store/food';
import { setIsPaused, setLevel, setScore } from '../store/game';
import { setBody, setDirection } from '../store/snake';


const Selection = () => {

  const API_URL = import.meta.env.VITE_API_URL;

  const [pageType, setPageType] = useState("selection");
  const [noSave, setNoSave] = useState(false);
  const isSelect = pageType === "selection";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleClick = async (isOld, lev) => {
    try {
      if (!isOld) {
        setGameState(0, 1, [[0, 0]], [], lev, 0);
        navigate("/game");
      } else {
        const gameSavedState = await axios.get(`${API_URL}/api/game`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (gameSavedState.data?.value) {
          const { dirX, dirY, body, position, level, score } = gameSavedState.data.value;
          setGameState(dirX, dirY, body, position, level, score);
          navigate("/game");
        } else {
          setNoSave(true);
          console.log("No saved game exists");
        }
      }
    } catch (error) {
      console.log(error);
    }
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
    <Box p={3} sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "10%",
    }}>
      <h1>Welcome to the Game!</h1>
      {isSelect &&
        <>
          <Box mt={5}>
            <Button variant="contained" color="primary" onClick={() => setPageType("options")}>
              New Game
            </Button>
          </Box>
          <Box mt={2} mb={2}>
            <Button variant="contained" color="secondary" onClick={() => handleClick(1, 1)}>
              Load Game
            </Button>
          </Box>
          {noSave &&
            <Alert severity="info">No saved game exists!</Alert>
          }
        </>
      }
      {!isSelect &&
        <>
          <h3>Choose Difficulty</h3>
          <Box gap={1} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}>
            <Button variant="contained" color="primary" onClick={() => handleClick(0, 1)}>
              Easy
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleClick(0, 2)}>
              Medium
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleClick(0, 3)}>
              Hard
            </Button>
          </Box>
        </>
      }
      <Box mt={5}>
        <h3>Instructions</h3>
        <p>Press Space to pause the game.</p>
        <p>Press Enter to continue/play.</p>
      </Box>
    </Box >
  )
};

export default Selection;