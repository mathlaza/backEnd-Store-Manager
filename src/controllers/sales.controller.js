const salesService = require('../services/sales.service');
const httpStatus = require('../utils/httpStatus');

const registerSales = async (req, res) => {
  const sales = req.body;
  const { message } = await salesService.registerSales(sales);
  return res.status(httpStatus.CREATED).json(message); 
};

const getSales = async (_req, res) => {
  const { message } = await salesService.getSales();
  return res.status(httpStatus.OK).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);
  if (!type) return res.status(httpStatus.OK).json(message); 
  return res.status(type).json({ message });
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id); // type !== null => sale doesn't exist!
  if (!type) return res.status(httpStatus.NO_CONTENT).json(); // successfully deleted sale
  return res.status(type).json({ message });
};

module.exports = {
  registerSales,
  getSales,
  getSaleById,
  deleteSale,
};
