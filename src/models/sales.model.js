const connection = require('./db/connection');

const registerSaleId = async () => {
  // Register a sale with auto increment id in database
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES ()',
    [],
  );
  return insertId;
};

// Register sales product in database
const registerSaleProducts = async (saleId, { productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return { saleId, productId, quantity };
};

module.exports = {
  registerSaleId,
  registerSaleProducts,
};
