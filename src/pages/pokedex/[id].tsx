import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  Typography,
  Tooltip,
} from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';

import withLayout from 'src/hocs/withLayout';
import { getPokemonDetails, getPokemonsIds } from 'src/services';
import { getTypeColor, PokemonDetails } from 'src/utils';
import React from 'react';
import { StatsChart } from 'src/components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useAppDispatch, useFavorites } from 'src/hooks';
import { setFavorites } from 'src/redux/slices';
import { useRouter } from 'next/router';

const PokemonPage: NextPage<{ pokemonDetails: PokemonDetails }> = ({
  pokemonDetails,
}) => {
  const { id, name, height, weight } = pokemonDetails;
  const baseExperience = pokemonDetails.base_experience;
  const types = pokemonDetails.types.map((type) => type.type.name);
  const statsLabels = [];
  const statsValues = [];
  pokemonDetails.stats.map((stat) => {
    statsLabels.push(stat.stat.name);
    statsValues.push(stat.base_stat);
  });
  const games = pokemonDetails.game_indices.map((game) => game.version.name);
  const abilities = pokemonDetails.abilities.map(
    (ability) => ability.ability.name,
  );
  const heldItems = pokemonDetails.held_items.map((item) => ({
    name: item.item.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.item.name}.png`,
  }));

  const router = useRouter();
  const dispatch = useAppDispatch();
  const favorites = useFavorites();

  const isFavorite = favorites.includes(id);

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

  return (
    <Paper
      sx={{
        backgroundColor: 'rgba(220, 20, 60, 0.4)',
        borderRadius: '13px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: 'rgba(68, 68, 68, 0.9)',
          borderRadius: '13px 0px',
        }}
      >
        <Tooltip title="Volver">
          <IconButton
            size="large"
            onClick={() => {
              router.push(`/pokedex`);
            }}
          >
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>

        <Checkbox
          checked={isFavorite}
          onChange={(e) => handleCheckAsFavorite(e, id)}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          color="secondary"
        />
      </Box>
      <Grid
        container
        sx={{ border: 'rgb(220, 20, 60) solid 5px', borderRadius: '13px' }}
      >
        <Grid
          item
          container
          justifyContent="center"
          alignItems="stretch"
          direction="column"
          xs={12}
          md={6}
        >
          <Grid
            item
            xs={9}
            sm={10}
            md={11}
            sx={{
              background: `
                repeating-linear-gradient(
                  -55deg,
                  #222,
                  #222 10px,
                  #333 10px,
                  #333 20px
                )`,
              border: 'rgba(92, 101, 101, 1) groove 5px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt="Pokemon"
              width={400}
              height={400}
            />
          </Grid>
          <Grid
            item
            container
            justifyContent="space-evenly"
            xs={1}
            sx={{
              backgroundColor: '#444',
              border: 'rgba(92, 101, 101, 1) groove 5px',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h5">{baseExperience} Exp.</Typography>
            <Typography variant="h5">{height / 10} m.</Typography>
            <Typography variant="h5">{weight / 10} Kg</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          alignItems="stretch"
          justifyContent="center"
          xs={12}
          md={6}
        >
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: '#444',
              border: 'rgba(92, 101, 101, 1) groove 5px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4">
              #{id} - {name}
            </Typography>
          </Grid>
          <Grid item container direction="column" xs={6}>
            <Grid
              item
              xs={6}
              sx={{
                backgroundColor: '#444',
                border: 'rgba(92, 101, 101, 1) groove 5px',
                borderRadius: '8px',
              }}
            >
              <Typography variant="subtitle2" sx={{ color: '#222' }}>
                abilities:
              </Typography>
              {abilities.map((ability, i) => (
                <Typography key={i} variant="subtitle2">
                  + {ability}
                </Typography>
              ))}
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                backgroundColor: '#444',
                border: 'rgba(92, 101, 101, 1) groove 5px',
                borderRadius: '8px',
              }}
            >
              <Typography variant="subtitle2" sx={{ color: '#222' }}>
                types:
              </Typography>
              {types.map((type, i) => (
                <Typography
                  key={i}
                  variant="subtitle2"
                  sx={{ color: getTypeColor(type, 1) }}
                >
                  + {type}
                </Typography>
              ))}
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              backgroundColor: '#444',
              border: 'rgba(92, 101, 101, 1) groove 5px',
              borderRadius: '8px',
            }}
          >
            <StatsChart data={statsValues} labels={statsLabels} />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: '#444',
              border: 'rgba(92, 101, 101, 1) groove 5px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: '#222' }}>
              held items:
            </Typography>
            {heldItems.length ? (
              heldItems.map((item, i) => (
                <React.Fragment key={i}>
                  <Typography variant="subtitle2" sx={{ color: '#333' }}>
                    [
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={24}
                      height={24}
                    />
                    ]{item.name}
                  </Typography>
                </React.Fragment>
              ))
            ) : (
              <Typography variant="subtitle2" sx={{ color: '#333' }}>
                +[NO HELD ITEMS]+
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: '#444',
              border: 'rgba(92, 101, 101, 1) groove 5px',
              borderRadius: '8px',
            }}
          >
            <Typography variant="caption" sx={{ color: '#222' }}>
              games:{' '}
            </Typography>
            <Typography variant="caption">{games.join(' - ')}</Typography>
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
