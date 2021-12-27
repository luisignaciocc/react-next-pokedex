import type { NextPage } from 'next';

import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'src/components';
import { css, keyframes } from '@emotion/react';
import { float } from 'src/styles/animations';

const WelcomePage: NextPage = () => {
  return (
    <Box
      component="main"
      sx={{
        backgroundImage: 'url(/images/welcome-background.png)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'bottom',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          height="calc(100vh + 16px)"
        >
          <Grid item xs={12} sm={6}>
            <img src="images/pokemon-logo.png" alt="Pokemon" width={'100%'} />
          </Grid>
          <Grid item xs={12}>
            <Link href="/pokedex">
              <img
                css={css`
                  animation: ${float} 6s ease-in-out infinite;
                `}
                src="images/start.png"
                alt="Start"
                width={300}
              />
            </Link>
          </Grid>
          <Grid item xs={12}>
            <img src="images/pikachu-running.gif" alt="" width={200} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WelcomePage;
