const { expect } = require('chai');
const sinon = require('sinon');

const { productsMock, registerMock, updateMock } = require('../mock/productsMock');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const httpStatus = require('../../../src/utils/httpStatus');

describe('Product Services layer tests', () => {
  it('Checks if all products are listed', async () => {
    sinon.stub(productsModel, 'getProducts').resolves(productsMock);
    const result = await productsService.getProducts();
    const response = { type: null, message: productsMock }
    expect(result).to.deep.equal(response);
  });

  it('Checks if a product searched by id is listed', async () => {
    sinon.stub(productsModel, 'getProductById').resolves(productsMock[0]);
    const result = await productsService.getProductById(1);
    const response = { type: null, message: productsMock[0] }
    expect(result).to.deep.equal(response);
  })

  it('Checks error if searched id does not exist', async () => {
    sinon.stub(productsModel, 'getProductById').resolves(null);
    const result = await productsService.getProductById(999);
    const response = { type: httpStatus.NOT_FOUND, message: 'Product not found' };
    expect(result).to.deep.equal(response);
  });

  it('Checks if a product is registered', async () => {
    sinon.stub(productsModel, 'registerProduct').resolves(registerMock);
    const result = await productsService.registerProduct("ProductX");
    const response = { type: null, message: registerMock }
    expect(result).to.deep.equal(response);
  });

  it('Checkss if a product is updated', async () => {
    sinon.stub(productsModel, 'updateProduct').resolves(updateMock);
    const { id, name } = updateMock;
    const result = await productsService.updateProduct(id, name);
    const response = { type: null, message: '' }
    expect(result).to.deep.equal(response);
  });

  it('Checks error if product id to update does not exist', async () => {
    sinon.stub(productsModel, 'getProductById').resolves(null);
    const result = await productsService.updateProduct(1000, "updatedProduct");
    const response = { type: httpStatus.NOT_FOUND, message: 'Product not found' };
    expect(result).to.deep.equal(response);
  });

  it('Checks if can delete a product', async () => {
    sinon.stub(productsModel, 'deleteProduct').resolves();
    const result = await productsService.deleteProduct(3);
    const response = { type: null, message: undefined };
    expect(result).to.deep.equal(response);
  });

  it('Checks error if id of the product to be deleted does not exist', async () => {
    sinon.stub(productsModel, 'getProductById').resolves(null);
    const result = await productsService.deleteProduct(1000);
    const response = { type: httpStatus.NOT_FOUND, message: 'Product not found' };
    expect(result).to.deep.equal(response);
  });

  it('Checks if products searched by name are listed', async () => {
    sinon.stub(productsModel, 'getProductsByName').resolves(productsMock[2]);
    const result = await productsService.getProductsByName('Capitão');
    const response = { type: null, message: productsMock[2] }
    expect(result).to.deep.equal(response);
  });

  it('Checks if all products are listed if there is no name in the query', async () => {
    sinon.stub(productsModel, 'getProductsByName').resolves(productsMock)
    const result = await productsService.getProductsByName('');
    expect(result.type).to.deep.equal(null);
    expect(result.message).to.deep.equal(productsMock);
  });

  afterEach(sinon.restore);
});
