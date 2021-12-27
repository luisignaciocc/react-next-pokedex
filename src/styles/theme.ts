import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
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
