import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export interface TFetchPizzasArgs {
  order: string;
  category: string;
  search: string;
  sortBy: string;
  currentPage: string;
}

type TPizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

interface IPizzaSliceState {
  items: TPizza[];
  status: Status;
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'SUCCESS',
  ERROR = 'error',
}

export const fetchPizzas = createAsyncThunk<TPizza[], TFetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async (params: TFetchPizzasArgs) => {
    const { order, category, search, sortBy, currentPage } = params;
    const { data } = await axios.get(
      `https://6386701e875ca3273d59a675.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
    );

    return data;
  },
);

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | succes | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = pizzaSlice.actions;

export const selectPizzaData = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
