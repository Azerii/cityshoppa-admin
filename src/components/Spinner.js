import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  spinner: {
    width: '2rem',
    height: 'auto',
    margin: 'auto'
  }
});

export default function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <img
        className={classes.spinner}
        src="/static/images/spinner.gif"
        alt=""
      />
    </div>
  );
}
