const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions

const { productsMock, registerMock, updateMock } = require('../mock/productsMock');
const connection = require('../../../src/models/db/connection');
const productsModel = require('../../../src/models/products.model');

describe('Tests da camada Model dos produtos', () => {
  it('Verifica se todos os produtos são listados', async () => {
    // Arrange (Here stub provides a simulation of connection.execute() returning "productsMock")
    sinon.stub(connection, 'execute').resolves([productsMock]);
    // Act (Here it's executing the request function)
    const result = await productsModel.getProducts();
    // Assert
    expect(result).to.deep.equal(productsMock);
  });

  it('Verifica se um produto buscado por id é listado', async () => {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await productsModel.getProductsById(1);
    expect(result).to.deep.equal(productsMock[0]);
  })

  it('Verifica se registra um produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 999 }]);
    const result = await productsModel.registerProduct('ProductX');
    expect(result).to.deep.equal(registerMock);
  });

  it('Verifica se atualiza um produto', async () => {
    sinon.stub(connection, 'execute').resolves(updateMock);
    const { id, name } = updateMock;
    const result = await productsModel.updateProduct(id, name);
    expect(result).to.deep.equal(updateMock);
  });

  // Restores stub for each test
  afterEach(sinon.restore);
});
