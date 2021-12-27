import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Checkbox,
} from '@mui/material';
import { useState } from 'react';
import { getTypeColor } from 'src/utils/functions';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Bullet } from '.';
import { useRouter } from 'next/router';

interface Props {
  id: number;
  name: string;
  generation: string;
  types: string[];
  opacity: number;
  isFavorite: boolean;
  markAsFavorite: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => void;
}

const PokemonListItem = (props: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [wasClicked, setWasClicked] = useState(false);
  const { id, name, generation, types, opacity, isFavorite, markAsFavorite } =
    props;

  const router = useRouter();

  const view = (id: number) => {
    setWasClicked(true);
    setTimeout(() => {
      setWasClicked(false);
      router.push(`/pokedex/${id}`);
    }, 80);
  };
  return (
    <ListItem
      sx={{
        backgroundColor: `${getTypeColor(types[0], opacity)}`,
        borderRadius: '15px',
        transform: isHovered
          ? wasClicked
            ? 'scale3d(0.85, 0.85, 1)'
            : 'scale3d(0.95, 0.95, 1)'
          : '',
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <ListItemAvatar
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          view(id);
        }}
      >
        <Avatar
          alt={name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          sx={{
            width: 96,
            height: 96,
            backgroundColor: 'transparent',
          }}
        >
          <img src="images/pokeball.png" alt="Pokemon" width={46} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          view(id);
        }}
        primary={
          <>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="caption">
              #{id} ~ {generation}
            </Typography>
          </>
        }
        secondary={types.map((type, i) => (
          <Bullet key={i} color={getTypeColor(type)} text={type} />
        ))}
      />
      <Checkbox
        checked={isFavorite}
        onChange={(e) => markAsFavorite(e, id)}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        color="secondary"
      />
    </ListItem>
  );
};

export default PokemonListItem;
