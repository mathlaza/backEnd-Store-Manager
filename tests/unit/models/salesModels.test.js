const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions

const { regProductMock } = require('../mock/salesMock');
const connection = require('../../../src/models/db/connection');
const salesModel = require('../../../src/models/sales.model');

describe('Tests da camada Model dos sales', () => {
  it('Verifica se registra uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 999 }]);
    const result = await salesModel.registerSaleId();
    expect(result).to.deep.equal(999);
  });

  it('Verifica se registra um produto de uma venda', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 999 }]);
    const [{ productId, quantity }] = regProductMock;
    const result = await salesModel.registerSaleProducts(999, { productId, quantity });
    expect(result).to.deep.equal({ saleId: 999, productId, quantity });
  });

  afterEach(sinon.restore);
});
