import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Paper, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';

import withLayout from 'src/hocs/withLayout';
import { Loader } from 'src/components/pokedex';
import { getPokemonDetails } from 'src/services';
import { getTypeColor } from 'src/utils/functions';
// import {
//   useIsWidthDown,
// } from 'src/hooks';

const PokemonPage: NextPage = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);

  //   const isDownMd = useIsWidthDown('md');
  //   const isDownSm = useIsWidthDown('sm');
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) init();
  }, [id]);

  const init = async () => {
    const pokemonDetails = await getPokemonDetails(+id);
    console.log(pokemonDetails);
    setPokemonName(pokemonDetails.name);
    setPokemonTypes(pokemonDetails.types);
  };

  return id ? (
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
  ) : (
    <Loader />
  );
};

export default withLayout(PokemonPage, 'minimal');
