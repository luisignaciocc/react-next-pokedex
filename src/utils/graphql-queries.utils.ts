import { gql } from '@apollo/client';

export const POKEMONS_LIST_QUERY = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemon {
      id
      name
      pokemon_v2_pokemonspecy {
        pokemon_v2_generation {
          id
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          id
          name
        }
      }
    }
  }
`;

export const POKEMONS_TYPES_QUERY = gql`
  query samplePokeAPIquery {
    pokemon_v2_type(where: { _not: { id: { _gt: 10000 } } }) {
      id
      name
    }
  }
`;

export const POKEMONS_GENERATIONS_QUERY = gql`
  query samplePokeAPIquery {
    pokemon_v2_generation {
      id
      name
    }
  }
`;
