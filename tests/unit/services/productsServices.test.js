const { expect } = require('chai');
const sinon = require('sinon');

const productsMock = require('../mock/productsMock');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');

describe('Tests da camada Services dos produtos', function () {
  it('Verifica se todos os produtos são listados', async function () {
    sinon.stub(productsModel, 'getProducts').resolves(productsMock);
    const response = { type: null, message: productsMock }
    const result = await productsService.getProducts();
    expect(result).to.deep.equal(response);
  });

  it('Verifica se um produto buscado por id é listado', async function () {
    sinon.stub(productsModel, 'getProductsById').resolves(productsMock[0]);
    const response = { type: null, message: productsMock[0] }
    const result = await productsService.getProductsById(1);
    expect(result).to.deep.equal(response);
  })

  afterEach(sinon.restore);
});
