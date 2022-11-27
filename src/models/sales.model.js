const camelize = require('camelize');
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

// Shows all sales
const getSales = async () => {
  const [sales] = await connection.execute(
    `SELECT * FROM StoreManager.sales AS s
    INNER JOIN sales_products AS p
    ON s.id = p.sale_id
    ORDER BY id, product_id`,
  );
  return camelize(sales);
};

// Show a sale by its id
const getSaleById = async (id) => {
  const [[sale]] = await connection.execute(
    `SELECT date, product_id, quantity FROM StoreManager.sales AS s
    INNER JOIN sales_products AS p 
    ON s.id = p.sale_id
    WHERE id = ?
    ORDER BY id, product_id`, [id],
  );
  return camelize(sale);
};

module.exports = {
  registerSaleId,
  registerSaleProducts,
  getSales,
  getSaleById,
};
