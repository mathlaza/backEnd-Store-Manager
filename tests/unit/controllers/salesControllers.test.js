// The framework mocha enables asynchronous tests on node 
const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions
const chai = require('chai'); // Enables more verbs to assertions
const sinonChai = require('sinon-chai'); // Enables more verbs to assertions

// To use more assertions, like "calledWith"
chai.use(sinonChai);

const { regProductMock, getSalesMock, getSaleByIdMock } = require('../mock/salesMock');
const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const httpStatus = require('../../../src/utils/httpStatus');

describe('Tests da camada Controllers dos sales', () => {
  it('Verifica se registra um produto de uma venda', async () => {
    sinon.stub(salesService, 'registerSales')
      .resolves({ type: null, message: { id: 999, itemsSold: regProductMock } });
    const req = { body: regProductMock };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.registerSales(req, res);

    expect(res.status.calledWith(httpStatus.CREATED)).to.be.equal(true);
    expect(res.json).to.have.been.calledWith({ id: 999, itemsSold: regProductMock });
  });

  it('Verifica se todas as vendas são listadas', async () => {
    sinon.stub(salesService, 'getSales')
      .resolves({ type: null, message: getSalesMock });
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSales(req, res);

    expect(res.status.calledWith(httpStatus.OK)).to.be.equal(true);
    expect(res.json).to.have.been.calledWith(getSalesMock);
  });


  it('Verifica se uma venda buscada por id é listada', async () => {
    sinon.stub(salesService, 'getSaleById')
      .resolves({ type: null, message: getSaleByIdMock });
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSaleById(req, res);

    expect(res.status.calledWith(httpStatus.OK)).to.be.equal(true);
    expect(res.json).to.have.been.calledWith(getSaleByIdMock);
  });

  it('Verifica erro se id buscado não existir', async () => {
    sinon.stub(salesService, 'getSaleById')
      .resolves({ type: httpStatus.NOT_FOUND, message: 'Sale not found' });
    const req = { params: 999 };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSaleById(req, res);

    expect(res.status.calledWith(httpStatus.NOT_FOUND)).to.be.equal(true);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  afterEach(sinon.restore);
});
