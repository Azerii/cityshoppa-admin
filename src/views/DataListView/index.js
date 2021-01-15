import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import tempData from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DataListView = ({ data, contentType }) => {
  const classes = useStyles();
  const content = data || tempData;

  return (
    <Page className={classes.root} title="Users">
      <Container maxWidth={false}>
        <Toolbar contentType={contentType} />
        <Box mt={3}>
          <Results content={content} contentType={contentType} />
        </Box>
      </Container>
    </Page>
  );
};

DataListView.propTypes = {
  data: PropTypes.array.isRequired,
  contentType: PropTypes.string.isRequired
};

export default DataListView;
