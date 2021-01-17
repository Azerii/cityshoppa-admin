const user = ['id', 'username', 'email'];
const business = [
  'id',
  'name',
  'description',
  'phone',
  'email',
  'address',
  'city',
  'linkToMaps'
];
const product = [
  'id',
  'name',
  'description',
  'price',
  'discount',
  'business',
  'category'
];
const service = ['id', 'name', 'description', 'business', 'category'];
const category = ['id', 'name'];
const city = ['id', 'name', 'province'];

export default {
  user,
  business,
  product,
  service,
  category,
  city
};
