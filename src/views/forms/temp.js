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
import updateEntry from 'src/utils/api/updateEntry';

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
  logo: ['business', 'brand'],
  contentImage: ['product', 'service', 'feature'],
  heading: ['caption'],
  subheading: ['caption'],
  province: ['city'],
  amount: ['donation']
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
      res = await addEntry(pluralize(title), uploads);
    }

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
    setAlert(false);
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
                  required
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
                  required
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
                  required
                  multiline
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
                  required
                  multiline
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
                  type="number"
                  variant="outlined"
                  defaultValue={0}
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
                  type="text"
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
                  required
                  select
                  SelectProps={{ native: true }}
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
