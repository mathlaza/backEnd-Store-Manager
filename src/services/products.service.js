const productsModel = require('../models/products.model');
const httpStatus = require('../utils/httpStatus');

const getProducts = async () => {
  const allProducts = await productsModel.getProducts();
  return { type: null, message: allProducts };
};
const getProductsById = async (id) => {
  const product = await productsModel.getProductsById(id);
  if (product) return { type: null, message: product };
  return { type: httpStatus.NOT_FOUND, message: 'Product not found' };
};

const registerProduct = async (newProduct) => {
  const product = await productsModel.registerProduct(newProduct);
  return { type: null, message: product };
};

const updateProduct = async (id, name) => {
  const { type } = await getProductsById(id);
  await productsModel.updateProduct(id, name);
  if (!type) return { type: null, message: '' };
  return { type: httpStatus.NOT_FOUND, message: 'Product not found' };
};

module.exports = {
  getProducts,
  getProductsById,
  registerProduct,
  updateProduct,
};
