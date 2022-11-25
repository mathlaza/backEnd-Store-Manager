const salesModel = require('../models/sales.model');

const registerSales = async (sales) => {
  const saleId = await salesModel.registerSaleId();
  // Dont use forEach, because it can't work with asynchronicity, instead use Promise.all with map
  await Promise.all(sales.map(async (sale) => salesModel.registerSaleProducts(saleId, sale)));
  const response = { id: saleId, itemsSold: sales };

  return { type: null, message: response };
};

module.exports = {
  registerSales,
};
