const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions

const { regProductMock, getSalesMock, getSaleByIdMock } = require('../mock/salesMock');
const connection = require('../../../src/models/db/connection');
const salesModel = require('../../../src/models/sales.model');

describe('Sale models layer tests', () => {
  it('Checks if registers a sale', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 999 }]);
    const result = await salesModel.registerSaleId();
    expect(result).to.deep.equal(999);
  });

  it('Checks if registers a product from a sale', async () => {
    sinon.stub(connection, 'execute').resolves([{ saleId: 999, productId: 888, quantity: 777 }]);
    const [{ productId, quantity }] = regProductMock;
    const result = await salesModel.registerSaleProducts(999, { productId, quantity });
    expect(result).to.deep.equal({ saleId: 999, productId, quantity });
  });

  it('Checks if all sales are listed', async () => {
    sinon.stub(connection, 'execute').resolves([getSalesMock]);
    const result = await salesModel.getSales();
    expect(result).to.deep.equal(getSalesMock);
  });

  it('Checks if a sale searched by id is listed', async () => {
    sinon.stub(connection, 'execute').resolves([getSaleByIdMock]);
    const [result] = await salesModel.getSaleById(999);
    expect(result).to.deep.equal(getSaleByIdMock[0]);
  });

  it('Checks if can delete a sale', async () => {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.deleteSale(2);
    expect(result).to.deep.equal();
  });

  it('Checks if a sale is updated', async () => {
    sinon.stub(connection, 'execute').resolves({ saleId: 999, productId: 888, quantity: 777 });
    const [{ productId, quantity }] = getSaleByIdMock;
    const result = await salesModel.updateSale(999, { productId, quantity });
    expect(result).to.deep.equal({ saleId: 999, productId, quantity });
  });

  afterEach(sinon.restore);
});
