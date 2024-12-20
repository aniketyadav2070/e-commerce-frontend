const url = 'https://fakestoreapi.com/products';

const ApiConfig = {
  getAllProducts: url,
  getAllCategories: `${url}/categories`,
  getAllProductsByCategory:`${url}/category`,
  viewProduct:url

};
export default ApiConfig;
