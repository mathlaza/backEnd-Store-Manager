const productsModel = require('../models/products.model');
const httpStatus = require('../utils/httpStatus');

const getProducts = async () => {
  const allProducts = await productsModel.getProducts();
  return { type: null, message: allProducts };
};
const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (product) return { type: null, message: product };
  return { type: httpStatus.NOT_FOUND, message: 'Product not found' };
};

const registerProduct = async (newProduct) => {
  const product = await productsModel.registerProduct(newProduct);
  return { type: null, message: product };
};

const updateProduct = async (id, name) => {
  const { type } = await getProductById(id);
  await productsModel.updateProduct(id, name);
  if (!type) return { type: null, message: '' };
  return { type: httpStatus.NOT_FOUND, message: 'Product not found' };
};

const deleteProduct = async (id) => {
  const { type, message } = await getProductById(id);
  const result = await productsModel.deleteProduct(id);
  if (!type) return { type: null, message: result }; // type === null on "getProductById" => product exists!
  return { type, message };
};

const getProductsByName = async (query) => {
  if (query.length) {
    const products = await productsModel.getProductsByName(query);
    return { type: null, message: products };
  }
  const allProducts = await productsModel.getProducts();
  return { type: null, message: allProducts };
};

module.exports = {
  getProducts,
  getProductById,
  registerProduct,
  updateProduct,
  deleteProduct,
  getProductsByName,
};
