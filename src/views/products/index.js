import React from 'react';
import DataListView from 'src/views/DataListView';
// import getCollection from 'src/utils/api/getCollection';

const ProductListView = () => {
  // const [products, setProducts] = useState([]);

  // async function fetchProducts() {
  //   const res = await getCollection('products');
  //   // console.log(res);
  //   if (res) setProducts(res);
  // }

  // useEffect(() => {
  //   fetchProducts();
  //   // eslint-disable-next-line
  // }, []);

  return <DataListView contentType="product" />;
};

export default ProductListView;
