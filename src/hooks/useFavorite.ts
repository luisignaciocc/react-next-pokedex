import { selectFavorites } from 'src/redux/slices';
import { useAppSelector } from './useRedux';

export const useFavorites = () => useAppSelector(selectFavorites);
