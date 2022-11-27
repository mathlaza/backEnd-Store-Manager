const { expect } = require('chai');
const sinon = require('sinon');

const { productsMock, registerMock, updateMock } = require('../mock/productsMock');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const httpStatus = require('../../../src/utils/httpStatus');

describe('Tests da camada Services dos produtos', () => {
  it('Verifica se todos os produtos são listados', async () => {
    sinon.stub(productsModel, 'getProducts').resolves(productsMock);
    const result = await productsService.getProducts();
    const response = { type: null, message: productsMock }
    expect(result).to.deep.equal(response);
  });

  it('Verifica se um produto buscado por id é listado', async () => {
    sinon.stub(productsModel, 'getProductsById').resolves(productsMock[0]);
    const result = await productsService.getProductsById(1);
    const response = { type: null, message: productsMock[0] }
    expect(result).to.deep.equal(response);
  })

  it('Verifica erro se id buscado não existir', async () => {
    sinon.stub(productsModel, 'getProductsById').resolves(null);
    const result = await productsService.getProductsById(999);
    const response = { type: httpStatus.NOT_FOUND, message: 'Product not found' };
    expect(result).to.deep.equal(response);
  });

  it('Verifica se registra um produto', async () => {
    sinon.stub(productsModel, 'registerProduct').resolves(registerMock);
    const result = await productsService.registerProduct("ProductX");
    const response = { type: null, message: registerMock }
    expect(result).to.deep.equal(response);
  });

  it('Verifica se atualiza um produto', async () => {
    sinon.stub(productsModel, 'updateProduct').resolves(updateMock);
    const { id, name } = updateMock;
    const result = await productsService.updateProduct(id, name);
    const response = { type: null, message: '' }
    expect(result).to.deep.equal(response);
  });

  it('Verifica erro se id do produto a atualizar não existir', async () => {
    sinon.stub(productsModel, 'getProductsById').resolves(null);
    const result = await productsService.updateProduct(1000, "updatedProduct");
    const response = { type: httpStatus.NOT_FOUND, message: 'Product not found' };
    expect(result).to.deep.equal(response);
  });

  afterEach(sinon.restore);
});
