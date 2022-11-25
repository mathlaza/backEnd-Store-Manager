const connection = require('./db/connection');

const registerSaleId = async () => {
  // Register a sale id with auto increment in database
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES ()',
    [],
  );
  return insertId;
};

// Register the sale products in database
const registerSaleProducts = async (saleId, { productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
};

module.exports = {
  registerSaleId,
  registerSaleProducts,
};
