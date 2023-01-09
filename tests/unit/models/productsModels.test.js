const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions

const { productsMock, registerMock, updateMock } = require('../mock/productsMock');
const connection = require('../../../src/models/db/connection');
const productsModel = require('../../../src/models/products.model');

describe('Product models layer tests', () => {
  it('Checks if all products are listed', async () => {
    // Arrange (Here stub provides a simulation of connection.execute() returning "productsMock")
    sinon.stub(connection, 'execute').resolves([productsMock]);
    // Act (Here it's executing the request function)
    const result = await productsModel.getProducts();
    // Assert
    expect(result).to.deep.equal(productsMock);
  });

  it('Checks if a product searched by id is listed', async () => {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await productsModel.getProductById(1);
    expect(result).to.deep.equal(productsMock[0]);
  })

  it('Checks if a product is registered', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 999 }]);
    const result = await productsModel.registerProduct('ProductX');
    expect(result).to.deep.equal(registerMock);
  });

  it('Checkss if a product is updated', async () => {
    sinon.stub(connection, 'execute').resolves(updateMock);
    const { id, name } = updateMock;
    const result = await productsModel.updateProduct(id, name);
    expect(result).to.deep.equal(updateMock);
  });

  it('Checks if can delete a product', async () => {
    sinon.stub(connection, 'execute').resolves([{ changedRows: 1 }]);
    const result = await productsModel.deleteProduct(3);
    expect(result).to.deep.equal(1);
  });

  it('Checks if products searched by name are listed', async () => {
    sinon.stub(connection, 'execute').resolves([productsMock[2]]);
    const result = await productsModel.getProductsByName('Capitão');
    expect(result).to.deep.equal(productsMock[2]);
  });

  // Restores stub for each test
  afterEach(sinon.restore);
});
