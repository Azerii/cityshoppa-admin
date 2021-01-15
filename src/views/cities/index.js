import React, { useEffect, useState } from 'react';
import DataListView from 'src/views/DataListView';
import getCollection from 'src/utils/api/getCollection';

const CityListView = () => {
  const [cities, setCities] = useState([]);

  async function fetchCities() {
    const res = await getCollection('cities');
    // console.log(res);
    if (res) setCities(res);
  }

  useEffect(() => {
    fetchCities();
    // eslint-disable-next-line
  }, []);

  return <DataListView data={cities} contentType="city" />;
};

export default CityListView;
