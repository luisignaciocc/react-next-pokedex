import {
  Paper,
  Stack,
  Button,
  Box,
  Avatar,
  InputBase,
  Menu,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PokemonGeneration, PokemonType } from 'src/utils';
import { useEffect, useState } from 'react';
import {
  useAppDispatch,
  useSearchState,
  useFilteringIsFavorite,
  useFilteredTypes,
  useFilteredGenerations,
} from 'src/hooks';
import {
  setSearchState,
  setFilteringIsFavorite,
  setFilteredGenerations,
  setFilteredTypes,
} from 'src/redux/slices';
import Image from 'next/image';

interface Props {
  fetchedPokemonTypes: PokemonType[];
  fetchedPokemonGenerations: PokemonGeneration[];
}

const PokemonListToolbar = (props: Props) => {
  const { fetchedPokemonTypes, fetchedPokemonGenerations } = props;
  const dispatch = useAppDispatch();
  const searchState = useSearchState();
  const filteredGenerations = useFilteredGenerations();
  const filteredTypes = useFilteredTypes();
  const filteringIsFavorite = useFilteringIsFavorite();

  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [pokemonGenerations, setPokemonGenerations] = useState<
    PokemonGeneration[]
  >([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    setPokemonTypes(fetchedPokemonTypes);
    setPokemonGenerations(fetchedPokemonGenerations);
  }, [fetchedPokemonTypes.length, fetchedPokemonGenerations.length]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCheckIsFavoriteFilter = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setFilteringIsFavorite(event.target.checked));
  };

  const handleCheckGenerations = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const current = filteredGenerations;
    if (event.target.checked) {
      const newFilters = [...current, id];
      dispatch(setFilteredGenerations(newFilters));
    } else {
      const newFilters = current.filter((value) => {
        return value !== id;
      });
      dispatch(setFilteredGenerations(newFilters));
    }
  };

  const handleCheckType = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const current = filteredTypes;
    if (event.target.checked) {
      const newFilters = [...current, id];
      dispatch(setFilteredTypes(newFilters));
    } else {
      const newFilters = current.filter((value) => {
        return value !== id;
      });
      dispatch(setFilteredTypes(newFilters));
    }
  };

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        backgroundColor: '#ffcb05A6',
        width: '100%',
      }}
    >
      <Box sx={{ m: 1, ml: 3, display: { xs: 'none', sm: 'block' } }}>
        <Image
          src="/images/pokedex-letters.png"
          alt="Pokedex"
          width={270}
          height={56.8}
        />
      </Box>
      <Box
        component="span"
        sx={{ flex: 'auto', display: { xs: 'none', sm: 'block' } }}
      />
      <Paper
        sx={{
          p: '2px 2px',
          display: 'flex',
          alignItems: 'center',
          width: 200,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar..."
          value={searchState}
          onChange={(e) => dispatch(setSearchState(e.target.value))}
        />
        <SearchIcon />
      </Paper>
      <Box sx={{ m: 1, mr: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ m: 2 }}
          onClick={handleOpenMenu}
        >
          <Avatar src={'images/bulbasaur.png'} sx={{ width: 24, height: 24 }} />
          <Avatar
            src={'images/charmander.png'}
            sx={{ width: 24, height: 24 }}
          />
          <Avatar src={'images/squirtle.png'} sx={{ width: 24, height: 24 }} />
        </Button>
        <Menu
          open={openMenu}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ pl: 2, pr: 2 }}>
            <Typography variant="h6">Filtros</Typography>
            <Divider sx={{ my: 0.5 }} />
            <FormGroup>
              <Typography variant="subtitle1">Favoritos</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filteringIsFavorite}
                    onChange={handleCheckIsFavoriteFilter}
                  />
                }
                label="favorito"
              />
            </FormGroup>
            <Divider sx={{ my: 0.5 }} />
            <FormGroup>
              <Typography variant="subtitle1">Generación</Typography>
              {pokemonGenerations.map((generation, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      onChange={(e) => handleCheckGenerations(e, generation.id)}
                      checked={filteredGenerations.includes(generation.id)}
                    />
                  }
                  label={generation.name}
                />
              ))}
            </FormGroup>
            <Divider sx={{ my: 0.5 }} />
            <FormGroup>
              <Typography variant="subtitle1">Tipos</Typography>
              {pokemonTypes.map((type, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      onChange={(e) => handleCheckType(e, type.id)}
                      checked={filteredTypes.includes(type.id)}
                    />
                  }
                  label={type.name}
                />
              ))}
            </FormGroup>
          </Box>
        </Menu>
      </Box>
    </Stack>
  );
};

export default PokemonListToolbar;
