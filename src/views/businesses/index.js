import React, { useEffect, useState } from 'react';
import DataListView from 'src/views/DataListView';
import getCollection from 'src/utils/api/getCollection';

const BusinessListView = () => {
  const [businesses, setBusinesses] = useState([]);

  async function fetchBusinesses() {
    const res = await getCollection('businesses');
    // console.log(res);
    if (res) setBusinesses(res);
  }

  useEffect(() => {
    fetchBusinesses();
    // eslint-disable-next-line
  }, []);

  return <DataListView data={businesses} contentType="business" />;
};

export default BusinessListView;
