const productsService = require('../services/products.service');
const status = require('../utils/httpStatus');

const getProducts = async (_req, res) => {
  const { message } = await productsService.getProducts();
  return res.status(status.OK).json(message);
};

const getProductsById = async (req, res) => {
  const id = Number(req.params.id);
  const { type, message } = await productsService.getProductsById(id);

  if (!type) return res.status(status.OK).json(message);
  return res.status(status.NOT_FOUND).json({ message });
};

module.exports = {
  getProducts,
  getProductsById,
};
