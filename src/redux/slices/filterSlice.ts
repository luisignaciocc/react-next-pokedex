import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'src/redux/store';

export interface FilterState {
  searchState: string;
  filteredGenerations: number[];
  filteredTypes: number[];
  filteringIsFavorite: boolean;
}

const initialState: FilterState = {
  searchState: '',
  filteredGenerations: [],
  filteredTypes: [],
  filteringIsFavorite: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchState: (state, action: PayloadAction<string>) => {
      state.searchState = action.payload;
    },
    setFilteredGenerations: (state, action: PayloadAction<number[]>) => {
      state.filteredGenerations = action.payload;
    },
    setFilteredTypes: (state, action: PayloadAction<number[]>) => {
      state.filteredTypes = action.payload;
    },
    setFilteringIsFavorite: (state, action: PayloadAction<boolean>) => {
      state.filteringIsFavorite = action.payload;
    },
  },
});

export const {
  setSearchState,
  setFilteredGenerations,
  setFilteredTypes,
  setFilteringIsFavorite,
} = filterSlice.actions;

export const selectSearchState = (state: RootState): string =>
  state.filter.searchState;

export const selectFilteredGenerations = (state: RootState): number[] =>
  state.filter.filteredGenerations;

export const selectFilteredTypes = (state: RootState): number[] =>
  state.filter.filteredTypes;

export const selectFilteringIsFavorite = (state: RootState): boolean =>
  state.filter.filteringIsFavorite;

export const filterReducer = filterSlice.reducer;
