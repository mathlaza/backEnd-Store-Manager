// The framework mocha enables asynchronous tests on node 
const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions
const chai = require('chai'); // Enables more verbs to assertions
const sinonChai = require('sinon-chai'); // Enables more verbs to assertions

// To use more assertions, like "calledWith"
chai.use(sinonChai);

const { regProductMock } = require('../mock/salesMock');
const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const httpStatus = require('../../../src/utils/httpStatus');

describe('Tests da camada Controllers dos sales', () => {
  it('Verifica se registra um produto de uma venda', async () => {
    sinon.stub(salesService, 'registerSales').resolves({ type: null, message: { id: 999, itemsSold: regProductMock } });
    const req = { body: regProductMock };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.registerSales(req, res);

    expect(res.status.calledWith(httpStatus.CREATED)).to.be.equal(true);
    expect(res.json).to.have.been.calledWith({ id: 999, itemsSold: regProductMock });
  });

  afterEach(sinon.restore);
});
