import { combineReducers, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {
  favoriteReducer,
  FavoriteState,
  filterReducer,
  FilterState,
} from './slices';

export interface State {
  favorite: FavoriteState;
  filter: FilterState;
}

const rootReducer = (state: State | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default: {
      const combineReducer = combineReducers({
        favorite: favoriteReducer,
        filter: filterReducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
