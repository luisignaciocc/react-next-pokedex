import { useQuery } from '@apollo/client';
import {
  Pokemon,
  PokemonGeneration,
  PokemonGenerationsData,
  PokemonsListData,
  PokemonsTypesData,
  POKEMONS_GENERATIONS_QUERY,
  POKEMONS_LIST_QUERY,
  POKEMONS_TYPES_QUERY,
  PokemonType,
} from '../utils';

export const getPokemons = (): Pokemon[] => {
  const { loading, error, data } =
    useQuery<PokemonsListData>(POKEMONS_LIST_QUERY);

  if (loading) return [];
  if (error) {
    console.error(error);
    return [];
  }
  return data.pokemon_v2_pokemon;
};

export const getPokemonTypes = (): PokemonType[] => {
  const { loading, error, data } =
    useQuery<PokemonsTypesData>(POKEMONS_TYPES_QUERY);

  if (loading) return [];
  if (error) {
    console.error(error);
    return [];
  }
  return data.pokemon_v2_type;
};

export const getPokemonGenerations = (): PokemonGeneration[] => {
  const { loading, error, data } = useQuery<PokemonGenerationsData>(
    POKEMONS_GENERATIONS_QUERY,
  );

  if (loading) return [];
  if (error) {
    console.error(error);
    return [];
  }
  return data.pokemon_v2_generation;
};
