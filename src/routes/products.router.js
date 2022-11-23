const express = require('express');
const productsController = require('../controllers/products.controller');

const routers = express.Router();

// Rotas (a ordem delas influencia no funcionamento da aplicação)
routers.get('/', productsController.getProducts);

routers.get('/:id', productsController.getProductsById);

module.exports = routers;
