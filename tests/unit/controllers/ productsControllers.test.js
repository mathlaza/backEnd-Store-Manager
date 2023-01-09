// The framework mocha enables asynchronous tests on node 
const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions
const chai = require('chai'); // Enables more verbs to assertions
const sinonChai = require('sinon-chai'); // Enables more verbs to assertions

// To use more assertions, like "calledWith"
chai.use(sinonChai);

const { productsMock, registerMock, updateMock } = require('../mock/productsMock');
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const httpStatus = require('../../../src/utils/httpStatus');

describe('Product controllers layer tests', () => {
  it('Checks if all products are listed', async () => {
    const mock = { type: null, message: productsMock }
    // "resolves" to functions, "returns" to objects
    sinon.stub(productsService, 'getProducts').resolves(mock);
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProducts(req, res);

    // Two forms of using "calledwith" on assertions
    expect(res.status.calledWith(httpStatus.OK)).to.be.equal(true);
    expect(res.json).to.have.been.calledWith(productsMock);
  });

  it('Checks if a product searched by id is listed', async () => {
    const mock = { type: null, message: productsMock[0] }
    sinon.stub(productsService, 'getProductById').resolves(mock);
    const req = { params: { id: 1 } }; 
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(productsMock[0]);
  })

  it('Checks error if searched id does not exist', async () => {
    sinon.stub(productsService, 'getProductById')
      .resolves({ type: httpStatus.NOT_FOUND, message: 'Product not found' });
    const req = { params: { id: 999 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductById(req, res);

    expect(res.status).calledWith(httpStatus.NOT_FOUND);
    expect(res.json).calledWith({ message: 'Product not found' });
  });

  it('Checks if a product is registered', async () => {
    sinon.stub(productsService, 'registerProduct')
      .resolves({ type: null, message: registerMock });
    const req = { body: { name: 'ProductX' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.registerProduct(req, res);

    expect(res.status).calledWith(httpStatus.CREATED);
    expect(res.json).calledWith(registerMock);
  });

  it('Checks if a product is updated', async () => {
    sinon.stub(productsService, 'updateProduct')
      .resolves({ type: null, message: '' });
    const req = { body: { name: 'updatedProduct' }, params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.updateProduct(req, res);

    expect(res.status).calledWith(httpStatus.OK);
    expect(res.json).calledWith(updateMock);
  });

  it('Checks error if product id to update does not exist', async () => {
    sinon.stub(productsService, 'updateProduct')
      .resolves({ type: httpStatus.NOT_FOUND, message: 'Product not found' });
    const req = { params: { id: 1000 }, body: { name: "updatedProduct" } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.updateProduct(req, res);

    expect(res.status).calledWith(httpStatus.NOT_FOUND);
    expect(res.json).calledWith({ message: 'Product not found' });
  });

  it('Checks if can delete a product', async () => {
    sinon.stub(productsService, 'deleteProduct')
      .resolves({ type: null, message: undefined });
    const req = { params: { id: 3 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.deleteProduct(req, res);

    expect(res.status).calledWith(httpStatus.NO_CONTENT);
    expect(res.json).calledWith();
  });

  it('Checks error if id of the product to be deleted does not exist', async () => {
    sinon.stub(productsService, 'deleteProduct')
      .resolves({ type: httpStatus.NOT_FOUND, message: 'Product not found' });
    const req = { params: { id: 1000 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.deleteProduct(req, res);

    expect(res.status).calledWith(httpStatus.NOT_FOUND);
    expect(res.json).calledWith({ message: 'Product not found' });
  });

  it('Checks if products searched by name are listed', async () => {
    sinon.stub(productsService, 'getProductsByName')
      .resolves({ type: null, message: productsMock[2] });
    const req = { query: { q: "Capitão" } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductsByName(req, res);

    expect(res.status).calledWith(httpStatus.OK);
    expect(res.json).calledWith(productsMock[2]);
  });

  afterEach(sinon.restore);
});
