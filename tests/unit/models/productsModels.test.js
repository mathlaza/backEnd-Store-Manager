const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions

const connection = require('../../../src/models/db/connection');
const productsMock = require('../mock/productsMock');
const productsModel = require('../../../src/models/products.model');

describe('Tests da camada Model dos produtos', function () {
  it('Verifica se todos os produtos são listados', async function () {
    // Arrange (Here stub provides a simulation of connection.execute() returning "productsMock")
    sinon.stub(connection, 'execute').resolves([productsMock]);
    // Act (Here it's executing the request function)
    const result = await productsModel.getProducts();
    // Assert
    expect(result).to.deep.equal(productsMock);
  });

  it('Verifica se um produto buscado por id é listado', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await productsModel.getProductsById(1);
    expect(result).to.deep.equal(productsMock[0]);
  })

  // Restores stub for each test
  afterEach(sinon.restore);
});
