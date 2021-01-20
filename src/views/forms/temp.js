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
import getCollection from 'src/utils/api/getCollection';
import addEntry from 'src/utils/api/addEntry';
// import { Label } from '@material-ui/icons';
import pluralize from 'pluralize';
import { Alert, AlertTitle } from '@material-ui/lab';
import Spinner from 'src/components/Spinner';

const useStyles = makeStyles(() => ({
  root: {}
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
  logo: ['business'],
  contentImage: ['product', 'service', 'feature'],
  heading: ['caption'],
  subheading: ['caption'],
  province: ['city']
};

const TempForm = ({
  className, title, setOpen, fetchContent, ...rest
}) => {
  const classes = useStyles();
  const [businesses, setBusinesses] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertData, setAlertData] = useState({ type: 'warning', text: '' });
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    const tempData = {};
    const formEl = document.forms.addEntry;
    const fileEl = document.querySelector('#contentImage');
    const formData = new FormData(formEl);
    const uploads = new FormData();

    formData.forEach((value, key) => {
      if (key !== 'contentImage') {
        tempData[key] = value;
      } else if (key === 'contentImage' && fileEl.files.length) {
        const file = fileEl.files[0];

        uploads.append('files.contentImage', file, file.name);
      }

      return null;
    });

    uploads.append('data', JSON.stringify(tempData));

    setLoading(true);

    const res = await addEntry(pluralize(title), uploads);

    setLoading(false);

    if (res) {
      fetchContent();
      setAlert(true);
      setAlertData({
        type: 'success',
        text: 'Entry created'
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
    // eslint-disable-next-line
  }, []);

  return (
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
          title={`Create a new ${title}`}
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
                  // onChange={handleChange}
                  required
                  // value={values.username}
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
                  // onChange={handleChange}
                  required
                  // value={values.name}
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
                  // onChange={handleChange}
                  required
                  // value={values.email}
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
                  // onChange={handleChange}
                  required
                  multiline
                  // value={values.description}
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
                  // onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  // value={values.business}
                  variant="outlined"
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
                  // onChange={handleChange}
                  required
                  multiline
                  // value={values.address}
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
                  // onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  // value={values.business}
                  variant="outlined"
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
                  // onChange={handleChange}
                  required
                  // value={values.price}
                  variant="outlined"
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
                  // onChange={handleChange}
                  type="number"
                  required
                  // value={values.discount}
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
                  // onChange={handleChange}
                  type="text"
                  required
                  // value={values.phone}
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
                  // onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  // value={values.business}
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
                  // onChange={handleChange}
                  required
                  // value={values.linkToMaps}
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
                  // onChange={handleChange}
                  required
                  type="file"
                  accept="image/*"
                  // value={values.contentImage}
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
                  label="Logo"
                  name="logo"
                  id="logo"
                  // onChange={handleChange}
                  required
                  type="file"
                  accept="image/*"
                  // value={values.logo}
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
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
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
  );
};

TempForm.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  fetchContent: PropTypes.func.isRequired
};

export default TempForm;
