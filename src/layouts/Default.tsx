import { Box, Container } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactElement;
};

const DefaultLayout = ({ children }: Props): React.ReactElement => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default DefaultLayout;
