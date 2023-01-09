const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions

const { regProductMock, getSalesMock, getSaleByIdMock } = require('../mock/salesMock');
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const httpStatus = require('../../../src/utils/httpStatus');

describe('Sale services layer tests', () => { 
  it('Checks if registers a product from a sale', async () => {
    sinon.stub(salesModel, 'registerSaleId').resolves(999); // Simulates the register of a sale
    sinon.stub(salesModel, 'registerSaleProducts').resolves({ saleId: 999, productId: 888, quantity: 777 }); // Simulates the register of products from a sale
    const result = await salesService.registerSales(regProductMock);
    const response = { type: null, message: { id: 999, itemsSold: regProductMock } };
    expect(result).to.deep.equal(response);
  });

  it('Checks if all sales are listed', async () => {
    sinon.stub(salesModel, 'getSales').resolves(getSalesMock);
    const result = await salesService.getSales();
    const response = { type: null, message: getSalesMock }
    expect(result).to.deep.equal(response);
  });

  it('Checks if a sale searched by id is listed', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves(getSaleByIdMock);
    const result = await salesService.getSaleById(999);
    const response = { type: null, message: getSaleByIdMock }
    expect(result).to.deep.equal(response);
  });

  it('Checks error if searched id does not exist', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    const result = await salesService.getSaleById(999);
    const response = { type: httpStatus.NOT_FOUND, message: 'Sale not found' };
    expect(result).to.deep.equal(response);
  });

  it('Checks if can delete a sale', async () => {
    sinon.stub(salesModel, 'deleteSale').resolves();
    const result = await salesService.deleteSale(2);
    const response = { type: null, message: undefined };
    expect(result).to.deep.equal(response);
  });

  it('Checks error if sales id to be deleted does not exist', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    const result = await salesService.deleteSale(1000);
    const response = { type: httpStatus.NOT_FOUND, message: 'Sale not found' };
    expect(result).to.deep.equal(response);
  });

  it('Checks if a sale is updated', async () => {
    const [{ productId, quantity }] = getSaleByIdMock;
    sinon.stub(salesModel, 'updateSale').resolves({ saleId: 999, productId: 888, quantity: 777 });
    const result = await salesService.updateSale(1, regProductMock);
    const response = { type: null, message: { saleId: 1, itemsUpdated: regProductMock } };
    expect(result).to.deep.equal(response);
  });

  it('Checks error if sales id to update does not exist', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    const result = await salesService.updateSale(999, regProductMock);
    const response = { type: httpStatus.NOT_FOUND, message: 'Sale not found' };
    expect(result).to.deep.equal(response);
  });

  afterEach(sinon.restore);
});
