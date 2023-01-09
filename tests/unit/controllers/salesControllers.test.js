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

describe('Sale controllers layer tests', () => {
  it('Checks if registers a product from a sale', async () => {
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

  it('Checks if all sales are listed', async () => {
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


  it('Checks if a sale searched by id is listed', async () => {
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

  it('Checks error if searched id does not exist', async () => {
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

  it('Checks if can delete a sale', async () => {
    sinon.stub(salesService, 'deleteSale')
      .resolves({ type: null, message: undefined });
    const req = { params: { id: 2 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.deleteSale(req, res);

    expect(res.status).calledWith(httpStatus.NO_CONTENT);
    expect(res.json).calledWith();
  });

  it('Checks error if sales id to be deleted does not exist', async () => {
    sinon.stub(salesService, 'deleteSale')
      .resolves({ type: httpStatus.NOT_FOUND, message: 'Sale not found' });
    const req = { params: { id: 1000 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesController.deleteSale(req, res);

    expect(res.status).calledWith(httpStatus.NOT_FOUND);
    expect(res.json).calledWith({ message: 'Sale not found' });
  });

  it('Checks if a sale is updated', async () => {
    sinon.stub(salesService, 'updateSale')
      .resolves({ type: null, message: { saleId: 1, itemsUpdated: regProductMock } });
    const req = { params: { id: 1 }, body: { regProductMock } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.updateSale(req, res);

    expect(res.status).calledWith(httpStatus.OK);
    expect(res.json).calledWith({ saleId: 1, itemsUpdated: regProductMock });
  });

  it('Checks error if sales id to update does not exist', async () => {
    sinon.stub(salesService, 'updateSale')
      .resolves({ type: httpStatus.NOT_FOUND, message: 'Sale not found' });
    const req = { params: { id: 999 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesController.updateSale(req, res);

    expect(res.status).calledWith(httpStatus.NOT_FOUND);
    expect(res.json).calledWith({ message: 'Sale not found' });
  });

  afterEach(sinon.restore);
});
