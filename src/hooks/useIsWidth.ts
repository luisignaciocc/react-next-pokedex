import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';

export const useIsWidthUp = (breakpoint: Breakpoint) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint));
};

export const useIsWidthDown = (breakpoint: Breakpoint) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
};
