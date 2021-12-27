import { FormattedPokemon, Pokemon } from '.';
import fuzzysort from 'fuzzysort';

/**
 * Format the fetched pokemons to a mapeable format
 * @param  {object[]} pokemons Array of pokemon objects
 * @return {object[]} The formated array of pokemon objects
 */
export const formatPokemons = (
  pokemons: Pokemon[],
  favorites: number[],
): FormattedPokemon[] => {
  return pokemons.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    generation: pokemon.pokemon_v2_pokemonspecy.pokemon_v2_generation.name,
    generationId: pokemon.pokemon_v2_pokemonspecy.pokemon_v2_generation.id,
    types: pokemon.pokemon_v2_pokemontypes.map(
      (type) => type.pokemon_v2_type.name,
    ),
    typesIds: pokemon.pokemon_v2_pokemontypes.map(
      (type) => type.pokemon_v2_type.id,
    ),
    isFavorite: favorites.includes(pokemon.id),
  }));
};

export const filterPokemons = (
  pokemons: FormattedPokemon[],
  search: string,
  filteredGenerations: number[],
  filteredTypes: number[],
  filteredIsFavorite: boolean,
  pageNumber: number,
  pageSize: number = 20,
) => {
  const generationFilteredPokemons = pokemons.filter((pokemon) =>
    filteredGenerations.length > 0
      ? filteredGenerations.includes(pokemon.generationId)
      : true,
  );
  const typeFilteredPokemons = generationFilteredPokemons.filter((pokemon) =>
    filteredTypes.length > 0
      ? filteredTypes.some((id) => pokemon.typesIds.includes(id))
      : true,
  );
  const filteredPokemons = typeFilteredPokemons.filter((pokemon) =>
    filteredIsFavorite ? pokemon.isFavorite : true,
  );
  const fuzzyPokemons = fuzzysort
    .go(search, filteredPokemons, { key: 'name' })
    .filter((result) => result.score > -5000);
  const findedPokemons = fuzzyPokemons.map((fuzzy) => fuzzy.obj);
  const paginatedPokemons = (search ? findedPokemons : filteredPokemons).slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize,
  );
  const totalPages = Math.ceil(
    (search ? findedPokemons : filteredPokemons).length / pageSize,
  );
  return { paginatedPokemons, totalPages };
};

/**
 * Return the color that should be used to display the pokemon type
 * @param  {string} type The type of the pokemon
 * @param  {number} opacity The desired opacity of the color
 * @return {string}      The color HEX code
 */
export const getTypeColor = (type: string, opacity: number = 1): string => {
  const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  return (colours[type] || '#777') + `${opacityToHex(opacity)}`;
};

/**
 * Return the value that should be added at the end of the HEX string to set the color transparency (#RRGGBB -> #RRGGBBAA)
 * @param  {number} opacity The amount of opacity that should be added to the color
 * @return {string}      The hex value to set the color transparency
 */
const opacityToHex = (opacity: number): string => {
  const percent = Math.max(0, Math.min(100, opacity * 100)); // bound percent from 0 to 100
  const intValue = Math.round((percent / 100) * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
};
