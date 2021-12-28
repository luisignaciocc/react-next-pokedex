import axios from 'axios';
import { useQuery } from '@apollo/client';
import {
  Pokemon,
  PokemonGeneration,
  PokemonGenerationsData,
  PokemonsListData,
  PokemonsTypesData,
  PokemonDetails,
  POKEMONS_GENERATIONS_QUERY,
  POKEMONS_LIST_QUERY,
  POKEMONS_TYPES_QUERY,
  PokemonType,
} from '../utils';

const API_REST_URL = 'https://pokeapi.co/api/v2';

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

export const getPokemonDetails = async (
  id: number,
): Promise<PokemonDetails> => {
  return axios
    .get(API_REST_URL + `/pokemon/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getPokemonsIds = async (id: number): Promise<PokemonDetails> => {
  return axios
    .get(API_REST_URL + `/pokemon/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
