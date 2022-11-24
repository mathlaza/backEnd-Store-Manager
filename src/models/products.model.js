const connection = require('./db/connection');

const getProducts = async () => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products');
  return result;
};

const getProductsById = async (id) => {
  const [[result]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return result;
};

const registerProduct = async (newProduct) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUE(?)', [newProduct]);
  return { id: insertId, name: newProduct };
};

module.exports = {
  getProducts,
  getProductsById,
  registerProduct,
};
