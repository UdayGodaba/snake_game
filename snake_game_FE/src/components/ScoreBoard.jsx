import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box
} from '@mui/material';
import { useSelector } from 'react-redux';


const ScoreBoard = () => {

  const [topScores, setTopScores] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const { gameOver, score } = useSelector((state) => state.game);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchTopScores = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/scores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setTopScores(response.data);
      }
    } catch (error) {
      console.error('Error fetching top scores:', error.message);
    }
  };

  const updateTopScores = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/scores`, {
        score
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error updating top scores:', error.message);
    }
  };

  const updateScores = async () => {
    await updateTopScores();
    await fetchTopScores();
  };

  useEffect(() => {
    if (gameOver) {
      updateScores();
    }
  }, [gameOver]);


  useEffect(() => {
    fetchTopScores();
  }, []);

  return (
    <Box p={3} sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "10%",
    }}>
      <h1>ScoreBoard</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topScores.map((score, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{score.name}</TableCell>
                <TableCell>{score.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
};

export default ScoreBoard;