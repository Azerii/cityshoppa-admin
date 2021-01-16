import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  // Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {
  People,
  Loyalty,
  LocationCity,
  Category,
  BusinessCenter,
  Router
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const Totals = ({ className, name, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {name.toUpperCase()}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {localStorage.getItem(name) || 0}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar>
              {name === 'users' && <People />}
              {name === 'businesses' && <BusinessCenter />}
              {name === 'products' && <Loyalty />}
              {name === 'services' && <Router />}
              {name === 'categories' && <Category />}
              {name === 'cities' && <LocationCity />}
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            16%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
};

Totals.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default Totals;
