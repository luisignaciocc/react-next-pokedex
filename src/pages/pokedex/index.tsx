import React, { useState, useEffect } from 'react';
import { ImageList, Paper, Pagination, Stack } from '@mui/material';
import type { NextPage } from 'next';
import {
  Loader,
  PokemonListItem,
  PokemonListToolbar,
} from 'src/components/pokedex';

import withLayout from 'src/hocs/withLayout';
import { getPokemons } from 'src/services';
import { filterPokemons, formatPokemons } from 'src/utils/functions';
import {
  useAppDispatch,
  useFavorites,
  useIsWidthDown,
  useSearchState,
  useFilteredGenerations,
  useFilteredTypes,
  useFilteringIsFavorite,
} from 'src/hooks';
import { FormattedPokemon } from 'src/utils';
import { setFavorites } from 'src/redux/slices';

const PokemonsPage: NextPage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pokemons, setPokemons] = useState<FormattedPokemon[]>([]);

  const dispatch = useAppDispatch();
  const favorites = useFavorites();
  const searchState = useSearchState();
  const filteredGenerations = useFilteredGenerations();
  const filteredTypes = useFilteredTypes();
  const filteringIsFavorite = useFilteringIsFavorite();
  const isDownMd = useIsWidthDown('md');
  const isDownSm = useIsWidthDown('sm');

  const fetchedPokemons = getPokemons();

  useEffect(() => {
    filter();
  }, [
    fetchedPokemons.length,
    filteredGenerations.length,
    filteredTypes.length,
    page,
    searchState,
    filteringIsFavorite,
    favorites.length,
  ]);

  const filter = () => {
    const formatedPokemons = formatPokemons(fetchedPokemons, favorites);
    const { paginatedPokemons, totalPages } = filterPokemons(
      formatedPokemons,
      searchState,
      filteredGenerations,
      filteredTypes,
      filteringIsFavorite,
      page,
    );
    setPokemons(paginatedPokemons);
    setTotalPages(totalPages);
    if (totalPages < page && pokemons.length > 0) {
      setPage(1);
    }
  };

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleCheckAsFavorite = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const current = favorites;
    if (event.target.checked) {
      const newFavorites = [...current, id];
      dispatch(setFavorites(newFavorites));
    } else {
      const newFavorites = current.filter((value) => {
        return value !== id;
      });
      dispatch(setFavorites(newFavorites));
    }
  };

  const doesntHaveAnyData =
    !pokemons.length &&
    !filteredTypes.length &&
    !filteredGenerations.length &&
    !filteringIsFavorite &&
    !searchState;

  return doesntHaveAnyData ? (
    <Loader />
  ) : (
    <Paper
      sx={{
        backgroundColor: 'rgba(255,255,255,0.7)',
        p: 2,
      }}
    >
      <Stack sx={{ alignItems: 'center' }} spacing={2}>
        <PokemonListToolbar />
        <ImageList cols={isDownMd ? (isDownSm ? 1 : 3) : 4}>
          {pokemons.map((pokemon) => (
            <PokemonListItem
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              generation={pokemon.generation}
              types={pokemon.types}
              opacity={0.55}
              isFavorite={pokemon.isFavorite}
              markAsFavorite={handleCheckAsFavorite}
            />
          ))}
        </ImageList>
        <Pagination
          color="secondary"
          page={page}
          count={totalPages}
          onChange={handlePagination}
        />
      </Stack>
    </Paper>
  );
};

export default withLayout(PokemonsPage, 'minimal');
