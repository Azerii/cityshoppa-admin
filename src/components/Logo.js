import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  logo: {
    height: '2rem',
  }
});

const Logo = (props) => {
  const classes = useStyles();

  return (
    <img
      alt="Logo"
      src="/static/logo_nav.png"
      className={classes.logo}
      {...props}
    />
  );
};

export default Logo;
