import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'src/components';
import Image from 'next/image';

const Topbar = (): React.ReactElement => {
  return (
    <AppBar sx={{ boxShadow: 'none' }} color="secondary" position="static">
      <Toolbar>
        <Link href="/">
          <Image
            src="/images/pokemon-logo.png"
            alt="Pokemon"
            height={55}
            width={132}
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
