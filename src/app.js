const express = require('express');
const productsRouter = require('./routes/products.router');
const salesRouter = require('./routes/sales.router');

const app = express();
app.use(express.json()); // To read req.body

// don't remove this endpoint, it's for the evaluator to work
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

module.exports = app;
