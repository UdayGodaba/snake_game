import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  position: [],
  createFood: true
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {

    setFoodPosition: (state, action) => {
      state.position = action.payload;
    },

    setCreateFood: (state, action) => {
      state.createFood = action.payload;
    }
  },
});

export const { setFoodPosition, setCreateFood } = foodSlice.actions;

export default foodSlice.reducer;