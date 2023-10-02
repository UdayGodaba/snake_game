import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dirX: 0,
  dirY: 1,
  body: [[0, 0]],
}

const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    setDirection: (state, action) => {
      state.dirX = action.payload.dirX;
      state.dirY = action.payload.dirY;
    },

    setBody: (state, action) => {
      state.body = action.payload;
    }
  },
})

export const { setDirection, setBody } = snakeSlice.actions;

export default snakeSlice.reducer;