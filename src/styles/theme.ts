import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    h4: {
      fontFamily: `"Press Start 2P"`,
    },
    h5: {
      fontFamily: `"Press Start 2P"`,
    },
    subtitle2: {
      fontFamily: `"Press Start 2P"`,
    },
    caption: {
      fontFamily: `"Press Start 2P"`,
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
