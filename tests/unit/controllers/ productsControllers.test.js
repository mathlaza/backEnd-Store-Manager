// The framework mocha enables asynchronous tests on node 
const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions
const chai = require('chai'); // Enables more verbs to assertions
const sinonChai = require('sinon-chai'); // Enables more verbs to assertions

// To use more assertions, like "calledWith"
chai.use(sinonChai);

const { productsMock, registerMock } = require('../mock/productsMock');
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const httpStatus = require('../../../src/utils/httpStatus');

describe('Tests da camada Controllers dos produtos', () => {
  it('Verifica se todos os produtos são listados', async () => {
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

  it('Verifica se um produto buscado por id é listado', async () => {
    const mock = { type: null, message: productsMock[0] }
    sinon.stub(productsService, 'getProductsById').resolves(mock);
    const req = { params: { id: 1 } }; 
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(productsMock[0]);
  })

  it('Verifica erro se id buscado não existir', async () => {
    sinon.stub(productsService, 'getProductsById')
      .resolves({ type: httpStatus.NOT_FOUND, message: 'Product not found' });
    const req = { params: { id: 999 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductsById(req, res);

    expect(res.status).calledWith(httpStatus.NOT_FOUND);
    expect(res.json).calledWith({ message: 'Product not found' });
  });

  it('Verifica se registra um produto', async () => {
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

  afterEach(sinon.restore);
});
