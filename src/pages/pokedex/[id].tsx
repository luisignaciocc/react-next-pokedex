import { Grid, Paper, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';

import withLayout from 'src/hocs/withLayout';
import { getPokemonDetails, getPokemonsIds } from 'src/services';
import { getTypeColor, PokemonDetails } from 'src/utils';

const PokemonPage: NextPage<{ pokemonDetails: PokemonDetails }> = ({
  pokemonDetails,
}) => {
  const id = pokemonDetails.id;
  const pokemonName = pokemonDetails.name;
  const pokemonTypes = pokemonDetails.types;

  return (
    <Paper
      sx={{
        backgroundColor: pokemonTypes[0]
          ? `${getTypeColor(pokemonTypes[0].type.name, 0.45)}`
          : 'rgba(255,255,255,0.7)',
        p: 2,
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt="Pokemon"
            width={500}
            height={500}
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          alignItems="flex-start"
          justifyContent="center"
          xs={6}
        >
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h4">{pokemonName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Details</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Details</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export async function getStaticPaths() {
  const res = await getPokemonsIds();
  const pokemons = res.results;

  const paths = [];

  pokemons.map((pokemon) => {
    paths.push({
      params: {
        id: pokemon.url.split('/')[6],
      },
    });
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const pokemonDetails = await getPokemonDetails(params.id);
  return { props: { pokemonDetails } };
}

export default withLayout(PokemonPage, 'minimal');
