import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'src/components';

const Topbar = (): React.ReactElement => {
  return (
    <AppBar sx={{ boxShadow: 'none' }} color="secondary" position="static">
      <Toolbar>
        <Link href="/">
          <img
            style={{ height: 55 }}
            alt="Pokemon"
            src="/images/pokemon-logo.png"
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
