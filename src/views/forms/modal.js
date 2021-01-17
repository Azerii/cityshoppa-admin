import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TempForm from './temp';
import EditForm from './edit';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog({
  title, open, setOpen, fetchContent, edit
}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
        // onClose={() => window.location.reload()}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title.toUpperCase()}
            </Typography>
          </Toolbar>
        </AppBar>
        {edit ? (
          <EditForm
            title={title}
            setOpen={setOpen}
            fetchContent={fetchContent}
          />
        ) : (
          <TempForm
            title={title}
            setOpen={setOpen}
            fetchContent={fetchContent}
          />
        )}
      </Dialog>
    </div>
  );
}

FullScreenDialog.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  fetchContent: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired
};

export default FullScreenDialog;
