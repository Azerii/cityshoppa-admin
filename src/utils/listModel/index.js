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
const category = ['id', 'name'];
const city = ['id', 'name', 'province'];
const caption = ['id', 'heading', 'subheading'];
const feature = ['id'];
const donation = ['id', 'amount'];
const brand = ['id'];

export default {
  user,
  business,
  product,
  category,
  city,
  caption,
  feature,
  brand,
  donation
};
