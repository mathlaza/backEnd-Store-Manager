const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions

const { regProductMock } = require('../mock/salesMock');
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');

describe('Tests da camada Services dos sales', () => { 
  it('Verifica se registra um produto de uma venda', async () => {
    sinon.stub(salesModel, 'registerSaleId').resolves(999); // Simulates the register of a sale
    sinon.stub(salesModel, 'registerSaleProducts').resolves({ saleId: 999, productId: 888, quantity: 777 }); // Simulates the register of products from a sale
    const response = { type: null, message: { id: 999, itemsSold: regProductMock } };
    const result = await salesService.registerSales(regProductMock);
    expect(result).to.deep.equal(response);
  });

  afterEach(sinon.restore);
});
