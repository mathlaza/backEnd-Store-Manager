const express = require('express');
const salesController = require('../controllers/sales.controller');
const {
  checkId,
  checkQuantity,
  checkQuantityValor,
  checkIdIsRegistered,
} = require('../middlewares/validateSales');

const routers = express.Router();

// Routes (their order influences the behavior of the application)

routers.post('/',
  checkId,
  checkQuantity,
  checkQuantityValor,
  checkIdIsRegistered,
  salesController.registerSales);

routers.get('/', salesController.getSales);

routers.get('/:id', salesController.getSaleById);

routers.delete('/:id', salesController.deleteSale);

module.exports = routers;
