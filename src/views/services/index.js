import React, { useEffect, useState } from 'react';
import DataListView from 'src/views/DataListView';
import getCollection from 'src/utils/api/getCollection';

const ServiceListView = () => {
  const [services, setServices] = useState([]);

  async function fetchServices() {
    const res = await getCollection('services');
    // console.log(res);
    if (res) setServices(res);
  }

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line
  }, []);

  return <DataListView data={services} contentType="service" />;
};

export default ServiceListView;
