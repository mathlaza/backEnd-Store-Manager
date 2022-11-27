const productsService = require('../services/products.service');
const httpStatus = require('../utils/httpStatus');
const status = require('../utils/httpStatus');

const getProducts = async (_req, res) => {
  const { message } = await productsService.getProducts();
  return res.status(status.OK).json(message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductsById(id);
  if (!type) return res.status(status.OK).json(message);
  return res.status(status.NOT_FOUND).json({ message });
};

const registerProduct = async (req, res) => {
  const newProduct = req.body.name;
  const { message } = await productsService.registerProduct(newProduct);
  return res.status(status.CREATED).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateProduct(id, name);
  if (type) return res.status(type).json({ message });
  res.status(httpStatus.OK).json({ id, name });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id); // type === null => product doesn't exist!
  if (!type) return res.status(httpStatus.NO_CONTENT).json(); // successfully deleted product
  return res.status(type).json({ message });
};

module.exports = {
  getProducts,
  getProductsById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
