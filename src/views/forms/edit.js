import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import getCollection from 'src/utils/api/getCollection';
import pluralize from 'pluralize';
import { Alert, AlertTitle } from '@material-ui/lab';
import Spinner from 'src/components/Spinner';
import updateEntry from 'src/utils/api/updateEntry';
import deleteEntry from 'src/utils/api/deleteEntry';
import ConfirmDelete from './confirmDelete';

const useStyles = makeStyles(() => ({
  root: {},
  clickable: {
    cursor: 'pointer'
  }
}));

const fieldTypes = {
  username: ['user'],
  email: ['user', 'business'],
  name: ['business', 'product', 'service', 'category', 'city'],
  description: ['business', 'product', 'service'],
  business: ['product', 'service'],
  discount: ['product'],
  price: ['product'],
  category: ['product', 'service'],
  phone: ['business'],
  linkToMaps: ['business'],
  address: ['business'],
  city: ['business'],
  logo: ['business', 'brand'],
  contentImage: ['product', 'service', 'feature'],
  heading: ['caption'],
  subheading: ['caption'],
  province: ['city'],
  amount: ['donation']
};

const listTypeModels = ['business', 'category', 'city'];

const EditForm = ({
  className, title, setOpen, fetchContent, ...rest
}) => {
  const classes = useStyles();
  const [values, setValues] = useState(
    JSON.parse(localStorage.getItem('editData'))
  );
  const [businesses, setBusinesses] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertData, setAlertData] = useState({ type: 'warning', text: '' });
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (event) => {
    if (listTypeModels.includes(event.target.name)) {
      setValues({
        ...values,
        [event.target.name]: {
          ...[event.target.name],
          id: [event.target.value]
        }
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const tempData = {};
    const formEl = document.forms.addEntry;
    const formData = new FormData(formEl);
    const uploads = new FormData();

    formData.forEach((value, key) => {
      const fileEl = document.querySelector(`#${key}`);
      if (key !== 'contentImage' && key !== 'logo') {
        tempData[key] = value;
      } else if (
        (key === 'contentImage' || key === 'logo')
        && fileEl.files.length
      ) {
        const file = fileEl.files[0];

        uploads.append(`files.${key}`, file, file.name);
      }

      return null;
    });

    uploads.append('data', JSON.stringify(tempData));

    setLoading(true);

    let res;

    if (title === 'donation') {
      res = await updateEntry(title, uploads);
    } else {
      res = await updateEntry(pluralize(title), uploads, values.id);
    }

    setLoading(false);

    if (res) {
      fetchContent();
      setAlert(true);
      setAlertData({
        type: 'success',
        text: 'Entry updated'
      });

      return true;
    }

    setAlert(true);
    setAlertData({
      type: 'error',
      text: 'Something went wrong. Try again.'
    });

    return null;
  };

  const handleDelete = async () => {
    setLoading(true);
    setDialogOpen(false);
    const res = await deleteEntry(pluralize(title), values.id);
    setLoading(false);
    if (res) {
      fetchContent();
      setAlert(true);
      setAlertData({
        type: 'success',
        text: 'Entry updated'
      });
      setTimeout(() => setOpen(false), 2000);

      return true;
    }

    setAlert(true);
    setAlertData({
      type: 'error',
      text: 'Something went wrong. Try again.'
    });

    return null;
  };

  async function fetchBusinesses() {
    const res = await getCollection('businesses');
    // console.log(res);
    if (res) setBusinesses(res);
  }

  async function fetchCities() {
    const res = await getCollection('cities');
    // console.log(res);
    if (res) setCities(res);
  }

  async function fetchCategories() {
    const res = await getCollection('categories');
    // console.log(res);
    if (res) setCategories(res);
  }

  useEffect(() => {
    fetchBusinesses();
    fetchCategories();
    fetchCities();
    setAlert(false);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ConfirmDelete
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleDelete={handleDelete}
      />
      <form
        id="addEntry"
        autoComplete="off"
        // noValidate
        className={clsx(classes.root, className)}
        onSubmit={(e) => handleSave(e)}
        {...rest}
      >
        {alert && (
          <Box mb={3}>
            <Alert severity={alertData.type} onClose={() => setAlert(false)}>
              <AlertTitle>{alertData.type}</AlertTitle>
              {alertData.text}
            </Alert>
          </Box>
        )}
        <Card>
          <CardHeader
            subheader="All fields are required"
            title={`Edit this ${title}`}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              {fieldTypes.username.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    required
                    value={values.username}
                    variant="outlined"
                  />
                </Grid>
              )}
              {fieldTypes.name.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
              )}
              {fieldTypes.logo.includes(title) && (
                <Grid item md={6} xs={12}>
                  <Typography variant="subtitle1" color="secondary">
                    Logo
                  </Typography>
                  <input
                    name="logo"
                    id="logo"
                    type="file"
                    accept="image/*"
                    variant="outlined"
                  />
                </Grid>
              )}
              {fieldTypes.email.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
              )}
              {fieldTypes.description.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    id="description"
                    onChange={handleChange}
                    required
                    multiline
                    value={values.description}
                    variant="outlined"
                  />
                </Grid>
              )}
              {fieldTypes.category.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="City"
                    name="category"
                    id="category"
                    required
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                    onChange={handleChange}
                    value={values.category.id}
                  >
                    {categories.map((category) => (
                      <option key={category.name} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              )}
              {fieldTypes.address.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    id="address"
                    onChange={handleChange}
                    required
                    multiline
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>
              )}
              {fieldTypes.city.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    id="city"
                    required
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                    onChange={handleChange}
                    value={values.city && values.city.id}
                  >
                    {cities.map((city) => (
                      <option key={city.name} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              )}
              {fieldTypes.price.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    id="price"
                    onChange={handleChange}
                    value={values.price}
                    variant="outlined"
                    required
                  />
                </Grid>
              )}
              {fieldTypes.amount.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Amount"
                    name="amount"
                    id="amount"
                    type="number"
                    variant="outlined"
                    required
                    onChange={handleChange}
                    value={values.amount}
                  />
                </Grid>
              )}
              {fieldTypes.discount.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Discount"
                    name="discount"
                    id="discount"
                    onChange={handleChange}
                    type="number"
                    value={values.discount}
                    variant="outlined"
                  />
                </Grid>
              )}
              {fieldTypes.phone.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    id="phone"
                    onChange={handleChange}
                    type="text"
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>
              )}
              {fieldTypes.business.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Business"
                    name="business"
                    id="business"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.business.id}
                    variant="outlined"
                  >
                    {businesses.map((business) => (
                      <option key={business.name} value={business.id}>
                        {business.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              )}
              {fieldTypes.linkToMaps.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Link To Maps"
                    name="linkToMaps"
                    id="linkToMaps"
                    onChange={handleChange}
                    value={values.linkToMaps}
                    variant="outlined"
                  />
                </Grid>
              )}
              {fieldTypes.contentImage.includes(title) && (
                <Grid item md={6} xs={12}>
                  <Typography variant="subtitle1" color="secondary">
                    Content Image
                  </Typography>
                  <input
                    label="Content Image"
                    name="contentImage"
                    id="contentImage"
                    type="file"
                    accept="image/*"
                    variant="outlined"
                  />
                </Grid>
              )}
              {fieldTypes.heading.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Heading"
                    name="heading"
                    id="heading"
                    variant="outlined"
                    required
                    onChange={handleChange}
                    value={values.heading}
                  />
                </Grid>
              )}
              {fieldTypes.subheading.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Subheading"
                    name="subheading"
                    id="subheading"
                    variant="outlined"
                    required
                    onChange={handleChange}
                    value={values.subheading}
                  />
                </Grid>
              )}
              {fieldTypes.province.includes(title) && (
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Province"
                    name="province"
                    id="province"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.province}
                  />
                </Grid>
              )}
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="space-between" p={2}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => setDialogOpen(true)}
            >
              Delete This Entry
            </Button>
            {loading ? (
              <Spinner />
            ) : (
              <Button color="primary" variant="contained" type="submit">
                Save details
              </Button>
            )}
          </Box>
        </Card>
      </form>
    </>
  );
};

EditForm.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  fetchContent: PropTypes.func.isRequired
};

export default EditForm;
