const productsModel = require('../models/products.model');

const getProducts = async () => {
  const allProducts = await productsModel.getProducts();
  return { type: null, message: allProducts };
};
const getProductsById = async (id) => {
  const product = await productsModel.getProductsById(id);
  if (product) return { type: null, message: product };
  return { type: 'NOT_FOUND', message: 'Product not found' };
};

const registerProduct = async (newProduct) => {
  const product = await productsModel.registerProduct(newProduct);
  return { type: null, message: product };
};

module.exports = {
  getProducts,
  getProductsById,
  registerProduct,
};
