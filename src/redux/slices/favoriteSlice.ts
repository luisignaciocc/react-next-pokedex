import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'src/redux/store';

export interface FavoriteState {
  favorites: number[];
}

const initialState: FavoriteState = {
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.favorites = action.payload;
    },
  },
});

export const { setFavorites } = favoriteSlice.actions;

export const selectFavorites = (state: RootState): number[] =>
  state.favorite.favorites;

export const favoriteReducer = favoriteSlice.reducer;
