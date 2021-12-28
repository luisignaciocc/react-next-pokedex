import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    h4: {
      fontFamily: `"Press Start 2P"`,
      '@media (max-width:425px)': {
        fontSize: '0.8rem',
      },
    },
    h5: {
      fontFamily: `"Press Start 2P"`,
      '@media (max-width:425px)': {
        fontSize: '0.6rem',
      },
    },
    subtitle2: {
      fontFamily: `"Press Start 2P"`,
      '@media (max-width:425px)': {
        fontSize: '0.6rem',
      },
    },
    caption: {
      fontFamily: `"Press Start 2P"`,
      '@media (max-width:425px)': {
        fontSize: '0.6rem',
      },
    },
  },
  palette: {
    primary: {
      main: '#40E0D0',
    },
    secondary: {
      main: '#DC143C',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
