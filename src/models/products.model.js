const connection = require('./db/connection');

const getProducts = async () => {
  const [products] = await connection
    .execute('SELECT * FROM StoreManager.products');
  return products;
};

const getProductsById = async (id) => {
  const [[product]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return product;
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
