const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const productsMock = require('../models/mock/productsMock');
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const httpStatus = require('../../../src/utils/httpStatus');

describe('Tests da camada Services dos produtos', function () {
  it('Verifica se todos os produtos são listados', async function () {
    const mock = { type: null, message: productsMock }
    sinon.stub(productsService, 'getProducts').resolves(mock);
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
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
