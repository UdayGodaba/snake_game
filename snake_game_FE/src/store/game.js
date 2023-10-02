import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  level: 1,
  isPaused: false,
  score: 0,
  gameOver: false,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload;
    },

    setIsPaused: (state, action) => {
      state.isPaused = action.payload;
    },

    setScore: (state, action) => {
      state.score = action.payload;
    },

    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    }
  },
})

export const { setLevel, setIsPaused, setScore, setGameOver } = gameSlice.actions;

export default gameSlice.reducer;