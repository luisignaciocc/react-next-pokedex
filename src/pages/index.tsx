import type { NextPage } from 'next';

import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'src/components';
import { css } from '@emotion/react';
import { float } from 'src/styles/animations';
import Image from 'next/image';

const WelcomePage: NextPage = () => {
  return (
    <Box
      component="main"
      sx={{
        backgroundImage: 'url(/images/welcome-background.png)',
        backgroundRepeat: 'repeat',
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
            <Image
              src="/images/pokemon-logo.png"
              alt="Pokemon"
              width={568}
              height={236.66}
            />
          </Grid>
          <Grid item xs={12}>
            <Link href="/pokedex">
              <Box
                css={css`
                  animation: ${float} 6s ease-in-out infinite;
                `}
              >
                <Image
                  src="/images/start.png"
                  alt="Start"
                  width={300}
                  height={71.52}
                />
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Image
              src="/images/pikachu-running.gif"
              alt="Pikachu"
              width={200}
              height={142.5}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WelcomePage;
