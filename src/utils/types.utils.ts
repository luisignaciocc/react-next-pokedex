export type PokemonsListData = {
  pokemon_v2_pokemon: Pokemon[];
};

export type Pokemon = {
  id: number;
  name: string;
  pokemon_v2_pokemonspecy: PokemonSpecy;
  pokemon_v2_pokemontypes: NestedPokemonType[];
};

type PokemonSpecy = {
  pokemon_v2_generation: PokemonGeneration;
};

export type PokemonGeneration = {
  id: number;
  name: string;
};

type NestedPokemonType = {
  pokemon_v2_type: PokemonType;
};

export type FormattedPokemon = {
  id: number;
  name: string;
  generation: string;
  generationId: number;
  types: string[];
  typesIds: number[];
  isFavorite: boolean;
};

export type PokemonsTypesData = {
  pokemon_v2_type: PokemonType[];
};

export type PokemonType = {
  id: number;
  name: string;
};

export type PokemonGenerationsData = {
  pokemon_v2_generation: PokemonGeneration[];
};
