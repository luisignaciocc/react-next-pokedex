import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Checkbox,
} from '@mui/material';
import { useState } from 'react';
import { getTypeColor } from 'src/utils';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Bullet } from '.';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useIsWidthDown } from 'src/hooks';

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
  const isDownSm = useIsWidthDown('sm');

  const view = (id: number) => {
    router.push(`/pokedex/${id}`);
    setWasClicked(true);
    setTimeout(() => {
      setWasClicked(false);
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
            width: isDownSm ? 46 : 96,
            height: isDownSm ? 46 : 96,
            backgroundColor: 'transparent',
          }}
        >
          <Image
            src="/images/pokeball.png"
            alt="Pokemon"
            width={46}
            height={46}
          />
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
            <Typography
              variant="button"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              #{id}
            </Typography>
            <Typography variant="body1">{generation}</Typography>
          </>
        }
        secondary={types.map((type, i) => (
          <Bullet key={i} color={getTypeColor(type)} text={type} />
        ))}
      />
      <Checkbox
        size="small"
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
