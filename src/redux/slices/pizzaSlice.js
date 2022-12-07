import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { order, category, search, sortBy, currentPage } = params;
  const { data } = await axios.get(
    `https://6386701e875ca3273d59a675.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
  );

  if (data.length === 0) {
    return thunkAPI.rejectWithValue('Пицц нет');
  }

  return thunkAPI.fulfillWithValue(data);
});

const initialState = {
  items: [],
  status: 'loading', // loading | succes | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, actions) => {
      state.items = actions.payload;
      state.status = 'succes';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = pizzaSlice.actions;

export const selectPizzaData = (state) => state.pizza;

export default pizzaSlice.reducer;
