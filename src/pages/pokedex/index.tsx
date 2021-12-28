import React, { useState, useMemo } from 'react';
import { ImageList, Paper, Pagination, Stack } from '@mui/material';
import type { NextPage } from 'next';
import {
  Loader,
  PokemonListItem,
  PokemonListToolbar,
} from 'src/components/pokedex';

import withLayout from 'src/hocs/withLayout';
import {
  useAppDispatch,
  useFavorites,
  useIsWidthDown,
  useSearchState,
  useFilteredGenerations,
  useFilteredTypes,
  useFilteringIsFavorite,
  useIsWidthUp,
  usePage,
} from 'src/hooks';
import {
  apolloClient,
  Pokemon,
  PokemonGeneration,
  PokemonGenerationsData,
  PokemonsListData,
  PokemonsTypesData,
  POKEMONS_GENERATIONS_QUERY,
  POKEMONS_LIST_QUERY,
  POKEMONS_TYPES_QUERY,
  PokemonType,
  filterPokemons,
  formatPokemons,
} from 'src/utils';
import { setFavorites, setPage } from 'src/redux/slices';

const PokemonsPage: NextPage<{
  fetchedPokemons: Pokemon[];
  fetchedPokemonTypes: PokemonType[];
  fetchedPokemonGenerations: PokemonGeneration[];
}> = ({ fetchedPokemons, fetchedPokemonTypes, fetchedPokemonGenerations }) => {
  const page = usePage();

  const dispatch = useAppDispatch();
  const favorites = useFavorites();
  const searchState = useSearchState();
  const filteredGenerations = useFilteredGenerations();
  const filteredTypes = useFilteredTypes();
  const filteringIsFavorite = useFilteringIsFavorite();
  const isUpLg = useIsWidthUp('lg');
  const isDownMd = useIsWidthDown('md');
  const isDownSm = useIsWidthDown('sm');

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
    if (totalPages < page) {
      dispatch(setPage(1));
    }
    return {
      pokemons: paginatedPokemons,
      totalPages,
    };
  };

  const { pokemons, totalPages } = useMemo(
    () => filter(),
    [
      searchState,
      filteredGenerations,
      filteredTypes,
      filteringIsFavorite,
      page,
      favorites,
    ],
  );

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    dispatch(setPage(value));
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
        <PokemonListToolbar
          fetchedPokemonGenerations={fetchedPokemonGenerations}
          fetchedPokemonTypes={fetchedPokemonTypes}
        />
        <ImageList cols={isDownMd ? (isDownSm ? 1 : 2) : isUpLg ? 4 : 3}>
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

export async function getStaticProps() {
  const pokemonsData = (
    await apolloClient.query<PokemonsListData>({
      query: POKEMONS_LIST_QUERY,
    })
  ).data;

  const pokemonTypesData = (
    await apolloClient.query<PokemonsTypesData>({
      query: POKEMONS_TYPES_QUERY,
    })
  ).data;

  const pokemonGenerationsData = (
    await apolloClient.query<PokemonGenerationsData>({
      query: POKEMONS_GENERATIONS_QUERY,
    })
  ).data;

  return {
    props: {
      fetchedPokemons: pokemonsData.pokemon_v2_pokemon,
      fetchedPokemonTypes: pokemonTypesData.pokemon_v2_type,
      fetchedPokemonGenerations: pokemonGenerationsData.pokemon_v2_generation,
    },
  };
}

export default withLayout(PokemonsPage, 'minimal');
