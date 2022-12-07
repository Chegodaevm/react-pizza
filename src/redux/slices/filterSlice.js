import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: 0,
  categoryId: 0,
  sort: {
    name: 'Популярности',
    sortProperty: 'rating',
  },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export const selectSort = (state) => state.filter.sort;
export const selectFilter = (state) => state.filter;

export default filterSlice.reducer;
