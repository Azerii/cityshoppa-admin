import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  // Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import theme from 'src/theme';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: theme.palette.background.improv
  },
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={2} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton
            color="secondary"
            onClick={() => {
              localStorage.setItem('admin:root', '');

              navigate('/login');
            }}
          >
            <Typography>Logout</Typography>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
