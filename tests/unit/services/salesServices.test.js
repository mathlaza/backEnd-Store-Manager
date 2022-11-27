const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions

const { regProductMock, getSalesMock, getSaleByIdMock } = require('../mock/salesMock');
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const httpStatus = require('../../../src/utils/httpStatus');

describe('Tests da camada Services dos sales', () => { 
  it('Verifica se registra um produto de uma venda', async () => {
    sinon.stub(salesModel, 'registerSaleId').resolves(999); // Simulates the register of a sale
    sinon.stub(salesModel, 'registerSaleProducts').resolves({ saleId: 999, productId: 888, quantity: 777 }); // Simulates the register of products from a sale
    const result = await salesService.registerSales(regProductMock);
    const response = { type: null, message: { id: 999, itemsSold: regProductMock } };
    expect(result).to.deep.equal(response);
  });

  it('Verifica se todas as vendas são listadas', async () => {
    sinon.stub(salesModel, 'getSales').resolves(getSalesMock);
    const result = await salesService.getSales();
    const response = { type: null, message: getSalesMock }
    expect(result).to.deep.equal(response);
  });

  it('Verifica se uma venda buscada por id é listada', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves(getSaleByIdMock);
    const result = await salesService.getSaleById(999);
    const response = { type: null, message: getSaleByIdMock }
    expect(result).to.deep.equal(response);
  });

  it('Verifica erro se id buscado não existir', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves(null);
    const result = await salesService.getSaleById(999);
    const response = { type: httpStatus.NOT_FOUND, message: 'Sale not found' };
    expect(result).to.deep.equal(response);
  });

  afterEach(sinon.restore);
});
