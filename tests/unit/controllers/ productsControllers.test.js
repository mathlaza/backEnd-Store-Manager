// The framework mocha enables asynchronous tests on node 
const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions
const chai = require('chai'); // Enables more verbs to assertions
const sinonChai = require('sinon-chai'); // Enables more verbs to assertions

// To use more assertions, like "calledWith"
chai.use(sinonChai);

const productsMock = require('../mock/productsMock');
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const httpStatus = require('../../../src/utils/httpStatus');

describe('Tests da camada Controllers dos produtos', function () {
  it('Verifica se todos os produtos são listados', async function () {
    const mock = { type: null, message: productsMock }
    // "resolves" to functions, "returns" to objects
    sinon.stub(productsService, 'getProducts').resolves(mock);
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProducts(req, res);

    // Two forms of using "calledwith" to assert
    expect(res.status.calledWith(httpStatus.OK)).to.be.equal(true);
    expect(res.json).to.have.been.calledWith(productsMock);
  });

  it('Verifica se um produto buscado por id é listado', async function () {
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

  afterEach(sinon.restore);
});
