const httpStatus = require('../utils/httpStatus');
const productsModel = require('../models/products.model');

// Check if all itens of request contain "productId" field
const checkId = (req, res, next) => {
  const sales = req.body;
  const noField = sales.some((sale) => sale.productId === undefined);

  if (noField) {
    return res.status(httpStatus.BAD_REQUEST)
      .json({ message: '"productId" is required' });
  }
  next();
};

// Check if all itens of request contain "quantity" field
const checkQuantity = (req, res, next) => {
  const sales = req.body;
  const noField = sales.some((sale) => sale.quantity === undefined);

  if (noField) {
    return res.status(httpStatus.BAD_REQUEST)
      .json({ message: '"quantity" is required' });
  }
  next();
};

// Check if "quantity" field has valor greater than 0
const checkQuantityValor = (req, res, next) => {
  const sales = req.body;
  const lessThanOne = sales.some((sale) => sale.quantity <= 0);

  if (lessThanOne) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

// Check if "productId" of itens from request exists in database
const checkIdIsRegistered = async (req, res, next) => {
  const sales = req.body;
  const allProducts = await productsModel.getProducts();
  const allIds = allProducts.map((product) => product.id);
  const productExists = sales.every((sale) => allIds.includes(sale.productId));

  if (!productExists) {
    return res.status(httpStatus.NOT_FOUND)
      .json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  checkId,
  checkQuantity,
  checkQuantityValor,
  checkIdIsRegistered,
};
