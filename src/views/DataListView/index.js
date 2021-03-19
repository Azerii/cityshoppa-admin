import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import pluralize from 'pluralize';
import Spinner from 'src/components/Spinner';
import getCollectionList from 'src/utils/api/getCollectionList';
import getCollection from 'src/utils/api/getCollection';
import Results from './Results';
import Toolbar from './Toolbar';
import FullScreenDialog from '../forms/modal';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DataListView = ({ contentType }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(
    getCollectionList(pluralize(contentType)) || []
  );
  const [edit, setEdit] = useState(false);

  async function fetchContent() {
    setLoading(true);
    let res;
    if (contentType === 'donation') {
      res = await getCollection(contentType);
    } else {
      res = await getCollection(pluralize(contentType));
    }
    setLoading(false);
    if (res && contentType === 'donation') {
      setContent([res]);
    } else if (res) {
      setContent(res);
    }
  }

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line
  }, []);

  return (
    <Page className={classes.root} title={pluralize(contentType)}>
      <FullScreenDialog
        title={contentType}
        open={openModal}
        setOpen={setOpenModal}
        edit={edit}
        fetchContent={fetchContent}
      />
      <Container maxWidth={false}>
        <Toolbar
          contentType={contentType}
          setOpenModal={setOpenModal}
          setEdit={setEdit}
        />
        <Box mt={3}>
          {loading ? (
            <Spinner />
          ) : (
            <Results
              content={content}
              contentType={contentType}
              setEdit={setEdit}
              setOpenModal={setOpenModal}
            />
          )}
        </Box>
      </Container>
    </Page>
  );
};

DataListView.propTypes = {
  contentType: PropTypes.string.isRequired
};

export default DataListView;
