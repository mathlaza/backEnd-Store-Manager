const connection = require('./db/connection');

const getProducts = async () => {
  const [products] = await connection
    .execute('SELECT * FROM StoreManager.products');
  return products;
};

const getProductById = async (id) => {
  const [[product]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return product;
};

const registerProduct = async (newProduct) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUE(?)', [newProduct]);
  return { id: insertId, name: newProduct };
};

const updateProduct = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
  );
  return { id, name };
};

const deleteProduct = async (id) => {
  const [{ changedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );
  return changedRows; // To check on tests if the product was deleted
};

const getProductsByName = async (query) => {
  const nameBetween = `%${query}%`;
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?', [nameBetween],
  );
  return products;
};

module.exports = {
  getProducts,
  getProductById,
  registerProduct,
  updateProduct,
  deleteProduct,
  getProductsByName,
};
