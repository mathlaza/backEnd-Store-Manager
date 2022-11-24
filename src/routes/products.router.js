const express = require('express');
const productsController = require('../controllers/products.controller');
const { checkNameExists, checkNameLength } = require('../middlewares/validateProducts');

const routers = express.Router();

// Routes (their order influences the behavior of the application)

routers.get('/', productsController.getProducts);

routers.post('/',
  checkNameExists,
  checkNameLength,
  productsController.registerProduct);

routers.get('/:id', productsController.getProductsById);

module.exports = routers;
