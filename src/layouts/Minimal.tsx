import React from 'react';
import Container from '@mui/material/Container';

import { Topbar } from 'src/components/layout/minimal';
import { Box } from '@mui/material';

const Minimal = (props: {
  children: React.ReactElement;
}): React.ReactElement => {
  const { children } = props;

  return (
    <Box sx={{ height: '100%' }}>
      <Topbar />
      <Box
        component="main"
        sx={{
          p: 4,
          minHeight: 'calc(100vh - 64px)',
          backgroundImage: 'url(/images/pokedex-background.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: 'auto',
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
};

export default Minimal;
