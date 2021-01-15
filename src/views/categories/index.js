import React, { useEffect, useState } from 'react';
import DataListView from 'src/views/DataListView';
import getCollection from 'src/utils/api/getCollection';

const CategoryListView = () => {
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const res = await getCollection();
    // console.log(res);
    if (res) setCategories(res);
  }

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  return <DataListView data={categories} contentType="category" />;
};

export default CategoryListView;
