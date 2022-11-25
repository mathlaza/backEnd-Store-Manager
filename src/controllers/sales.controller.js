const salesService = require('../services/sales.service');
const httpStatus = require('../utils/httpStatus');

const registerSales = async (req, res) => {
  const sales = req.body;
  const { message } = await salesService.registerSales(sales);
  return res.status(httpStatus.CREATED).json(message); 
};

module.exports = {
  registerSales,
};
