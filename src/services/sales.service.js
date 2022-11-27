const salesModel = require('../models/sales.model');
const httpStatus = require('../utils/httpStatus');

const registerSales = async (sales) => {
  const saleId = await salesModel.registerSaleId();
  // Dont use forEach, because it can't work with asynchronicity, instead use Promise.all with map
  await Promise.all(sales.map((sale) => salesModel.registerSaleProducts(saleId, sale)));
  const message = { id: saleId, itemsSold: sales };
  return { type: null, message };
};

const getSales = async () => {
  const sales = await salesModel.getSales();
  return { type: null, message: sales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (sale.length) return { type: null, message: sale };
  return { type: httpStatus.NOT_FOUND, message: 'Sale not found' };
};

const deleteSale = async (id) => {
  const { type } = await getSaleById(id);
  const result = await salesModel.deleteSale(id);
  console.log('service', id, result);
  if (!type) return { type: null, message: result }; // type === null on "getSaleById" => sale exists!
  return { type: httpStatus.NOT_FOUND, message: 'Sale not found' };
};

module.exports = {
  registerSales,
  getSales,
  getSaleById,
  deleteSale,
};
