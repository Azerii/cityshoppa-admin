import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  // Typography,
  makeStyles
} from '@material-ui/core';
// import getInitials from 'src/utils/getInitials';
import { v4 as uuid } from 'uuid';
import * as models from '../../utils/listModel';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className, content, contentType, ...rest
}) => {
  const classes = useStyles();
  const [selectedContentIds, setSelectedContentIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const model = models.default[contentType];

  const handleSelectAll = (event) => {
    let newSelectedContentIds;

    if (event.target.checked) {
      newSelectedContentIds = content.map((item) => item.id);
    } else {
      newSelectedContentIds = [];
    }

    setSelectedContentIds(newSelectedContentIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedContentIds.indexOf(id);
    let newSelectedContentIds = [];

    if (selectedIndex === -1) {
      newSelectedContentIds = newSelectedContentIds.concat(
        selectedContentIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedContentIds = newSelectedContentIds.concat(
        selectedContentIds.slice(1)
      );
    } else if (selectedIndex === selectedContentIds.length - 1) {
      newSelectedContentIds = newSelectedContentIds.concat(
        selectedContentIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedContentIds = newSelectedContentIds.concat(
        selectedContentIds.slice(0, selectedIndex),
        selectedContentIds.slice(selectedIndex + 1)
      );
    }

    setSelectedContentIds(newSelectedContentIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedContentIds.length === content.length}
                    color="primary"
                    indeterminate={
                      selectedContentIds.length > 0
                      && selectedContentIds.length < content.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {model.map((item) => (
                  <TableCell key={item}>{item}</TableCell>
                ))}
                {/* <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Registration date</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {content.slice(0, limit).map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  selected={selectedContentIds.indexOf(item.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedContentIds.indexOf(item.id) !== -1}
                      onChange={(event) => handleSelectOne(event, item.id)}
                      value="true"
                    />
                  </TableCell>
                  {model.map((field) => (
                    <TableCell key={uuid()}>{item[field]}</TableCell>
                  ))}
                  {/* <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar className={classes.avatar} src={item.avatarUrl}>
                        {getInitials(item.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {item.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    {`${item.address.city}, ${item.address.state}, ${item.address.country}`}
                  </TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    {moment(item.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={content.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  content: PropTypes.array.isRequired,
  contentType: PropTypes.string.isRequired
};

export default Results;
