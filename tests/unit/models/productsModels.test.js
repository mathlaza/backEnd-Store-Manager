const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const productsMock = require('./mock/productsMock');
const productsModel = require('../../../src/models/products.model');

describe('Tests da camada Model dos produtos', function () {
  it('Verifica se todos os produtos são listados', async function () {
    // Arrange (busca o mock)
    sinon.stub(connection, 'execute').resolves([productsMock]);
    // Act (executa a função de requisição)
    const result = await productsModel.getProducts();
    // Assert
    expect(result).to.deep.equal(productsMock);
  });

  it('Verifica se um produto buscado por id é listado', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await productsModel.getProductsById(1);
    expect(result).to.deep.equal(productsMock[0]);
  })

  // Restaura o stub para cada teste
  afterEach(sinon.restore);
});
