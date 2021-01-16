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
  // 'products',
  // 'services'
];
const product = [
  'id',
  'name',
  'descripion',
  'price',
  'discount',
  'business',
  'categories'
];
const service = ['id', 'name', 'descripion', 'business', 'categories'];
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
