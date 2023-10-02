import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Game from '../../components/Game';
import ScoreBoard from "../../components/ScoreBoard";

const GamePage = () => {
  return (
    <Grid container sx={{ height: "93vh" }}>
      <Grid item xs={8} sx={{ backgroundColor: "#fff0ff" }}>
        <Game />
      </Grid>
      <Grid item xs={4} sx={{ backgroundColor: "#d9c9cf" }}>
        <ScoreBoard />
      </Grid>
    </Grid>
  )
}

export default GamePage;