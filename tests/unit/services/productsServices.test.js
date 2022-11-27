const { expect } = require('chai');
const sinon = require('sinon');

const { productsMock, registerMock } = require('../mock/productsMock');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const httpStatus = require('../../../src/utils/httpStatus');

describe('Tests da camada Services dos produtos', () => {
  it('Verifica se todos os produtos são listados', async function () {
    sinon.stub(productsModel, 'getProducts').resolves(productsMock);
    const response = { type: null, message: productsMock }
    const result = await productsService.getProducts();
    expect(result).to.deep.equal(response);
  });

  it('Verifica se um produto buscado por id é listado', async () => {
    sinon.stub(productsModel, 'getProductsById').resolves(productsMock[0]);
    const response = { type: null, message: productsMock[0] }
    const result = await productsService.getProductsById(1);
    expect(result).to.deep.equal(response);
  })

  it('Verifica erro se id buscado não existir', async () => {
    sinon.stub(productsModel, 'getProductsById').resolves(null);
    const response = { type: httpStatus.NOT_FOUND, message: 'Product not found' };
    const result = await productsService.getProductsById(999);
    expect(result).to.deep.equal(response);
  });

  it('Verifica se registra um produto', async () => {
    sinon.stub(productsModel, 'registerProduct').resolves(registerMock);
    const response = { type: null, message: registerMock }
    const result = await productsService.registerProduct("ProductX");
    expect(result).to.deep.equal(response);
  });

  afterEach(sinon.restore);
});
