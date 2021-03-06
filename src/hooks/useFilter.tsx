import {
  selectFilteredGenerations,
  selectFilteredTypes,
  selectSearchState,
  selectFilteringIsFavorite,
  selectPage,
} from 'src/redux/slices';
import { useAppSelector } from './useRedux';

export const useFilteredGenerations = () =>
  useAppSelector(selectFilteredGenerations);

export const useFilteredTypes = () => useAppSelector(selectFilteredTypes);

export const useSearchState = () => useAppSelector(selectSearchState);

export const useFilteringIsFavorite = () =>
  useAppSelector(selectFilteringIsFavorite);

export const usePage = () => useAppSelector(selectPage);
